import { ProductRepository } from "../repositories/ProductRepository";

export class GetProductsUseCase {
  constructor(private repository: ProductRepository) {}

  execute() {
    return this.repository.getProducts();
  }
}
