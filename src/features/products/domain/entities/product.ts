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
