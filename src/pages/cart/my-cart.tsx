import { Link } from "react-router-dom";
import Navbar from "../../globals/components/Navbar";
import {
  handleCartItemDelete,
  handleCartItemUpdate,
} from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function MyCart() {
  const { items } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(handleCartItemUpdate(productId, quantity));
  };
  const handleDelete = (productId: string) => {
    dispatch(handleCartItemDelete(productId));
  };

  const subTotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0,
  );

  const totalQtyInCart = items.reduce(
    (total, item) => item.quantity + total,
    0,
  );

  const shippingCharge = 100;

  const total = subTotal + shippingCharge;
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f3ed] py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3b]">Your selected pieces</p>
          <h1 className="mb-7 mt-2 font-serif text-4xl font-semibold text-[#29221d]">Shopping bag</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="mb-4 overflow-x-auto rounded-2xl border border-[#e8ddd1] bg-[#fffdf9] p-6 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 &&
                      items.map((item) => {
                        return (
                          <tr>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  className="mr-4 h-16 w-16 rounded-xl object-cover"
                                  src={`http://localhost:4000/${item.Product?.productImageUrl}`}
                                  alt="Product image"
                                />
                                <span className="font-semibold text-[#423129]">
                                  {item.Product.productName}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">
                              Rs. {item.Product.productPrice}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button
                                  className="mr-2 rounded-lg border border-[#decebe] px-4 py-2 text-[#754d36] transition hover:bg-[#f4e9de]"
                                  onClick={() =>
                                    handleUpdate(
                                      item.Product.id,
                                      item.quantity - 1,
                                    )
                                  }
                                >
                                  -
                                </button>
                                <span className="text-center w-8">
                                  {item.quantity}
                                </span>
                                <button
                                  className="ml-2 rounded-lg border border-[#decebe] px-4 py-2 text-[#754d36] transition hover:bg-[#f4e9de]"
                                  onClick={() =>
                                    handleUpdate(
                                      item.Product.id,
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4">
                              Rs. {item.Product.productPrice * item?.quantity}
                            </td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button
                                  className="mr-2 rounded-lg border border-[#f0cfc5] bg-[#fff1ed] px-3 py-1.5 text-lg text-[#b54f37] transition hover:bg-[#f9dcd3]"
                                  onClick={() => handleDelete(item.Product.id)}
                                >
                                  X
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="rounded-2xl border border-[#e8ddd1] bg-[#fffdf9] p-6 shadow-sm">
                <h2 className="mb-5 font-serif text-2xl font-semibold text-[#29221d]">Order summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Total Quantity</span>
                  <span>{totalQtyInCart}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping Charge</span>
                  <span>Rs. {shippingCharge}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">Rs. {total}</span>
                </div>
                <Link to={"/my-checkout"}>
                  <button className="mt-4 w-full rounded-full bg-[#a65f3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#864a2c]">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
