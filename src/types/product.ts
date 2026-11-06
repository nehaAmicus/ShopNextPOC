/**
 * Represents a single product returned by the API.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string; // Optional because some products may not have a brand.
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Represents one category returned by DummyJSON.
export interface ProductCategory {
  slug: string; // URL-friendly value, e.g. "smartphones"
  name: string; // Display label, e.g. "Smartphones"
  url: string;
}
export interface ProductPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}
export type ProductFiltersProps = {
  categories: ProductCategory[];
};
