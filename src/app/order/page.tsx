"use client";
import FooterSection from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import OrderImage from "@/app/successOrder.svg";
import Link from "next/link";
import { useGetOrderQuery } from "../store/Order";
import { useAppSelector } from "../store/store";
import { redirect } from "next/navigation";
import Loading from "../loading";
const Success = () => {
  const { data, isLoading } = useGetOrderQuery("");
  const states = useAppSelector((state: any) => state.authentication);

  if (isLoading) return <Loading />;
  
  if (states.auth !== true) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            My Order
          </h2>

          {data?.order.length <= 0 ? (
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <h1 className="text-2xl py-5 font-semibold">
                Order Not Place Yet!
              </h1>
            </div>
          ) : (
            <div className="container mx-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Order Id
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Payment Type
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      <Link href="">Detail</Link>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.order?.map((item: any) => {
                    let date: string = item.createAt;
                    let justDate = date.substring(0, 10);
                    return (
                      <tr className="bg-white" key={item.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm">
                          {justDate}
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm text-center">
                          {item.paymentMethod === "cod"
                            ? "Cash Out Delivery"
                            : "Credit Card"}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm text-center">
                          <span
                            className="bg-green-300 px-4 py-2 rounded-full"
                            style={{
                              backgroundColor:
                                item.paymentStatus === "Pending"
                                  ? "#ed8787"
                                  : "#86efac",
                            }}
                          >
                            {item.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm text-center">
                          <span
                            className="bg-green-300 px-4 py-2 rounded-full"
                            style={{
                              backgroundColor:
                                item.orderStatus === "Processing"
                                  ? "#eae585"
                                  : "#86efac",
                            }}
                          >
                            {item.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-sm text-left">
                          <Link
                            href={`/order/${item.id}`}
                            className="text-gray-600 underline font-bold py-2 px-4 rounded"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default Success;
