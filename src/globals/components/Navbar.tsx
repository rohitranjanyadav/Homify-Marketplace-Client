import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

function Navbar() {
  const reduxToken = useAppSelector((store) => store.auth.user.token);
  const localStorageToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { label: "Sofas", to: "/" },
    { label: "Beds", to: "/" },
    { label: "Tables", to: "/" },
    { label: "Decor", to: "/" },
    { label: "Lighting", to: "/" },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(!!localStorageToken || !!reduxToken);
  }, [localStorageToken, reduxToken]);

  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8b6f47] text-sm font-semibold text-white">
            H
          </span>
          <div className="leading-tight">
            <span className="block text-base font-semibold tracking-wide text-neutral-900">
              Homify
            </span>
            <span className="block text-xs text-neutral-500">
              Furniture & household items
            </span>
          </div>
        </Link>

        <div className="hidden w-full items-center justify-center gap-2 overflow-x-auto rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm md:flex md:w-auto md:flex-1 md:border-0 md:bg-transparent md:px-0 md:py-0">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.to}
              className="whitespace-nowrap rounded-full px-4 py-2 font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              {category.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <Link
              to="/logout"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 sm:inline-flex"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden rounded-full bg-[#8b6f47] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#715839] sm:inline-flex"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="hidden rounded-full bg-[#8b6f47] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#715839] sm:inline-flex"
              >
                Login
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
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

        <div
          className={`w-full md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        >
          <div className="mt-2 flex flex-wrap gap-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
            {categories.map((category) => (
              <Link
                key={category.label}
                to={category.to}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-200"
              >
                {category.label}
              </Link>
            ))}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#8b6f47] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#715839]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#8b6f47] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#715839]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/logout"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900"
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
