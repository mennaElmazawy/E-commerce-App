
"use client";

import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getCartData } from "./CartAction/CartAction";
import { CartData } from "./types/cart.type";

export const CountContext = createContext<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  count: 0,
  setCount: () => {},
});

export default function CountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  const { data: session } = useSession();

  async function getCart() {
    try {
      if (session?.user) {
        const data: CartData = await getCartData();
        const sum = data.data.products.reduce(
          (total, item) => (total += item.count),
          0
        );
        setCount(sum);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  useEffect(() => {
    getCart();
  }, [session]);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}


