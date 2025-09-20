"use client";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
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
import { CashPayment, CheckOutPayment } from "src/OrderAction/OrderAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { ClearCart } from "src/CartAction/CartAction";
import { CountContext } from "src/CountProvider";

export default function Checkoutsession() {
  const { setCount } = useContext(CountContext);
  const router = useRouter();
  const { cartId }: { cartId: string } = useParams();
  const adressSchema = zod.object({
    city: zod.string().nonempty("city is required"),
    details: zod.string().nonempty("details is required"),
    phone: zod.string().nonempty("phone is required"),
    paymentmethod: zod.string().nonempty("payment method is required"),
  });
  const shippingForm = useForm<zod.infer<typeof adressSchema>>({
    resolver: zodResolver(adressSchema),
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      paymentmethod: "cash-payment",
    },
  });

  async function clearCartData() {
    const data = await ClearCart();
    if (data.message == "success") {
      setCount(0);
    }
  }
  async function onlinePayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    const data = await CheckOutPayment(cartId, values);
    console.log(data);
    if (data.status == "success") {
      await clearCartData();
      window.open(data.session.url);
    }
  }

  async function HandleCashPayment(values: {
    details: string;
    phone: string;
    city: string;
  }) {
    const data = await CashPayment(cartId, values);
    if (data.status == "success") {
      toast.success("order success!", { position: "top-center" });
      await clearCartData();
      router.push("/allorders");
    } else {
      toast.error(data?.error, { position: "top-center" });
    }
  }

  async function handleSubmit(values: {
    details: string;
    phone: string;
    city: string;
    paymentmethod: string;
  }) {
    if (values.paymentmethod === "cash-payment") {
      HandleCashPayment(values);
    } else if (values.paymentmethod === "online-payment") {
      onlinePayment(values);
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl my-5">Checkout Payment</h1>
      <Form {...shippingForm}>
        <form
          className="space-y-2"
          onSubmit={shippingForm.handleSubmit(handleSubmit)}
        >
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Details </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter address details" />
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
                  <Input {...field} placeholder="Enter phone number" />
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
                <FormLabel>City </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter city" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="paymentmethod"
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Payment Method: </FormLabel>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash-payment" id="cash-payment" />
                    <Label htmlFor="cash-payment">Cash Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="online-payment"
                      id="online-payment"
                    />
                    <Label htmlFor="online-payment">Online Payment</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
          <Button>Proceed</Button>
        </form>
      </Form>
    </div>
  );
}
