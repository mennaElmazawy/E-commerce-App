'use client'


import React, { useContext } from "react";
import { productItem } from "src/types/productsDetails.type";
import ProductSlider from "../ProductSlider/ProductSlider";
import AddCardBtn from "../ProductCard/AddCardBtn";
import { AddProductToWishList } from "src/WhishlistAction/WhishlistAction";
import { WishlistContext } from "src/WishListProvider";
import { toast } from "sonner";

export default function ProductDetailsCard({
  product,
}: {
  product: productItem;
}) {
  const { getAllWishListData, wishlist } = useContext(WishlistContext);
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
    description,
    images,
  } = product;
 async function AddtoWishlist(id: string) {
    const data = await AddProductToWishList(id);
    if (data.status == "success") {
      toast.success("Added to Wish List", { position: "top-center" });

      getAllWishListData();
    } else {
      toast.error("Failed to add to Wish List", { position: "top-center" });
    }}

  return (
    <div className="w-4/5 m-auto ">
      <div className="grid grid-cols-12 items-center gap-24">
        <div className="col-span-4">
          <ProductSlider images={images} />
        </div>
        <div className="col-span-8">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p>{description}</p>
          <h5 className="text-main my-10">{name}</h5>
          <div className="flex justify-between items-center">
            <span>{price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {ratingsAverage}
            </span>
          </div>
          <span
            className="flex justify-end cursor-pointer px-5"
            onClick={() => AddtoWishlist(_id)}
          >
            <i
              className={`fa-solid fa-heart text-2xl ${
                wishlist.some((item) => item._id === _id)
                  ? "text-red-500"
                  : "text-black"
              }`}
            />
          </span>
          <AddCardBtn id={_id} />
        </div>
      </div>
    </div>
  );
}
