"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import FooterSection from "../components/Footer";
import { useAppSelector } from "../store/store";
import { useRouter, redirect } from "next/navigation";
import { useUserLogoutMutation } from "../store/User";
import { userLogoutStore } from "../store/Authentication";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const states: any = useAppSelector((state) => state.authentication);
  const [userLogout, { isLoading, isSuccess }] = useUserLogoutMutation();


  if (isLoading) return <Loading />;


  const Logout = () => {
    userLogout(true);
    dispatch(userLogoutStore());
    toast.success("Logout Successfully");
    redirect("/login");
  };

  if (states.auth === false) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />

      <div className="mt-36 gap-4 mx-auto max-w-2xl">
        <div className="row-span-1 flex items-center justify-center flex-col rounded-md py-3 mb-2">
          <Image
            src={states.data?.avatar?.url}
            width={120}
            height={120}
            alt="logo"
            className="border-2 border-solid border-white-700 rounded-full mb-2"
          />
          <h3 className="text-sm underline cursor-pointer">
            {states.data?.name}
          </h3>
        </div>

        {/* Personal Information< */}
        <div className="row-span-1 col-span-1 bg-blue-50 rounded-md p-4 mb-4">
          <div className="my-3">
            <h1 className="font-semibold text-2xl">Personal Information</h1>
          </div>

          <div className="my-3">
            <h3 className="font-medium text-md">Name</h3>
            <p className="text-sm">{states.data?.name}</p>
          </div>
          <div className="my-3">
            <h3 className="font-medium text-md">Email</h3>
            <p className="text-sm">{states.data?.email}</p>
          </div>
          <div className="my-3">
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Password Management */}
        <div className="row-span-1 col-span-1 bg-blue-50 rounded-md p-4 mb-4">
          <div className="my-3">
            <h1 className="font-semibold text-2xl">Password Management</h1>
          </div>

          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Password Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default Profile;
