"use client";
import FooterSection from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { useGetSingleOrderQuery } from "@/app/store/Order";
import { useParams } from "next/navigation";
import Loading from "@/app/loading";
const Success = () => {
  const params: any = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(params.orderId);

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-600 mb-4">
            Order Id #{data.order.id}
          </h2>

          {data.order.OrderItems.map((item: any) => {
            return (
              <div
                className="flex flex-row mt-3 mb-3 border-2 border-solid border-gray-300 rounded-md p-4"
                key={item.id}
              >
                <div className="h-48 w-52 mr-4 overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt="asd"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-row w-full">
                  <div className="w-full h-full flex flex-col justify-evenly items-start">
                    <p className="font-semibold text-slate-800 ">
                      Product id: {item.id}
                    </p>
                    <p className=" text-slate-800 ">{item.title}</p>
                    <p className="text-slate-600">Qty: {item.qty}</p>
                    <p className="text-slate-600">Price: PKR {item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-10">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Address</h3>
              <h3 className="text-gray-600 text-sm">
                {data?.order.shippingInfo.address},{" "}
                {data?.order.shippingInfo.city},{" "}
                {data?.order.shippingInfo.province}
              </h3>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Order Status</h3>
              <h3 className="text-gray-600 text-sm"  style={{color: data?.order.orderStatus === "Processing" ? "red" : 'green'}}>
                {data?.order.orderStatus}
              </h3>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Payment Type</h3>
              <h3 className="text-gray-600 text-sm">
              {data?.order.paymentMethod === "cod" ? "Cash Out Delivery" : "Credit Card"}
              </h3>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Payment Status</h3>
              <h3 className="text-gray-600 text-sm">
              {data?.order.paymentStatus}
              </h3>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Order Date</h3>
              <h3 className="text-gray-600 text-sm">{data?.order.createAt}</h3>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-xl">Subtotal</h3>
              <h3 className="text-gray-600 text-sm">
                PKR &nbsp; {data?.order.totalPrice}.00
              </h3>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
};

export default Success;
