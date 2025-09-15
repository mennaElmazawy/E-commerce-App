"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ClearCart,
  getCartData,
  RemoveProduct,
  UpdateProductQuantity,
} from "src/CartAction/CartAction";
import { Button } from "src/components/ui/button";
import { CountContext } from "src/CountProvider";
import { cart, CartData } from "src/types/cart.type";

export default function Cart() {
    const { setCount } = useContext(CountContext);
  const [currentId, setCurrentId] = useState<string>();
  const [countLoading, setCountLoading] = useState(false);
  const [countDisabled, setCountDisabled] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  const [cart, setCart] = useState<cart>();

  useEffect(() => {
    getAllCartData();
  }, []);


  async function getAllCartData() {
    setCartLoading(true);
    const data: CartData = await getCartData();
    setCart(data.data);
    setCartLoading(false);
  }

  async function deleteProduct(id: string) {
    const data = await RemoveProduct(id);
    if (data.status == "success") {
      toast.success("Product removed from cart", { position: "top-center" });
      setCart(data.data);
      const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count, 0);
      setCount(sum);
    }
  }

  async function clearCartData() {
    const data = await ClearCart();
    if (data.message == "success") {
      setCart(undefined);
      setCount(0);
    }
  }

  async function updateProductCount(id: string, count: number) {
    setCurrentId(id);
    setCountLoading(true);
    setCountDisabled(true);
   const data = await UpdateProductQuantity(id,count);
    if (data.status == "success") {
      setCart(data.data);
       const sum = data.data.products.reduce((total:number, item:{count:number}) => total += item.count, 0);
      setCount(sum);
    }
    setCountLoading(false);
    setCountDisabled(false);

  }

  return (
    <div>
      <h1 className="text-3xl"> shop cart: </h1>
     
      {cartLoading ? (
        <h1 className="text-3xl"> Your cart is Empty </h1>
      ) : (
        <>
        <Button className="bg-main"><Link href={'/Checkoutsession/'+cart?._id} className="text-white"> check out</Link></Button>
          <h2 className="text-2xl text-red-500">
            {" "}
            Total price: {cart?.totalCartPrice}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.products.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Button
                            disabled={countDisabled}
                            onClick={() => updateProductCount(item.product._id,item.count-=1)}
                            className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            {item.count==1?<i className="fa-solid fa-trash"></i>:<svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>}
                            
                          </Button>
                          <div>
                            {countLoading && currentId== item.product._id? <i className="fa-solid fa-spinner fa-spin"></i>: <span> {item.count} </span>}
                           
                          </div>
                          <Button
                            disabled={countDisabled}
                            onClick={() => updateProductCount(item.product._id,item.count+=1)}
                            className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          disabled={countDisabled}
                          onClick={() => deleteProduct(item.product._id)}
                          className="bg-red-500 text-white cursor-pointer"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center items-center">
              {" "}
              <Button
                onClick={clearCartData}
                className="bg-white text-3xl text-black "
              >
                {" "}
                Clear cart{" "}
              </Button>
              
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
