"use client";
import Link from "next/link";
import React, { useState } from "react";
import { store, useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { useUserLogoutMutation } from "../store/User";
import { useRouter } from "next/navigation";
import { userLogoutStore } from "../store/Authentication";
import { toast } from "react-toastify";
import Loading from "../loading";

const MenuBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const states = useAppSelector((state) => state.authentication);
  const [userLogout, { isLoading, isSuccess }] = useUserLogoutMutation();

  if (isLoading) return <Loading />;

  const Logout = () => {
    userLogout(true);
    dispatch(userLogoutStore());
    router.push("/login");
  };

  if (isSuccess) {
    toast.success("Logout Successfully");
  }

  return (
    <>
      <Link href="/card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Link>
      {states && states.auth !== true ? (
        <>
          <Link
            href="/register"
            className="text-sm font-semibold leading-6 bg-blue-600 py-1 px-3 text-white rounded-md"
          >
            Log in
          </Link>
        </>
      ) : (
        <>
          <Link href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </Link>

          <span onClick={Logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </span>
        </>
      )}
    </>
  );
};

export default MenuBar;
