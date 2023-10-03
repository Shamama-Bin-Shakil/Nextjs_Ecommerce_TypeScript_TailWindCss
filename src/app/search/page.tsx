"use client";
import {FormEvent} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { UIProduct } from "../page";
import { useState } from "react";
import useDebounce from "../hook/useDebounce";
import { useGetProductWithSearchQuery } from "../store/Product";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search: string = searchParams?.get("q")!;

  const [searchInput, setSearchInput] = useState("");
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(search, 500);

  const searchButtonHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput(searchInput);
    router.push(`/search?q=${searchInput}`);
  };

  const { data, isLoading } = useGetProductWithSearchQuery(debouncedValue);

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Search Product
          </h2>
          <form
            className="flex items-center justify-center p-5"
            onSubmit={searchButtonHandler}
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="py-3 px-3 w-full bg-slate-200"
              onKeyDown={(e) =>
                e.key === "Enter" ? searchButtonHandler : null
              }
            />
            <button type="submit" className="py-3 px-5 text-white bg-blue-600">
              Search
            </button>
          </form>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Product
          </h2>

          {isLoading ? (
            <div className="mt-20 w-full flex flex-col justify-center items-center text-center">
              <h1 className="text-2xl py-5 font-semibold">
                Search Product Start ....
              </h1>
            </div>
          ) : data.total === 0 ? (
            <>
              <div className="mt-20 w-full flex flex-col justify-center items-center text-center">
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
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>

                <h1 className="text-2xl py-5 font-semibold">
                  No Data Found Yet!
                </h1>
              </div>
            </>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data?.products.map((item: UIProduct) => {
                  return <ProductCard key={item.id} {...item} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
