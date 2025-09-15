import Image from "next/image";
import { product, productData } from "src/types/products.type";
import ProductCard from "./_Components/ProductCard/ProductCard";
import MainSlider from "./_Components/MainSlider/MainSlider";
import { Suspense } from "react";
import HomeLoading from "./_Components/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
  const data: productData = await res.json();
  const productlist: product[] = data.data;
  return (
    <>
      <MainSlider />
      <Suspense fallback={<HomeLoading/>}>
        {
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {productlist.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        }
      </Suspense>
    </>
  );
}
