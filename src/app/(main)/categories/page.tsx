"use client";


import React, { Suspense, useEffect, useState } from "react";
import CategoryCard from "src/app/_Components/CategoryCard/CategoryCard";
import SubcategoryCard from "src/app/_Components/SubcategoryCard/page";
import loading from "src/app/loading";
import { getAllCategories } from "src/CategoriesAction/CategoriesAction";
import { category, categoryResponseData } from "src/types/categories.type";
import { SubCategory } from "src/types/subCategories.type";



export default function page() {
  
  const [subCategoriesList, setSubCategoriesList] = useState<SubCategory[]>([]);
  const [categorylist, setCategoryList] = useState<category[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    async function getCategories() {
      setLoader(true);
      const data= await getAllCategories()
      setCategoryList(data.data);
      setLoader(false);
    }
    getCategories();
  }, []);

  return (
    <div className="py-5 ">
      {Loader && <div >{loading()}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 w-11/12 p-5 mx-auto">
        {categorylist.map((category: category) => (
          <div
            key={category._id}
            onClick={() => setCategoryTitle(`${category.name} subcategories`)}
          >
            <CategoryCard
              key={category._id}
              category={category}
              setSubCategoriesList={setSubCategoriesList}
               setLoader={setLoader}
            />
          </div>
        ))}
      </div>

      <h2 className="text-center font-medium text-main text-[calc(1.325rem+.9vw)] my-4">
        {categoryTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 w-11/12 p-5 mx-auto">
        {subCategoriesList.map((subCategory: any) => (
          <div key={subCategory._id}>
            <SubcategoryCard subCategory={subCategory} />
          </div>
        ))}
      </div>
    </div>
  );
}
