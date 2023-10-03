"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState, FormEvent } from "react";
import { useRouter, redirect } from "next/navigation";
import { useCreateUserMutation } from "../store/User";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string>("");

  const handleSetImage = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (event: any) => {
      setAvatar(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const [createUser, { isLoading }] = useCreateUserMutation();
  const states = useAppSelector((state) => state.authentication);

  const createAccoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, email, password, avatar: avatar };
    const result: any = await createUser(data);
    console.log(result);
    if (result.data.success === true) {
      toast.success(result.data.message);
      router.push("/");
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

      <div className="flex h-screen flex-col justify-center px-6 py-12 mt-10">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Open An Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={createAccoutHandler}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Image
              </label>
              <div className="mt-2">
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSetImage(e)}
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
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-10 w-full flex text-sm text-gray-500 underline">
            <Link href="/login" className="text-center w-full">
              Already have an Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
