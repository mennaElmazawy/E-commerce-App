import { productData } from "src/types/products.type";


export async function getAllProducts() {
  const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`
        );
        const data: productData = await res.json();
    return data;
    
}