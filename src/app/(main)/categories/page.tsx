"use client";

import { getServerSession } from "next-auth";
import React, { Suspense, useEffect, useState } from "react";
import CategoryCard from "src/app/_Components/CategoryCard/CategoryCard";
import HomeLoading from "src/app/_Components/HomeLoading/HomeLoading";
import SubcategoryCard from "src/app/_Components/SubcategoryCard/page";
import { NextOptions } from "src/app/api/auth/[...nextauth]/route";
import { category, categoryResponseData } from "src/types/categories.type";
import { SubCategory } from "src/types/subCategories.type";

export default function page() {
  // const data = await getServerSession(NextOptions);
  const [subCategoriesList, setSubCategoriesList] = useState<SubCategory[]>([]);
  const [categorylist, setCategoryList] = useState<category[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
      );
      const data: categoryResponseData = await res.json();
      setCategoryList(data.data);
    }
    load();
  }, []);

  return (
    <>
      <Suspense fallback={<HomeLoading />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
          {categorylist.map((category: category) => {
            return (
              <div
                key={category._id}
                onClick={() =>
                  setCategoryTitle(`${category.name} subcategories`)
                }
              >
                <CategoryCard
                  key={category._id}
                  category={category}
                  setSubCategoriesList={setSubCategoriesList}
                />
              </div>
            );
          })}
        </div>

        <h2 className="text-center font-medium text-main text-[calc(1.325rem+.9vw)] my-4">
          {categoryTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 ">
          {subCategoriesList.map((subCategory: any) => {
            return (
              <div className="">
                <SubcategoryCard
                  key={subCategory._id}
                  subCategory={subCategory}
                />
              </div>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}
