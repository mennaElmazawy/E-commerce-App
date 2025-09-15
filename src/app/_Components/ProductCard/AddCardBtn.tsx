"use client";

import React, { useContext } from "react";
import { toast } from "sonner";
import { AddProductToCart } from "src/CartAction/CartAction";
import { Button } from "src/components/ui/button";
import { CountContext } from "src/CountProvider";

export default function AddCardBtn({ id }: { id: string }) {
  const { setCount } = useContext(CountContext);
  async function AddProduct(id: string) {
  try{
      const data = await AddProductToCart(id);
    if (data.status == "success") {
      toast.success(data.message, { position: "top-center" });
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),0);
      setCount(sum);
    } else {
      toast.error("Incorrect Id", { position: "top-center" });
    }
  }catch(err){
    toast.error("Please login to add products to cart", { position: "top-center" });
  }
  }

  return (
    <Button
      onClick={() => AddProduct(id)}
      className="bg-main w-full rounded-3xl cursor-pointer"
    >
      {" "}
      Add to cart
    </Button>
  );
}
