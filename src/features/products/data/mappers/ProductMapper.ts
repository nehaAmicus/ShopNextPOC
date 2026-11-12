import { Product } from "../../domain/entities/product";
import { ProductResponseDto } from "../Dto/ProductResponseDto";

export const ProductMapper = {
  toDomain(dto: ProductResponseDto): Product {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      discountPercentage: dto.discountPercentage,
      rating: dto.rating,
      stock: dto.stock,
      brand: dto.brand,
      category: dto.category,
      thumbnail: dto.thumbnail,
      images: dto.images,
    };
  },
};
