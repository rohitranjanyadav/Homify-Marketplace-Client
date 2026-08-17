import { Link } from "react-router-dom";
import type { IProduct } from "../types";

interface ICardProps {
  product: IProduct;
}

const Card: React.FC<ICardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group block w-full max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-[#e8ddd1] bg-[#fffdf9] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#69462d]/10">
          <img
            src={`http://localhost:4000/${product.productImageUrl}`}
            alt="Product"
            className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="px-5 py-4">
            <span className="mr-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a65f3b]">
              {product.Category.categoryName}
            </span>
            <p className="mt-1 block truncate font-serif text-xl font-semibold capitalize text-[#29221d]">
              {product.productName}
            </p>
            <div className="flex items-center">
              <p className="my-3 text-lg font-semibold text-[#29221d]">
                Rs. {product.productPrice}
              </p>
              <del>
                <p className="ml-2 text-sm text-[#9a8778]">
                  Rs. {product.discount}
                </p>
              </del>
              <div className="ml-auto rounded-full bg-[#f2e8de] p-2 text-[#875438] transition group-hover:bg-[#a65f3b] group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
            </div>
          </div>
      </div>
    </Link>
  );
};

export default Card;
