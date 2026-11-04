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

/**
 * Represents the complete paginated products response.
 */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
