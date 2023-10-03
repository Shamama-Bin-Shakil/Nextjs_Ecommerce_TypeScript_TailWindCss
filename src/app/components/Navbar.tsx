import Link from "next/link";
import React from "react";
import MenuBar from "./MenuBar";
import { Provider } from "react-redux";
import { store } from "../store/store";

const Navbar = () => {
  const navigation = [
    { name: "Product", href: "/product" },
    { name: "Search", href: "/search" },
    { name: "Order", href: "/order" },
  ];

  return (
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="h-8 w-auto text-3xl font-bold">
              <span>UIProduct</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-5">
            <MenuBar />
          </div>
        </nav>
      </header>
  );
};

export default Navbar;
