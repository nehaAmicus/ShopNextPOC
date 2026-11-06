import { Product, ProductCategory, ProductsResponse } from "@/types/product";
import { error } from "console";
const API_BASE_URL = process.env.API_BASE_URL;
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

// Fetch the available product categories.
export async function getProductCategories(): Promise<ProductCategory[]> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }
  console.log("Rendering");
  const response = await fetch(`${API_BASE_URL}/products/categories`);

  // fetch() doesn't throw for HTTP errors like 404 or 500.
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  // The API returns an array of category objects.
  return response.json();
}
export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0,
): Promise<ProductsResponse> {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }

  // Build the category endpoint.
  const url = new URL(
    `${baseUrl}/products/category/${encodeURIComponent(category)}`,
  );

  // Support pagination.
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch category products: ${response.status}`);
  }

  return response.json();
}
export async function searchProducts(
  query: string,
  limit = 12,
  skip = 0,
): Promise<ProductsResponse> {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not configured");
  }

  // Build DummyJSON's search endpoint.
  const url = new URL(`${baseUrl}/products/search`);

  // Add search and pagination parameters.
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Product search failed: ${response.status}`);
  }

  return response.json();
}
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

    // Case 1: Category + search must be combined locally.
    if (hasCategory && hasSearch) {
      const categoryUrl = new URL(
        `/products/category/${encodeURIComponent(category)}`,
        API_BASE_URL,
      );

      // DummyJSON supports limit=0 to request all products.
      categoryUrl.searchParams.set("limit", "0");

      const response = await fetch(categoryUrl);

      if (!response.ok) {
        throw new Error("Category products request failed");
      }

      const payload = (await response.json()) as {
        products?: Product[];
      };

      // Filter the category's products by the search term.
      const filteredProducts = filterItems(payload.products ?? [], search);

      // Sort before pagination.
      const sortedProducts = sortItems(filteredProducts, sortBy, order);

      // Paginate the final filtered/sorted result.
      const paginatedProducts = sortedProducts.slice(skip, skip + limit);

      return {
        data: {
          products: paginatedProducts,
          total: sortedProducts.length,
          skip,
          limit,
        },
      };
    }

    // Case 2: Use the appropriate DummyJSON endpoint.
    let endpoint = "/products";

    if (hasCategory) {
      endpoint = `/products/category/${encodeURIComponent(category)}`;
    } else if (hasSearch) {
      endpoint = "/products/search";
    }

    const url = new URL(endpoint, API_BASE_URL);

    // Pagination parameters
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    // Search endpoint parameter
    if (hasSearch) {
      url.searchParams.set("q", search.trim());
    }

    // Server-side sorting parameters
    if (sortBy) {
      url.searchParams.set("sortBy", sortBy);
      url.searchParams.set("order", order);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Products request failed");
    }

    const payload = (await response.json()) as {
      products?: Product[];
      total?: number;
      skip?: number;
      limit?: number;
    };

    return {
      data: {
        products: payload.products ?? [],
        total: payload.total ?? 0,
        skip: payload.skip ?? skip,
        limit: payload.limit ?? limit,
      },
    };
  } catch (error) {
    return {
      error: {
        status: "FETCH_ERROR",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
