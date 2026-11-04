import { getProducts } from "@/services/product.service";
import ProductList from "@/components/products/ProductList";
import { Suspense } from "react";
import Pagination from "@/components/products/Pagination";

interface ProductPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}
// Why is searchParams a Promise?
// In modern Next.js App Router conventions,
//  searchParams is asynchronous.
// We use await searchParams before accessing its values.
// Next.js makes the page value available to your Server Component through searchParams.
export default async function ProductsPage({ searchParams }: ProductPageProps) {
  //   const params = await searchParams;
  //   const page = Math.max(1, Number(params.page) || 1);
  //   const limit = 12;
  //   const skip = (page - 1) * limit;
  //   const data = await getProducts(limit, skip);
  //   const totalPages = Math.ceil(data.total / limit);
  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}
async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 12;
  const skip = (page - 1) * limit;

  const data = await getProducts(limit, skip);
  const totalPages = Math.ceil(data.total / limit);

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold">Our Products</h1>

      <p className="mb-6 text-gray-500">
        Showing {data.products.length} of {data.total} products
      </p>

      <ProductList products={data.products} />

      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
