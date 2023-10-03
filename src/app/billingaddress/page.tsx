"use client";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { card, cardItemRemove, saveCard } from "../store/AddToCard";
import { AddToCardDataType } from "../product/[productId]/page";
import { useState } from "react";
import Image from "next/image";
import productImage from "@/app/avatar.png";
import { redirect, useRouter } from "next/navigation";
import { useCreateOrderMutation } from "../store/Order";

const BillingAddress = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const states = useSelector((state: any) => state.authentication);
  const addToCardData = useSelector((state: any) => state.addtocard);

  const [createOrder, { data, isLoading, isSuccess, status }] =
    useCreateOrderMutation();

  let subTotal = addToCardData.data.reduce((sum: any, current: any) => {
    return sum + current.qty * current.price;
  }, 0);

  const placeOrderNowHandler = () => {
    JSON.stringify(
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify({
          street,
          province,
          city,
          address,
          paymentMethod,
          subTotal,
          product: addToCardData.data,
        })
      )
    );
    if (paymentMethod === "cod") {
      const createOrderData = {
        street,
        province,
        city,
        address,
        paymentMethod,
        subTotal,
        product: addToCardData.data,
        paymentStatus: "Pending",
      };

      createOrder(createOrderData);
      localStorage.removeItem("cardItem");
    } else if (paymentMethod === "card") {
      router.push("/checkout");
    }
  };

  if (data?.success === true) {
    router.push("/success");
  }

  if (states.auth === false) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Billing Information
          </h2>

          <div className="grid grid-cols-3 items-start gap-4">
            <div className="col-span-2 bg-gray-50">
              <h3 className="font-semibold text-lg bg-gray-600 px-4 py-2 text-white">
                Personal Address
              </h3>

              <form className="space-y-6 p-4">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street
                  </label>
                  <div className="mt-2">
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Province
                  </label>
                  <div className="mt-2">
                    <input
                      id="province"
                      name="province"
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </form>
              <h3 className="font-semibold text-lg bg-gray-600 px-4 py-2 text-white">
                Payment Information
              </h3>

              <form className="p-4">
                <div className="mb-2">
                  <label htmlFor="payment">
                    <input
                      type="radio"
                      name="payment_type"
                      value="card"
                      id="payment"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                      className="mx-2"
                    />
                    Credit card
                  </label>
                </div>

                <div className="mb-2">
                  <label htmlFor="address2">
                    <input
                      type="radio"
                      name="payment_type"
                      value="cod"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      id="address2"
                      required
                      className="mx-2"
                    />
                    Cash Out Delivery
                  </label>
                </div>
              </form>
            </div>

            <div className="bg-gray-50 p-4">
              <h3 className="text-center font-bold text-xl mb-3">Your Order</h3>
              <div className="px-2">
                <hr />
              </div>

              {addToCardData.data.map((item: any) => {
                return (
                  <div
                    className="flex flex-row items-center justify-start my-3 px-2"
                    key={item.id}
                  >
                    <Image
                      src={item.image}
                      width="100"
                      height="100"
                      className="mr-4"
                      alt="product"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm">{item.title}</p>
                      <p className="text-sm">
                        <strong>Price:</strong>
                        {item.price}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="px-2">
                <hr />
              </div>

              <div className="px-2 my-3">
                <div className="flex flex-row justify-between">
                  <strong>Sub Total:</strong>
                  <p className="text-sm">PKR {subTotal}</p>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center mt-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={placeOrderNowHandler}
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading..." : "Place Order Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BillingAddress;
