"use client";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { card, cardItemRemove, saveCard } from "../store/AddToCard";
import { AddToCardDataType } from "../product/[productId]/page";

const Card = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state: any) => state.addtocard);

  let subTotal = data.reduce((sum: any, current: any) => {
    return sum + current.qty * current.price;
  }, 0);

  const CardRemoveItem = (id: number) => {
    dispatch(cardItemRemove(id));
    dispatch(saveCard());
  };

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Shopping Card
          </h2>

          {data.length <= 0 ? (
            <>
              <div className="mt-20 flex flex-col justify-center items-center text-center p-3">
            
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-24 h-24 text-2xl text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <h1 className="text-2xl py-5 font-semibold">Card Empty Yet!</h1>
              </div>
            </>
          ) : (
            data.map((item: AddToCardDataType, index: number) => {
              return (
                <div key={index}>
                  <hr />

                  <div className="flex flex-row mt-3 mb-3">
                    <div className="h-48 w-52 mr-4 overflow-hidden bg-slate-200">
                      <img
                        src={item.image}
                        alt="asd"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex flex-row w-full">
                      <div className="w-full">
                        <p className="font-semibold text-slate-800 ">
                          {item.title}
                        </p>
                        <p className="text-slate-600 mt-1 mb-4">
                          Qty: {item.qty}
                        </p>
                        <span
                          className="text-red-600 font-bold cursor-pointer"
                          onClick={() => CardRemoveItem(item.id)}
                        >
                          Remove
                        </span>
                      </div>
                      <div className="mr-5 flex flex-col justify-between ">
                        <p className="text-slate-600">${item.price}</p>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              );
            })
          )}
          {data.length !== 0 && (
            <div className="mt-10">
              <div className="flex flex-row mb-10">
                <div className="w-full">
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">
                    Subtotal
                  </h3>
                  <p className="text-gray-700">
                    Shipping and taxes will be calculated at checkout.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">
                    ${subTotal}.00
                  </h3>
                </div>
              </div>

              <div className="flex flex-col text-center">
                <Link
                  href="/billingaddress"
                  className="w-auto py-3 px-3 rounded-md bg-blue-600 text-white mb-3"
                >
                  Checkout
                </Link>

                <Link href="/product" className="underline">
                  Continue Shopping →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Card;
