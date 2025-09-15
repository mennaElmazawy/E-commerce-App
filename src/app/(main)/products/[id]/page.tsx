import React from 'react'
import ProductDetailsCard from 'src/app/_Components/ProductDetailsCard/ProductDetailsCard';
import { productItem, productsDetails } from 'src/types/productsDetails.type';

export default async function ProductsDetails({params}:{params:{id:string}}) {
    const {id} = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
    const data:productsDetails = await res.json();
    const product: productItem = data.data;
  return (
    <div>
      <ProductDetailsCard product={product}/>
    </div>
  )
}
