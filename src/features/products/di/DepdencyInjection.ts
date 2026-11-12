import { ProductRepositoryImpl } from "../data/repositories/ProductRepositoryImpl";
import { GetProductDetailsUseCase } from "../domain/usecases/GetProductDetailsUseCase";
import { GetProductsUseCase } from "../domain/usecases/GetProductsUseCase";

const productRepository = new ProductRepositoryImpl();

export const getProductsUseCase = new GetProductsUseCase(productRepository);
export const getProductDetailsUseCase = new GetProductDetailsUseCase(
  productRepository,
);
