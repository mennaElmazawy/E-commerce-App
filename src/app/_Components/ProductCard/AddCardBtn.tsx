"use client";

import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { AddProductToCart } from "src/CartAction/CartAction";
import { Button } from "src/components/ui/button";
import { CountContext } from "../../../CountProvider";

export default function AddCardBtn({
  id,
  onAdded,
}: {
  id: string;
  onAdded?: () => void;
}) {
  const { setCount } = useContext(CountContext);
  const [Loader, setLoader] = useState(false);

  async function AddProduct(id: string) {
    try {
      setLoader(true);
      const data = await AddProductToCart(id);

      if (data.status == "success") {
        toast.success(data.message, { position: "top-center" });
        const sum = data.data.products.reduce(
          (total: number, item: { count: number }) => (total += item.count),
          0
        );
        setCount(sum);
        if (onAdded) onAdded();
      } else {
        toast.error("Incorrect Id", { position: "top-center" });
      }
    } catch (err) {
      
      toast.error("Please login to add products to cart", {
        position: "top-center",
      });
    } finally {
      setLoader(false);
    }
  }

  return (
    <Button
      onClick={() => AddProduct(id)}
      disabled={Loader}
      className="bg-main w-full rounded-3xl cursor-pointer flex items-center justify-center"
    >
      {Loader ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        "Add to cart"
      )}
    </Button>
  );
}
