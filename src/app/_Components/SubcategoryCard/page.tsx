import React, { Suspense } from "react";
import { Card, CardFooter, CardTitle } from "src/components/ui/card";
import { SubCategory } from "src/types/subCategories.type";
import HomeLoading from "../HomeLoading/HomeLoading";

export default function SubcategoryCard({
  subCategory,
}: {
  subCategory: SubCategory;
}) {
  const { name } = subCategory;

  return (
    <Suspense fallback={<HomeLoading />}>
      <Card className="bg-gray p-0 hover:shadow-[1px_1px_10px_#4fa74f] transition-all duration-500">
        <CardFooter className="p-5 justify-center ">
          <CardTitle className="text-center text-[calc(1.3rem+.6vw)] text-[rgb(33,37,41)] xl:text-[28px]">{name}</CardTitle>
        </CardFooter>
      </Card>
    </Suspense>
  );
}
