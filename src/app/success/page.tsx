"use client"
import FooterSection from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import OrderImage from "@/app/successOrder.svg";
import Link from "next/link";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
const Success = () => {
  const states = useSelector((state: any) => state.authentication);

  if (states.auth === false) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center">
        <div className="h-auto w-[500px] p-10 bg-slate-50 shadow-xl shadow-slate-200 flex justify-center items-center text-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1 className="text-2xl font-bold my-3">Thank You for Ordering!</h1>
          <p className="text-slate-600 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
            totam voluptate, a et quis voluptas.
          </p>

          <div>
            <Link
              href="/"
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Order
            </Link>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default Success;
