import { getProductById } from "@/services/product.service";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductMapper } from "../mappers/ProductMapper";

export class ProductRepositoryImpl implements ProductRepository {
  async getProducts(): Promise<Product[]> {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products.map(ProductMapper.toDomain);
  }
  async getById(id: number): Promise<Product | null> {
    const dto = await getProductById(id);

    if (!dto) {
      return null;
    }

    return ProductMapper.toDomain(dto);
  }
}
