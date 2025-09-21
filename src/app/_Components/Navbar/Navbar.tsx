"use client";

import { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CountContext } from "../../../CountProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname =usePathname()
  const { data, status } = useSession();
  const { count } = useContext(CountContext);
  const [isOpen, setIsOpen] = useState(false);

  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/Home", content: "Home", protected: false },
    { path: "/products", content: "Products", protected: false },
    { path: "/categories", content: "Categories", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/wishlist", content: "Wishlist", protected: false },
    { path: "/allorders", content: "allorders", protected: true },
  ];

  const MenuAuthItems = [
    { path: "/Login", content: "Login" },
    { path: "/Register", content: "Register" },
  ];

  function logout() {
    signOut({ callbackUrl: "/Login" });
  }

  return (
    <>
      <nav className="bg-main-light border-gray-200 dark:bg-gray-900 fixed top-0 end-0 start-0 z-50 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto  p-4">
          <Link
            href="/"
            className="flex items-center  space-x-3 rtl:space-x-reverse "
          >
            <i className="fa-solid fa-cart-shopping text-3xl text-main "></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
              fresh cart
            </span>
          </Link>

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col lg:basis-3/4 lg:justify-between w-full lg:flex-row lg:flex lg:w-auto `}
            id="navbar-cta"
          >
            <ul className="flex flex-col bg-main-light  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:mt-0 md:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {MenuItems.map((item) => (
                <li key={item.path}>
                  {item.protected && status == "authenticated" && (
                    <Link
                      className={`${pathname==item.path && `active`} block py-2 px-2 nav-link   rounded-sm   md:dark:text-blue-500`}
                      href={item.path}
                    >
                      {item.content}
                    </Link>
                  )}
                  {!item.protected && (
                    <Link
                      className={`${pathname==item.path && `active`} block py-2 px-2 nav-link   rounded-sm   md:dark:text-blue-500`}
                      href={item.path}
                    >
                      {item.content}
                    </Link>
                  )}
                </li>
              ))}
             
            </ul>

            <ul
              className="flex flex-col  font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg 
              lg:flex-row lg:mt-0 xl:border-0 
             dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700"
            >
              {status === "authenticated" ? (
                <>
                  
                  <li>
                    <Link
                      href="/cart"
                      className=" block py-2 px-3 text-white  rounded-sm 
                      "
                    >
                      <i className="fa-solid fa-cart-shopping text-3xl text-gray-600 relative ">
                        <span className="font-family badge absolute -top-3 -end-1 bg-main text-white w-5 h-5 flex justify-center items-center rounded-sm font-bold">
                          {count}
                        </span>
                      </i>
                    </Link>
                  </li>
                  <li className="bg-main-light ">
                    <span className="p-2 block nav-link">
                      Hello {data?.user?.name}
                    </span>
                  </li>
                  <li className="cursor-pointer bg-main-light">
                    <span
                      className=" py-2 px-3 block text-white  rounded-sm md:bg-transparent nav-link md:dark:text-blue-500"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log out
                    </span>
                  </li>
                </>
              ) : (
                <>
                  {MenuAuthItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className="block py-2 px-3 text-white nav-link rounded-sm 
                         md:dark:text-blue-500"
                      >
                        {item.content}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

