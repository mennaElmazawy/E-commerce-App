import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AllOrders } from "src/types/orders.type";

export default function OrderCard({ orderItem }: { orderItem: AllOrders }) {
  const {
    shippingAddress,
    shippingPrice,
    totalOrderPrice,
    paymentMethodType,
  } = orderItem;
  return (
    <div>
      <Card className="bg-gray-100">
        <CardContent className="border-b border-gray-200 pb-4 ">
          <div className="my-2">
            <h3 className="text-main text-2xl my-2">shipping Details: </h3>
            <p ><span className="font-medium">details: </span> {shippingAddress?.details}</p>
            <p><span className="font-medium">city: </span> {shippingAddress?.city}</p>
            <p><span className="font-medium">phone: </span> {shippingAddress?.phone}</p>
          </div>

          <p className="font-medium"> shippingPrice: {shippingPrice}</p>
          <p  className="font-medium"> paymentMethodType: {paymentMethodType}</p>
        </CardContent>
        <CardFooter className="text-main">
           <p className="font-bold"> Total Order Price: {totalOrderPrice}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
