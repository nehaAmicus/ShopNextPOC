import { ProductsResponse } from "@/types/product";
import { error } from "console";

export async function getProducts(
  limit: number = 12,
  skip: number,
): Promise<ProductsResponse> {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }

  const url = new URL(`${baseUrl}/products`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
