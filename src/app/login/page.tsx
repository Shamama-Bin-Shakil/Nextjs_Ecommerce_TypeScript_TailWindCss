"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../store/User";
import { useRouter, redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLoad } from "../store/Authentication";
import { useAppSelector } from "../store/store";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading, isSuccess, data }] = useLoginUserMutation();

  const states = useAppSelector((state) => state.authentication);

  const loginAccoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    const result: any = await loginUser(data);
    if (result?.data?.success === true) {
      toast.success(result.data.message);
      location.reload();
      dispatch(userLoad(result.data));
    } else {
      toast.error(result.data.message);
    }
  };
  if (states.auth === true) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen flex-col justify-center px-6 py-12">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginAccoutHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading ? true : false}
              >
                {isLoading ? "loading..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-10 w-full flex text-sm text-gray-500 underline">
            <Link href="/register" className="text-center w-full">
              Create Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
