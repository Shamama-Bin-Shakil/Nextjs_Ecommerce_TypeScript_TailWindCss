import "./globals.css";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import RTKQueryProvider from "./RTKQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Online Shop",
  description: "Ecommerce Online Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RTKQueryProvider>
      <html lang="en">
      <head>
        <link rel="shortcut icon" href="shopping.png" type="image/x-icon" />
      </head>
        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </html>
    </RTKQueryProvider>
  );
}
