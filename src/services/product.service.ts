import { Product, ProductCategory, ProductsResponse } from "@/types/product";
import "server-only";

import { apiClient } from "./apiClient";
const API_BASE_URL = process.env.API_BASE_URL;

type SortOrder = "asc" | "desc";

interface GetProductsArgs {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: SortOrder;
}

interface ServiceResult {
  data?: ProductsResponse;
  error?: {
    status: "FETCH_ERROR";
    error: string;
  };
}
// Fetch the available product categories.
// Fetch available categories
export async function getProductCategories(): Promise<ProductCategory[]> {
  return apiClient.get<ProductCategory[]>("/products/categories");
}
// Replace these with your existing implementations.
function filterItems(items: Product[], search: string): Product[] {
  const query = search.trim().toLowerCase();

  if (!query) return items;

  return items.filter((product) => product.title.toLowerCase().includes(query));
}

function sortItems(
  items: Product[],
  sortBy?: string,
  order: SortOrder = "asc",
): Product[] {
  if (!sortBy) return items;

  return [...items].sort((a, b) => {
    const aValue = a[sortBy as keyof Product];
    const bValue = b[sortBy as keyof Product];

    if (typeof aValue !== "number" || typeof bValue !== "number") {
      return 0;
    }

    return order === "asc" ? aValue - bValue : bValue - aValue;
  });
}

export async function getProductsByEndPoints({
  limit,
  skip,
  search = "",
  category = "",
  sortBy,
  order = "asc",
}: GetProductsArgs): Promise<ServiceResult> {
  try {
    const hasSearch = Boolean(search.trim());
    const hasCategory = Boolean(category);
    let response: ProductsResponse;
    // CASE 1: Category + Search
    if (hasCategory && hasSearch) {
      const endpoint = `/products/category/${encodeURIComponent(category)}?limit=0`;

      // Fetch all products from the selected category
      const payload = await apiClient.get<ProductsResponse>(endpoint);

      // Apply search, sorting and pagination locally
      const filtered = filterItems(payload.products, search);
      const sorted = sortItems(filtered, sortBy, order);

      response = {
        products: sorted.slice(skip, skip + limit),
        total: sorted.length,
        skip,
        limit,
      };
    } else {
      // CASE 2: Default, Search only, or Category only
      let endpoint = "/products";

      const params = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
      });
      if (sortBy) {
        params.set("sortBy", sortBy);
        params.set("order", order);
      }
      if (hasCategory) {
        endpoint = `/products/category/${encodeURIComponent(category)}`;
      } else if (hasSearch) {
        endpoint = "/products/search";
        params.set("q", search.trim());
      }

      const payload = await apiClient.get<ProductsResponse>(
        `${endpoint}?${params.toString()}`,
      );

      response = {
        products: payload.products ?? [],
        total: payload.total ?? 0,
        skip: payload.skip ?? skip,
        limit: payload.limit ?? limit,
      };
    }

    return { data: response };
  } catch (error) {
    return {
      error: {
        status: "FETCH_ERROR",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
