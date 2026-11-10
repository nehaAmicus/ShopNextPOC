import { notFound } from "next/navigation";
import {
  getProductDetailsUseCase,
  getProductsUseCase,
} from "@/features/products/di/DepdencyInjection";
import ProductDetailsView from "@/features/products/presentation/ProductDetailsView";
import { Suspense } from "react";
import { Product } from "@/features/products/domain/entities/product";
import { getProductsByEndPoints } from "@/services/product.service";
import { ProductPageProps } from "@/types/product";
interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Only allow routes returned by generateStaticParams()
// export const dynamicParams = false;
// Parent remains synchronous
export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  return (
    <main className="container mx-auto px-4 py-10">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetailsContent params={params} />
      </Suspense>
    </main>
  );
}
export async function generateStaticParams() {
  const products = await getProductsUseCase.execute();

  return products.slice(0, 10).map((product) => ({
    id: String(product.id),
  }));
}
// Child handles URL data and fetching
async function ProductDetailsContent({ params }: ProductDetailsPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  const product = await getProductDetailsUseCase.execute(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailsView product={product} />;
}

// Loading placeholder
function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 animate-pulse">
      <div className="aspect-square rounded-xl bg-gray-200" />

      <div className="space-y-5">
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-10 w-1/3 rounded bg-gray-200" />
        <div className="h-12 w-40 rounded bg-gray-200" />
      </div>
    </div>
  );
}
