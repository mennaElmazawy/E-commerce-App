
import ProductsList from "src/app/_Components/ProductCard/ProductList";
import { getAllProducts } from "src/ProductsAction/ProductsAction";


export const metadata={title:'Products component'}

export default async function Products() {

   const products = await getAllProducts();


  return (
    <div className="mx-auto my-5 py-5">

       <ProductsList products={products.data} />
    </div>
  );
}

