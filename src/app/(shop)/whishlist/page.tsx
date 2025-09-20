"use client";
import Image from "next/image";
import React, {  useContext, } from "react";
import { toast } from "sonner";
import AddCardBtn from "src/app/_Components/ProductCard/AddCardBtn";
import loading from "src/app/loading";

import {
  RemoveProduct,
} from "src/WhishlistAction/WhishlistAction";
import { WishlistContext } from "src/WishListProvider";

export default function page() {
  const { getAllWishListData, wishlist, Loader, setLoader } =
    useContext(WishlistContext);

  async function deleteProduct(id: string) {
    setLoader(true);
    const data = await RemoveProduct(id);
    if (data.status == "success") {
      toast.success("Product removed from Wish List", {
        position: "top-center",
      });
      getAllWishListData();
      setLoader(false);
    }
  }

  return (
    <div className="my-5 py-5">
      <div className="relative w-3/4 mx-auto  shadow-md sm:rounded-lgp-5 my-5  bg-[#F8F9FA]">
        <h2 className="text-[32px] text-[#212529] p-5"> My Wish List</h2>
        {Loader ? (
          loading()
        ) : (
          <>
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {wishlist?.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className=" border-b flex flex-col md:table-row  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4   ">
                        <Image
                          width={100}
                          height={100}
                          src={item.imageCover}
                          className=" w-full h-full"
                          alt={item.title}
                        />
                        
                      </td>
                      <td className="  h-full py-4 font-semibold text-gray-900 dark:text-white">
                        <div className="">
                          <div className=" h-full  py-4 px-3 font-semibold text-gray-900 dark:text-white">
                          <h5>{item.title}</h5>
                          <h6 className="text-main py-2">{item.price} EGP</h6>
                          <div>
                            <span
                              onClick={() => deleteProduct(item._id)}
                              className=" cursor-pointer text-red-500 "
                            >
                              <i className="fa-solid fa-trash"></i>
                              Remove
                            </span>
                          </div>
                        </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 ">
                        <AddCardBtn
                          id={item._id}
                          onAdded={() => deleteProduct(item._id)}
                        ></AddCardBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
