import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-lg border p-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={200}
        className="h-48 w-full object-contain"
      />

      <h2 className="mt-3 font-semibold">{product.title}</h2>

      <p className="mt-2 text-lg font-bold">${product.price}</p>

      <p className="text-sm text-gray-500">Rating: {product.rating}</p>
      <Link href={`/products/${product.id}`}>View Details</Link>
    </article>
  );
}
