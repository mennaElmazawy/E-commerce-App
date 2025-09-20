'use server'

import { getUserToken } from "src/getUserToken";
import { wishlistResponse } from "src/types/WhishList.type";


export async function getWishListData() {
    const token: any = await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            headers: {
                token
            }
        }
    )
    const data:wishlistResponse = await res.json();
    return data;
}


export async function AddProductToWishList(id:string) {
     const token: any = await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            method: 'POST',
            body: JSON.stringify({ productId:id }),
            headers: {
                token: token,
                'Content-Type': 'application/json'
            }


        }
    )
    const data= await res.json();
    return data;
}

export async function RemoveProduct(id:string) {
    const token: any = await getUserToken();

    if (!token) {
        throw new Error('Token error');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
        {
            method: 'DELETE',
            headers: {
                token
            }
        }
    )
    const data = await res.json();
    return data;
}