import { categoryResponseData } from "src/types/categories.type";

export async function getAllCategories() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
    );
    const data: categoryResponseData = await res.json();
    return data;
    
}

