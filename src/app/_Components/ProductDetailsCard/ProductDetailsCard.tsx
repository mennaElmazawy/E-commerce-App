import Image from "next/image";
import React from "react";
import { Button } from "src/components/ui/button";
import { productItem } from "src/types/productsDetails.type";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCardBtn from "../ProductCard/AddCardBtn";

export default function ProductDetailsCard({product}: {  product: productItem;}) {

    const {imageCover, title, ratingsAverage, price, category:{name}, _id, description,images} = product;
  return (
    <div className="w-4/5 m-auto ">
      <div className="grid grid-cols-12 items-center gap-24">
        <div className="col-span-4">
             {/* <Image src={imageCover} alt={title} width={200} height={100} className="w-full h-72 object-cover" /> */}

             <ProductSlider images={images}/>
        </div>
        <div className="col-span-8">
            <h1>{title}</h1>
            <p>{description}</p>
            <h5 className="text-main my-10">{name}</h5>
             <div className="flex justify-between items-center">
            <span>{price}</span>
            <span><i className="fa-solid fa-star rating-color"></i>{ratingsAverage}</span>
          </div>
           <AddCardBtn id={_id} />
        </div>
      </div>
    </div>
  );
}
