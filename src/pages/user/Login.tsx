import { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/authSlice";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);

  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-3xl border border-[#e7dbcf] bg-[#fffdf9] p-8 shadow-xl shadow-[#69462d]/10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c5738] font-serif text-2xl text-white">h</div>

          <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a65f3b]">Welcome back</p>
          <h2 className="my-3 text-center font-serif text-3xl font-semibold tracking-tight text-[#29221d]">
            Sign In , {user?.username}
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email-address"
                  autoComplete="email-address"
                  required
                  className="mt-1 block w-full rounded-xl border border-[#dfcebe] bg-[#fffdf9] px-3 py-3 text-sm outline-none transition focus:border-[#a65f3b]"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="mt-1 block w-full rounded-xl border border-[#dfcebe] bg-[#fffdf9] px-3 py-3 text-sm outline-none transition focus:border-[#a65f3b]"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-[#a65f3b] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#864a2c]"
              >
                Login Account
              </button>
            </div>
            <p className="text-center text-sm text-[#755f4f]">
              Don't have an account? <Link className="font-semibold text-[#a65f3b]" to="/register">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
