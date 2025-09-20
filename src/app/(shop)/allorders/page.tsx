


import React from "react";
import OrderCard from "src/app/_Components/OrderCard/OrderCard";
import { getUserIdFromToken } from "src/getUserToken";
import { GetAllOrders } from "src/OrderAction/OrderAction";
import { AllOrders } from "src/types/orders.type";

export const metadata={title:'AllOrders component'}

export default async function page() {
  let ordersList: AllOrders[] = [];
  
  const userId: string | undefined = await getUserIdFromToken();

  if (userId) {
   ordersList = await GetAllOrders(userId);
  }

  return (
    <div className="p-5 w-3/4 mx-auto">
      <h2 className="p-5 text-2xl text-center text-main font-medium">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5 w-11/12 p-5 mx-auto">
        {ordersList.map((order: AllOrders) => (
          <div key={order._id}>
            <OrderCard key={order._id} orderItem={order}></OrderCard>
          </div>
        ))}
      </div>
    </div>
  );
}
