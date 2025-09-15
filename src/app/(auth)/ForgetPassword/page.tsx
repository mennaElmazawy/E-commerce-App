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

export default function ForgetPassword() {
  const router = useRouter();

  const SchemeForgetPassword = zod.object({
    email: zod.email("email is not valid") .nonempty("email is required")
   
  });

  const ForgetPasswordForm = useForm<zod.infer<typeof SchemeForgetPassword>>({
    defaultValues: {
      email: "",
    
    },
    resolver: zodResolver(SchemeForgetPassword),
  });

  async function handleForgetPassword(values: zod.infer<typeof SchemeForgetPassword>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/ForgetPasswords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.statusMsg === "success") {
       
        router.push("/resetCode");
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
      <h1>Send Email</h1>
      <Form {...ForgetPasswordForm}>
        <form
          onSubmit={ForgetPasswordForm.handleSubmit(handleForgetPassword)}
          className="space-y-3"
        >
          <FormField
            control={ForgetPasswordForm.control}
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

         

          <Button type="submit" className="w-full bg-main">
            Send Email
          </Button>
        </form>
      </Form>
    </>
  );
}

