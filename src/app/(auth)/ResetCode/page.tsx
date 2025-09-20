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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

export default function ResetCode() {
  const router = useRouter();

  const SchemeResetCode = zod.object({
    resetCode: zod.string().nonempty("resetcode is required"),
  });

  const ResetCodeForm = useForm<zod.infer<typeof SchemeResetCode>>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(SchemeResetCode),
  });

  async function handleResetCode(values: zod.infer<typeof SchemeResetCode>) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
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

      if (data.status === "Success") {
        router.push("/ResetPassword");
      } else {
        toast.error(data.message || "Invalid code", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
    }
  }

  return (
    <>
      <h1>Send Code</h1>
      <Form {...ResetCodeForm}>
        <form
          onSubmit={ResetCodeForm.handleSubmit(handleResetCode)}
          className="space-y-3"
        >
          <FormField
            control={ResetCodeForm.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <InputOTP
                    {...field}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-main">
            verify code
          </Button>
        </form>
      </Form>
    </>
  );
}
