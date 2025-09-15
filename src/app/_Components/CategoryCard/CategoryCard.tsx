import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { category } from "src/types/categories.type";
import { SubCategoryResponseData } from "src/types/subCategories.type";
import HomeLoading from "../HomeLoading/HomeLoading";

export default function CategoryCard({
  category,
  setSubCategoriesList,
}: {
  category: category;
  setSubCategoriesList: any;
}) {
  const { image, name, _id } = category;

  async function getSubCategory() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${_id}/subcategories`
    );
    const data: SubCategoryResponseData = await res.json();
    setSubCategoriesList(data.data);
    
  }

  return (
    <Suspense fallback={<HomeLoading />}>
      <div onClick={getSubCategory}>
        <Card className="bg-gray py-0 gap-0 hover:shadow-[1px_1px_10px_#4fa74f] transition-all duration-500">
          <CardContent className="px-0  ">
            <Image
              src={image}
              alt={name}
              width={100}
              height={300}
              className="w-full h-72 object-cover"
            />
          </CardContent>
          <CardFooter className="p-5 ">
            <CardTitle className="text-main mx-auto text-2xl text-[rgba(25,135,84,1)] text-[28px]">{name}</CardTitle>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
}
