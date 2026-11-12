import { ProductRepository } from "../repositories/ProductRepository";

export class GetProductDetailsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid product ID");
    }

    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
