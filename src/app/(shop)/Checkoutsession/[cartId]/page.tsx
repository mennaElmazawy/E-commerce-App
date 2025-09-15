"use client";

import { useParams } from "next/navigation";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { CheckOutPayment } from "src/OrderAction/OrderAction";

export default function Checkoutsession() {
  const { cartId }:{cartId:string} = useParams();
  const shippingForm = useForm({
    defaultValues: { details: "", phone: "", city: "" },
  });

  async function CheckOutSessionPayment(values: { details: string; phone: string; city: string }) {
    const data= await CheckOutPayment(cartId, values);
    console.log(data);
    window.open(data.session.url,)
  }
  

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl">Checkout Payment</h1>
      <Form {...shippingForm}>
        <form
          className="space-y-2"
          onSubmit={shippingForm.handleSubmit(CheckOutSessionPayment)}
        >
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Details </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Phone </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel> city </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button> Payment </Button>
        </form>
      </Form>
    </div>
  );
}
