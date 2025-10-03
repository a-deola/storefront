import { Product } from "../components/ProductCard";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://storefront-api-u9x3.onrender.com/api/products"
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data;
}
