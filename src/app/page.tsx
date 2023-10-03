"use client";
import ProductCard from "./components/ProductCard";
import HeroSection from "./components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import FooterSection from "./components/Footer";
import { useGetProductQuery } from "./store/Product";
import { useUserLoadQuery } from "./store/User";
import { userLoad } from "./store/Authentication";
import { useDispatch } from "react-redux";
import Loading from "./loading";

export type UIProduct = {
  map(
    arg0: (item: UIProduct) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  stock: number;
};

function Home() {
  const { data, isLoading } = useGetProductQuery({product: true});

  if (isLoading) return <Loading />;

  
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Product */}
      <div>
        <div className="text-center font-bold text-6xl">
          <h1>Our Product</h1>
        </div>

        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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

      {/* Footer */}
      <FooterSection />
    </>
  );
}
export default Home;
