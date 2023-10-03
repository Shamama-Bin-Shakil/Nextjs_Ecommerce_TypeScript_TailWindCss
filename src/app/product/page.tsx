"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { UIProduct } from "../page";
import { useGetProductQuery } from "../store/Product";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import FooterSection from "../components/Footer";
const Product = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search: string = searchParams?.get("category")!;

  let category = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  let skip = 1;
  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");
  const [pageActive, setPageActive] = useState(1);

  let limit = 20;
  skip = (pageActive - 1) * limit;

  const { data, isLoading } = useGetProductQuery({ search, skip });

  if (isLoading) return <h1>Loading...</h1>;

  const categoryHandler = (categoryValue: any) => {
    setInput(categoryValue);
    router.push(`/product?category=${categoryValue}`);
  };

  const clearFilterHandler = () => {
    router.push(`/product`);
  };

  const totalPage = Math.ceil(data.total / limit);

  let page: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }


  return (
    <>
      <Navbar />
      {/* Show Product All */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Product
          </h2>

          <div className="grid grid-rows-1 grid-flow-col gap-4">
            <div className="row-span-1 col-span-1 bg-gray-100 p-4 w-60 h-[600px] my-4 rounded-md">
              <div className="mb-3">
                <h2 className="font-semibold text-md">Filter</h2>

                <div
                  className="flex flex-row  items-center py-2 px-3 bg-red-200 rounded-lg cursor-pointer"
                  onClick={clearFilterHandler}
                >
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                  <button className="text-sm">Clear Filter</button>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-md">Category</h2>
                <form>
                  {category.map((cat, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          className="mr-2"
                          name={cat}
                          id={cat}
                          value={cat}
                          checked={cat === search ? true : false}
                          onClick={(e) => categoryHandler(cat)}
                        />
                        <label htmlFor={cat}>{cat}</label>
                      </div>
                    );
                  })}
                </form>
              </div>
            </div>

            <div className="row-span-1 row-start-1 col-start-2">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data &&
                  data?.products.map((item: UIProduct) => (
                    <ProductCard key={item.id} {...item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}

      {data.limit <= 24 && (
        <div className="h-20 flex justify-center items-center">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pageActive !== 1 && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={(e) => setPageActive(pageActive - 1)}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            )}
            {page.map((pageNo) => {
              return (
                <>
                  <div key={pageNo}>
                    <Link
                      href="#"
                      aria-current="page"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      style={{
                        backgroundColor: pageNo === pageActive ? "#5a67d8" : "",
                        color: pageNo === pageActive ? "#ffff" : "",
                      }}
                      onClick={(e) => setPageActive(pageNo)}
                    >
                      {pageNo}
                    </Link>
                  </div>
                </>
              );
            })}

            {pageActive !== Math.ceil(parseInt(data.total) / 24) && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={(e) => setPageActive(pageActive + 1)}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            )}
          </nav>
        </div>
      )}

      <FooterSection />
    </>
  );
};

export default Product;
