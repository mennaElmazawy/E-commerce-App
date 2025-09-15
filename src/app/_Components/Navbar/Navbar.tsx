"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CountContext } from "../../../CountProvider";

export default function Navbar() {
  const { data, status } = useSession();
  const { count } = useContext(CountContext);
  console.log(data);

  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/Home", content: "Home", protected: false },
    { path: "/products", content: "Products", protected: false },
    { path: "/categories", content: "Categories", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/whishlist", content: "Whishlist", protected: false },
    { path: "/allorders", content: "Orders", protected: true },
  ];

  const MenuAuthItems = [
    { path: "/Login", content: "Login" },
    { path: "/Register", content: "Register" },
  ];

  function logout() {
    signOut({ callbackUrl: "/Login" });
  }

  return (
    <div className="bg-main-light ">
      <NavigationMenu
        className="justify-between w-11/12 max-w-none mx-auto p-5 "
        viewport={false}
      >
        {/* Logo */}
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="bg-main-light flex flex-wrap" href="/">
               <i className="fa-solid fa-cart-shopping text-3xl text-main "></i>
               <span className="text-3xl">fresh cart</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Main menu items */}
        <NavigationMenuList>
          {MenuItems.map((item) => (
            <NavigationMenuItem key={item.path}>
              {item.protected && status == "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link className="bg-main-light nav-link" href={item.path}>
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}

              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link className="bg-main-light nav-link" href={item.path}>
                    {item.content}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
          {status == "authenticated" && (
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="bg-main-light nav-link" href="/cart">
                  cart
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>

        <NavigationMenuList>
          {status == "authenticated" ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link className="relative bg-main-light" href="/cart">
                    <i className="fa-solid fa-cart-shopping text-3xl text-gray-600 ">
                      <span className="font-family badge absolute -top-2 end-3 bg-main text-white w-5 h-5  flex justify-center items-center rounded-sm font-bold ">
                        {count}
                      </span>
                    </i>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-main-light`}>
                  <span className=" p-2 nav-link">
                    Hello {data?.user?.name}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="cursor-pointer bg-main-light">
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-main-light`}>
                  <span className=" nav-link" onClick={logout}>
                    Log out
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              {MenuAuthItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link className="bg-main-light nav-link" href={item.path}>
                      {item.content}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
