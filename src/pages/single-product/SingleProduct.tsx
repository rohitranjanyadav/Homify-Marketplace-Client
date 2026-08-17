import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProduct } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

function SingleProduct() {
  const { id } = useParams();

  const { product } = useAppSelector((store) => store.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, []);

  const handleAddToCard = () => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f7f3ed] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-[#e8ddd1] bg-[#fffdf9] p-4 shadow-sm md:flex-row md:p-7">
            <div className="md:flex-1 px-4">
              <div className="mb-5 h-[460px] overflow-hidden rounded-2xl bg-[#eadfd3]">
                <img
                  className="h-full w-full object-cover"
                  src={`http://localhost:4000/${product?.productImageUrl}`}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full rounded-full bg-[#a65f3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#864a2c]"
                    onClick={handleAddToCard}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full rounded-full border border-[#dbcbbb] bg-[#f7f3ed] px-4 py-3 text-sm font-semibold text-[#654a39] transition hover:bg-[#eee3d8]">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a65f3b]">Made for your space</p>
              <h2 className="mb-5 font-serif text-4xl font-semibold text-[#29221d]">
                {product?.productName}
              </h2>

              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-semibold text-[#49382d]">
                    Price:
                  </span>
                  <span className="ml-1 text-[#806b5b]">
                    Rs. {product?.productPrice}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#49382d]">
                    Availability: (In Stock)
                  </span>
                  <span className="ml-1 text-[#806b5b]">
                    {product?.productTotalStock}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="inline-block rounded-full bg-[#f2e7db] px-3 py-1 text-sm font-medium text-[#805038]">
                  Category : {product?.Category.categoryName}
                </span>
              </div>

              <div>
                <span className="font-semibold text-[#49382d]">
                  Product Description:
                </span>
                <p className="mt-2 text-sm leading-7 text-[#806b5b]">
                  {product?.productDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
