import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}
export default function ProductList({ products }: ProductListProps) {
  if (products.length == 0) {
    return <p>No Products Found</p>;
  }
  return (
    <div className="grid grid-cols- gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
