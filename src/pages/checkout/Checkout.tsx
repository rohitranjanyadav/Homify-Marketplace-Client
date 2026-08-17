import { type ChangeEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { type IData, PaymentMethod } from "./types";
import { orderItem } from "../../store/checkoutSlice";

function Checkout() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.cart);
  const { khaltiUrl,status } = useAppSelector((store) => store.orders);
  const total = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0,
  );
  console.log(items);

  const [data, setData] = useState<IData>({
    firstName: "",
    lastName: "",
    shippingAddress: "",
    totalAmount: 0,
    email: "",
    phoneNumber: "",
    paymentMethod: PaymentMethod.Cod,
    products: [],
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cod,
  );

  const handlePaymentMethod = (paymentData: PaymentMethod) => {
    setPaymentMethod(paymentData);
    setData({
      ...data,
      paymentMethod: paymentData,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData =
      items.length > 0
        ? items.map((item) => {
            return {
              productId: item.Product.id,
              productQty: item.quantity,
            };
          })
        : [];
    const finalData = {
      ...data,
      products: productData,
      totalAmount: total,
    };
    await dispatch(orderItem(finalData));
  };

  useEffect(() => {
    if (khaltiUrl) {
      window.location.href = khaltiUrl;
      return;
    }
  }, [khaltiUrl,status]);

  return (
    <>
      <Navbar />
      <div className="font-[sans-serif] bg-[#f7f3ed]">
        <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
          <div className="border-r border-[#e7dbcf] bg-[#f1e7dc] sm:h-screen sm:sticky sm:top-0 lg:min-w-92.5 sm:min-w-75">
            <div className="relative h-full">
              <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                <div className="space-y-4">
                  {items.length > 0 ? (
                    items.map((item) => {
                      return (
                        <div className="flex items-start gap-4" key={item.id}>
                          <div className="flex h-28 w-32 shrink-0 rounded-xl bg-[#e0cebd] p-3 max-lg:h-24 max-lg:w-24">
                            <img
                              src={`http://localhost:4000/${item.Product?.productImageUrl}`}
                              className="w-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-sm lg:text-base text-gray-800">
                              {item.Product.productName}
                            </h3>
                            <ul className="text-xs text-gray-800 space-y-1 mt-3">
                              {/* <li className="flex flex-wrap gap-4">Size <span className="ml-auto">37</span></li> */}
                              <li className="flex flex-wrap gap-4">
                                Quantity{" "}
                                <span className="ml-auto">
                                  {item?.quantity}
                                </span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                Total Price{" "}
                                <span className="ml-auto">
                                  Rs.{item.Product.productPrice}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No Items</p>
                  )}
                </div>
              </div>
              <div className="w-full bg-[#e0cebd] p-4 md:absolute md:bottom-0 md:left-0">
                <h4 className="flex flex-wrap gap-4 text-sm lg:text-base text-gray-800">
                  Total <span className="ml-auto">Rs. {total}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="sticky top-0 h-max w-full max-w-4xl rounded-md px-6 py-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3b]">Almost home</p>
            <h2 className="font-serif text-4xl font-semibold text-[#29221d]">
              Complete your order
            </h2>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full rounded-xl border border-transparent bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none transition focus:border-[#caa98e]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full rounded-xl border border-transparent bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none transition focus:border-[#caa98e]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full rounded-xl border border-transparent bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none transition focus:border-[#caa98e]"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="phoneNumber"
                      onChange={handleChange}
                      placeholder="Phone No."
                      className="w-full rounded-xl border border-transparent bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none transition focus:border-[#caa98e]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="shippingAddress"
                      onChange={handleChange}
                      placeholder="Address Line"
                      className="w-full rounded-xl border border-transparent bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none transition focus:border-[#caa98e]"
                    />
                  </div>
                  <div>
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select className="mt-1 w-full rounded-xl border border-[#dfcebe] bg-[#fffdf9] px-4 py-3 text-sm text-[#423129] outline-none"
                      name=""
                      id="paymentMethod"
                      onChange={(e) =>
                        handlePaymentMethod(e.target.value as PaymentMethod)
                      }
                    >
                      <option value="" disabled selected>
                        Choose Payment Method
                      </option>
                      <option value={PaymentMethod.Cod}>COD</option>
                      <option value={PaymentMethod.Khalti}>Khalti</option>
                      <option value={PaymentMethod.Esewa}>Esewa</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  {paymentMethod === PaymentMethod.Cod && (
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#a65f3b] px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#864a2c]"
                    >
                      Complete Purchase(Cash On Delivery)
                    </button>
                  )}
                  {paymentMethod === PaymentMethod.Khalti && (
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#7055a0] px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#584181]"
                    >
                      Pay With Khalti
                    </button>
                  )}
                  {paymentMethod === PaymentMethod.Esewa && (
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[#3d8853] px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#2f6b40]"
                    >
                      Pay With Esewa
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
