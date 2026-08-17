import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/cartSlice";

function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const { items } = useAppSelector((store) => store.cart);
  const localStorageToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const categories = [
    { label: "Products", to: "/products" },
    { label: "Beds", to: "/" },
    { label: "Tables", to: "/" },
    { label: "Decor", to: "/" },
    { label: "Lighting", to: "/" },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!localStorageToken || !!reduxToken);
    if (isLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, [isLoggedIn]);

  return (
    <nav className="sticky inset-x-0 top-0 z-20 border-b border-[#e6dbcf] bg-[#fffdf9]/95 shadow-[0_2px_18px_rgba(61,42,28,0.04)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7c5738] text-lg font-serif font-semibold text-white shadow-sm">
            h
          </span>
          <div className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-wide text-[#29221d]">
              Homify
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-[#8a7463]">
              Made for living
            </span>
          </div>
        </Link>

        <div className="hidden w-full items-center justify-center gap-2 overflow-x-auto rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm md:flex md:w-auto md:flex-1 md:border-0 md:bg-transparent md:px-0 md:py-0">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.to}
              className="whitespace-nowrap rounded-full px-4 py-2 font-medium text-[#765f4f] transition hover:bg-[#f3ece3] hover:text-[#29221d]"
            >
              {category.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <>
              <span className="mr-2.5 rounded-full border border-[#e6dbcf] px-3 py-2 text-sm font-medium text-[#5f4939] transition hover:bg-[#f7f0e8]">
                <Link to="/my-cart" className="flex items-center gap-1.5">
                  Bag <sup className="rounded-full bg-[#a65f3b] px-1.5 text-[10px] text-white">{items.length > 0 ? items.length : 0}</sup>
                </Link>
              </span>
              <Link
                to="/logout"
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#5f4939] transition hover:bg-[#f3ece3] hover:text-[#29221d] sm:inline-flex"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden rounded-full border border-[#d8c2aa] px-4 py-2 text-sm font-medium text-[#6e4d33] transition hover:bg-[#f5ede4] sm:inline-flex"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="hidden rounded-full bg-[#a65f3b] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#864a2c] sm:inline-flex"
              >
                Login
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e6dbcf] text-[#5f4939] transition hover:bg-[#f3ece3] hover:text-[#29221d] md:hidden"
            aria-label="Toggle categories"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle categories</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className={`w-full md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="mt-2 flex flex-wrap gap-2 rounded-2xl border border-[#e6dbcf] bg-[#fffdf9] p-3 shadow-lg shadow-[#4a3020]/5">
            {categories.map((category) => (
              <Link
                key={category.label}
                to={category.to}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-[#f3ece3] px-4 py-2 text-sm font-medium text-[#5f4939] transition hover:bg-[#eadaca]"
              >
                {category.label}
              </Link>
            ))}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#a65f3b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#864a2c]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#a65f3b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#864a2c]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#5f4939] transition hover:bg-[#f3ece3] hover:text-[#29221d]"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
