
"use client";

import React, { useState } from "react";

import { product } from "src/types/products.type";
import ProductCard from "./ProductCard";

export default function ProductsList({ products }: { products: product[] }) {
  const [searchString, setSearchString] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="mx-auto my-5 py-5">
      <input
        type="search"
        id="default-search"
        className="block w-3/4 mx-auto p-2 my-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0_0_0_.25rem_#0d6efd40] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        value={searchString}
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

