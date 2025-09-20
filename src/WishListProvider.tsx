"use client";

import { createContext, useEffect, useState } from "react";
import { whishListItem, wishlistResponse } from "./types/WhishList.type";
import { getWishListData } from "./WhishlistAction/WhishlistAction";


export const WishlistContext = createContext<{
  wishlist: whishListItem[];
  setWishlist: React.Dispatch<React.SetStateAction<whishListItem[]>>;
  getAllWishListData: any;
  Loader: boolean;
  setLoader:React.Dispatch<React.SetStateAction<boolean>>;
}>({
  wishlist: [],
  setWishlist: () => {},
  getAllWishListData: () => {},
  Loader: false,
  setLoader:() => {}
});

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<whishListItem[]>([]);
  const [Loader, setLoader] = useState(true);
  

  useEffect(() => {
    getAllWishListData();
  }, []);

  async function getAllWishListData() {
    setLoader(true);
    const data: wishlistResponse = await getWishListData();
    setWishlist(data.data);
    setLoader(false);
    
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, getAllWishListData,setLoader,Loader }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

