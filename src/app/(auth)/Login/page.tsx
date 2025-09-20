
"use client";

import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { CountContext } from "../../../CountProvider";

import { getCartData } from "src/CartAction/CartAction";
import { CartData } from "src/types/cart.type";

export default function Login() {
  const router = useRouter();
  const { setCount } = useContext(CountContext);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchCart() {
      if (session?.user) {
        const cart: CartData = await getCartData();
        const sum = cart.data.products.reduce(
          (total, item) => (total += item.count),
          0
        );
        setCount(sum);
      }
    }
    fetchCart();
  }, [session, setCount]);

  const SchemeLogin = zod.object({
    email: zod
      .string()
      .email("email is not valid")
      .nonempty("email is required"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "password is not valid"
      ),
    
  });

  const LoginForm = useForm<zod.infer<typeof SchemeLogin>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SchemeLogin),
  });

  async function handleLogin(values: zod.infer<typeof SchemeLogin>) {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (data?.ok) {
      toast.success("Login success!", { position: "top-center" });

      router.push("/");
    } else {
      toast.error(data?.error, { position: "top-center" });
    }
  }

  return (
    <div className="p-5 w-3/4 mx-auto">
      <h1 className="p-5 text-2xl">Login now</h1>
      <Form {...LoginForm}>
        <form
          onSubmit={LoginForm.handleSubmit(handleLogin)}
          className="space-y-3"
        >
          <FormField
            control={LoginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Link className="px-5 py-2 bg-blue-500 rounded-md !text-white" href="/ForgetPassword">
            
              Forget your Password??
            </Link>
            <Button type="submit" className=" bg-main cursor-pointer text-xl font-normal">
              Login Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
