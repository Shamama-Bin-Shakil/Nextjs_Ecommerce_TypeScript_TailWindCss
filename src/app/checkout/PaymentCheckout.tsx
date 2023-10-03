"use client";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { useCreateOrderMutation } from "../store/Order";
import { useAppSelector } from "../store/store";
const PaymentCheckout = () => {
  const router = useRouter();

  const addToCardData = useSelector((state: any) => state.addtocard);
  const states = useAppSelector((state: any) => state.authentication);
  console.log(states);

  let subTotal = addToCardData.data.reduce((sum: any, current: any) => {
    return sum + current.qty * current.price;
  }, 0);

  const [createOrder, { data, isLoading }] = useCreateOrderMutation();

  const stripe = useStripe();
  const elements = useElements();

  const SendMoney = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/payment`, {
      method: "POST",
      body: JSON.stringify({ amount: subTotal }),
      headers: { "content-type": "application/json" },
    });
    const { paymentIntent } = await res.json();

    const receive = await stripe?.confirmCardPayment(paymentIntent, {
      payment_method: {
        card: elements?.getElement(CardNumberElement)!,
      },
    });

    if (receive?.paymentIntent?.status === "succeeded") {
      const localStorageData = JSON.parse(
        localStorage.getItem("deliveryAddress")!
      );

      const createOrderData = {
        street: localStorageData.street,
        province: localStorageData.province,
        city: localStorageData.city,
        address: localStorageData.address,
        paymentMethod: localStorageData.paymentMethod,
        paymentStatus: receive?.paymentIntent?.status,
        subTotal,
        product: addToCardData.data,
      };
      createOrder(createOrderData);
    }
  };

  if (data?.success === true) {
    console.log(data);
    localStorage.removeItem("cardItem");
    router.push("/success");
  }

  if (states.auth !== true) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen flex-col justify-center px-6 py-12">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Payment Now
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Card Number
              </label>
              <div className="mt-2">
                <CardNumberElement className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Expiry Date
              </label>
              <div className="mt-2">
                <CardExpiryElement className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CVC
              </label>
              <div className="mt-2">
                <CardCvcElement className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={SendMoney}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Loading..." : `Pay PKR${subTotal}.00`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentCheckout;
