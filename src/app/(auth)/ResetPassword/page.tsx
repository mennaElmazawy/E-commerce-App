"use client";

import React from "react";
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

export default function ResetPassword() {
  const router = useRouter();

  const SchemeResetPassword = zod.object({
    email: zod
      .email("email is not valid")
      .nonempty("email is required"),
    newPassword: zod
      .string()
      .nonempty("newPassword is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "password is not valid"
      ),
  });

  const LoginForm = useForm<zod.infer<typeof SchemeResetPassword>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemeResetPassword),
  });

  async function handleLogin(values: zod.infer<typeof SchemeResetPassword>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/ResetPassword`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.token ) {
       
        router.push("/login");
      } else {
        toast.error(data.message || "Login failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  }

  return (
    <>
      <h1>ResetPassword now</h1>
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>new Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-main">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
