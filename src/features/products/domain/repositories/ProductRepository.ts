import { Product } from "../entities/product";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
}
