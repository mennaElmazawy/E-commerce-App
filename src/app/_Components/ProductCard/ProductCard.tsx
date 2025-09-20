import React, { useContext } from "react";
import {
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { product } from "src/types/products.type";
import Link from "next/link";
import AddCardBtn from "./AddCardBtn";
import { AddProductToWishList } from "src/WhishlistAction/WhishlistAction";
import { toast } from "sonner";
import { WishlistContext } from "src/WishListProvider";


export default function ProductCard({ product }: { product: product }) {
  const { getAllWishListData, wishlist } = useContext(WishlistContext);

  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
  } = product;

   async function AddtoWishlist(id: string) {
    const data = await AddProductToWishList(id);
    if (data.status == "success") {
      toast.success("Added to Wish List", { position: "top-center" });

      getAllWishListData();
    } else {
      toast.error("Failed to add to Wish List", { position: "top-center" });
    }
  }

  return (
    <Card className="bg-gray group  hover:shadow-[1px_1px_10px_#4fa74f] transition-shadow duration-500">
      <Link href={"/products/" + _id}>
        <CardHeader>
          <Image
            src={imageCover}
            alt={title}
            width={200}
            height={100}
            className="w-full h-72 object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-main">{name}</CardTitle>
          <CardTitle className="py-2">{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
          <div className="flex justify-between items-center">
            <span>{price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {ratingsAverage}
            </span>
          </div>
        </CardContent>
      </Link>
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

      <CardFooter className="opacity-0 translate-y-[400px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
        <AddCardBtn id={_id} />
      </CardFooter>
    </Card>
  );
}
