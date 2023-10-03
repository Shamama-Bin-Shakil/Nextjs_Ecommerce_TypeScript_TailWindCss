"use client";

import { useParams } from "next/navigation";
import { UIProduct } from "@/app/page";
import { useState } from "react";
import { useGetSingleProductQuery } from "@/app/store/Product";
import { useDispatch, useSelector } from "react-redux";
import { card } from "@/app/store/AddToCard";
import { saveCard } from "@/app/store/AddToCard";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/Footer";
import {toast} from "react-toastify";
import Loading from "@/app/loading";
export type AddToCardDataType = {
  id: number
  title: string;
  price: number;
  qty: number;
  image: string;
};

const ProductDetail = () => {
  const params = useParams();
  const [quantityValue, setQuantityValue] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSingleProductQuery(params?.productId);


  const incrementQuantity = () => {
    let stock = data?.stock;
    if (stock! <= quantityValue) return;
    setQuantityValue(quantityValue + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantityValue) return;
    setQuantityValue(quantityValue - 1);
  };

  const AddToCardHandler = () => {
    const saveCardData: AddToCardDataType = {
      id: data.id,
      title: data.title,
      price: data.price,
      qty: quantityValue,
      image: data.thumbnail,
    };
    
    dispatch(card(saveCardData));
    dispatch(saveCard());
    toast.success("Product add to card");
  };

  if (isLoading) return <Loading />;

  return (
    <>
    <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Product Detail
          </h2>

          <div className="grid grid-cols-6 gap-4 p-3">
            <div className="col-start-1 col-end-4 max-h-96 overflow-hidden">
              <img
                src={data?.thumbnail}
                alt="asd"
                className="w-full h-full object-contain transition-transform transform hover:scale-110"
              />
            </div>

            <div className="col-end-7 col-span-3">
              <h1 className="text-4xl font-semibold">{data?.title}</h1>

              {/* Star Rating */}
              <div className="flex items-center space-x-1 mt-2 mb-5">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>{" "}
                (4.0)
              </div>

              <h1 className="text-2xl font-semibold mb-3">
                Price: ${data?.price}
              </h1>
              <p>Stock: {data?.stock}</p>

              <hr />

              <div className="flex flex-row gap-2 mb-4 mt-4">
                <button
                  type="submit"
                  className="flex rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  S
                </button>
                <button
                  type="submit"
                  className="flex rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  M
                </button>
                <button
                  type="submit"
                  className="flex rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  L
                </button>
              </div>

              <hr />

              <div className="mt-6 flex flex-row gap-20">
                <div>
                  <button
                    className="bg-blue-700 text-white py-2 px-4 rounded-l-lg"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="px-2 py-2 w-16 bg-slate-200 text-center"
                    value={quantityValue}
                    readOnly
                  />
                  <button
                    className="bg-blue-700 text-white py-2 px-4 rounded-r-lg"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>

                <div>
                  <button
                    className="bg-blue-700 text-white py-2 px-8 rounded-lg"
                    onClick={AddToCardHandler}
                  >
                    Add To Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default ProductDetail;
