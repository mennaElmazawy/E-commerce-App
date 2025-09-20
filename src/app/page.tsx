import MainSlider from "./_Components/MainSlider/MainSlider";
import CategorySlider from "./_Components/CategorySlider/CategorySlider";
import { category, categoryResponseData } from "src/types/categories.type";
import { getAllCategories } from "src/CategoriesAction/CategoriesAction";
import { getAllProducts } from "src/ProductsAction/ProductsAction";
import ProductsList from "./_Components/ProductCard/ProductList";

export default async function Home() {
  const response: categoryResponseData = await getAllCategories();
  const categoryList: category[] = response.data;
  const products = await getAllProducts();

  return (
    <>
      <MainSlider />
      <CategorySlider categoryList={categoryList} />

      <ProductsList products={products.data} />
    </>
  );
}
