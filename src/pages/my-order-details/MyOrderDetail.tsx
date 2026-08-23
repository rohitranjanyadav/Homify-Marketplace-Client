import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../globals/components/Navbar";
import { cancelOrderAPI, fetchMyOrderDetails } from "../../store/checkoutSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { OrderStatus } from "./types";

function MyOrderDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orderDetails } = useAppSelector((store) => store.orders);


  const currentOrder = orderDetails[0]?.Order;
  const subtotal = orderDetails.reduce(
    (total, item) => total + item.quantity * item.Product.productPrice,
    0,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMyOrderDetails(id));
    }
  }, [dispatch, id]);

  const cancelOrder = () => {
    if (id) {
      dispatch(cancelOrderAPI(id));
    }
  };

  if (!orderDetails.length) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#f7f3ed] px-4 py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-[#e8ddd1] bg-[#fffdf9] p-8 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3b]">
              Order details
            </p>
            <h1 className="mt-4 font-serif text-3xl font-semibold text-[#29221d]">
              Loading your order...
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f3ed] px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3b]">
              Order overview
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-serif text-4xl font-semibold text-[#29221d]">
                  Order #{orderDetails[0]?.orderId}
                </h1>
                <p className="mt-2 text-sm text-[#5d4d44]">
                  {new Date(orderDetails[0]?.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-[#f4e9de] px-3 py-2 text-sm font-medium text-[#6d4836]">
                {orderDetails[0]?.Order?.orderStatus}
              </span>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
            <section className="space-y-6">
              <div className="rounded-3xl border border-[#e8ddd1] bg-[#fffdf9] p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-semibold text-[#29221d]">
                    Items in this order
                  </h2>
                  <span className="text-sm text-[#5d4d44]">
                    {orderDetails.length} item
                    {orderDetails.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-5">
                  {orderDetails.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-[#efe4d9] bg-[#fff9f4] p-4 md:flex-row md:items-center"
                    >
                      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f0e1d3] p-3">
                        <img
                          src={`http://localhost:4000/${item.Product?.productImageUrl}`}
                          alt={item.Product?.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[#2f261f]">
                            {item.Product?.productName}
                          </h3>
                          <p className="mt-1 text-sm text-[#5d4d44]">
                            {item.Product?.Category?.categoryName}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-[#43372f] md:justify-end">
                          <span>Qty: {item.quantity}</span>
                          <span>Rs. {item.Product.productPrice}</span>
                          <span className="font-semibold text-[#1f1a17]">
                            Rs. {item.quantity * item.Product.productPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#e8ddd1] bg-[#fffdf9] p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-[#29221d]">
                  Summary
                </h2>
                <div className="mt-5 space-y-3 text-sm text-[#43372f]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>Rs. 100</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#e8ddd1] pt-3 text-base font-semibold text-[#1f1a17]">
                    <span>Total</span>
                    <span>
                      Rs. {currentOrder?.totalAmount ?? subtotal + 100}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <aside className="rounded-3xl border border-[#e8ddd1] bg-[#fffdf9] p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-[#29221d]">
                Customer
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-[#f4e9de] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f3b]">
                    Contact
                  </p>
                  <p className="mt-3 text-sm text-[#2b241f]">
                    {currentOrder?.firstName && currentOrder?.lastName
                      ? `${currentOrder.firstName} ${currentOrder.lastName}`
                      : "Customer details unavailable"}
                  </p>
                  <p className="mt-1 text-sm text-[#564a42]">
                    {currentOrder?.phoneNumber}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f4e9de] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f3b]">
                    Shipping address
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#2b241f]">
                    {currentOrder?.shippingAddress || "Address not available"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f4e9de] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f3b]">
                    Payment
                  </p>
                  <p className="mt-3 text-sm text-[#2b241f]">
                    {currentOrder?.Payment?.paymentMethod || "Pending"}
                  </p>
                </div>
              </div>

              {orderDetails[0]?.Order?.orderStatus !==
                OrderStatus?.Cancelled && (
                <button
                  onClick={cancelOrder}
                  className="mt-6 w-full rounded-full bg-[#a65f3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#864a2c]"
                >
                  Cancel order
                </button>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrderDetail;
