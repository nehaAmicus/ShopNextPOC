"use client";
import { Suspense } from "react";
import { Product } from "../domain/entities/product";
import ProductGallery from "./ProductGallery";
import Loading from "@/app/loading";
import Button from "@/components/ui/Button";

interface Props {
  product: Product;
}
const addToCart = () => {
  console.log("Add to Cart");
};
export default function ProductDetailsView({ product }: Props) {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Product Images */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Product Information */}
          <div className="space-y-5">
            <p className="text-sm capitalize text-gray-500">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold">{product.title}</h1>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>

              <span className="text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>

              <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">
                {product.discountPercentage}% OFF
              </span>
            </div>

            <div className="flex gap-4 text-sm">
              <span>⭐ {product.rating}</span>
              <span>Stock: {product.stock}</span>
            </div>

            {product.brand && <p className="text-sm">Brand: {product.brand}</p>}

            <div className="border-t pt-5">
              <p className="font-medium">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <div>
              <Button variant="primary" onClick={addToCart}>
                Add to Cart
              </Button>
            </div>

            {/* <button
              disabled={product.stock <= 0}
              className="rounded-lg bg-black px-8 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to Cart
            </button> */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
