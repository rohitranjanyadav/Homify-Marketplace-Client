import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import Card from "./components/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";

function Product() {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f3ed] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a65f3b]">The Homify collection</p>
          <div className="mb-10 mt-3 flex flex-wrap items-end justify-between gap-4"><h1 className="font-serif text-4xl text-[#29221d] sm:text-5xl">Find your next favourite piece.</h1><p className="max-w-sm text-sm leading-6 text-[#765f4f]">Practical, inviting pieces for every corner of your home.</p></div>
        <section
          id="Projects"
          className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.length > 0 &&
            products.map((product) => {
              return <Card product={product} />;
            })}
        </section>
        </div>
      </div>
    </>
  );
}

export default Product;
