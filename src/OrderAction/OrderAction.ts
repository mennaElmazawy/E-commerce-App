'use server'

import { getUserToken } from "src/getUserToken"

export async function CheckOutPayment(cartId: string, shippingData: { details: string, phone: string, city: string }) {
    const token= await getUserToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_API_URL}`, {
            method: "POST",
            body: JSON.stringify({ "shippingAddress": shippingData }),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },

        })
        const data = await res.json()
        return data
    }


}
export async function CashPayment(cartId: string, shippingData: { details: string, phone: string, city: string }) {
    const token = await getUserToken()
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ "shippingAddress": shippingData }),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },

        })
        const data = await res.json()
        return data
    }


}
export async function GetAllOrders(userId:string) {
    const token = await getUserToken()
    
    if (token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token as string
            },

        })
        const data = await res.json()
        return data
    }


}


