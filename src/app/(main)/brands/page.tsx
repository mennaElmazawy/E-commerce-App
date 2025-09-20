import React from "react";
import BrandCard from "src/app/_Components/BrandCard/BrandCard";
import { Brands, BrandsData } from "src/types/Brands.type";

export const metadata={title:'Brands component'}
export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`);
  const data: Brands = await res.json();
  const brandsList: BrandsData[] = data.data;

  return (
    <div className="py-5">
      <h1 className="text-main text-center text-4xl py-5 ">All Brands</h1>
      <div className="grid grid-cols-1 my-5 py-5 md:grid-cols-4 gap-8 w-10/12 mx-auto">
        {brandsList.map((brand) => {
        return <BrandCard key={brand._id} brand={brand} />;
      })}
      </div>
    </div>
  );
}
