'use server'

import { getUserToken } from "src/getUserToken";
import { wishlistResponse } from "src/types/WhishList.type";


export async function getWishListData() {
    const token = await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            headers: {
                token: token as string
            }
        }
    )
    const data:wishlistResponse = await res.json();
    return data;
}


export async function AddProductToWishList(id:string) {
     const token= await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            method: 'POST',
            body: JSON.stringify({ productId:id }),
            headers: {
                token: token as string,
                'Content-Type': 'application/json'
            }


        }
    )
    const data= await res.json();
    return data;
}

export async function RemoveProduct(id:string) {
    const token = await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
        {
            method: 'DELETE',
            headers: {
             token: token as string
            }
        }
    )
    const data = await res.json();
    return data;
}