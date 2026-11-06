import {
  getProductCategories,
  getProducts,
  getProductsByCategory,
  getProductsByEndPoints,
  searchProducts,
} from "@/services/product.service";
import ProductList from "@/components/products/ProductList";
import { Suspense } from "react";
import Pagination from "@/components/products/Pagination";
import ProductFilters from "@/components/products/ProductFilters";
import { ProductsResponse } from "@/types/product";

interface ProductPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}
async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const sortBy = params.sortBy ?? "";
  const order = params.order ?? "asc";
  // const data = await getProducts(limit, skip);

  const search = params.q?.trim() ?? "";
  const category = params.category ?? "";
  const categories = await getProductCategories();
  // let data: ProductsResponse = await getProductsByCategory(
  //   category,
  //   limit,
  //   skip,
  // );
  // if (query) {
  //   data = await searchProducts(query, limit, skip);
  // }
  // const data = category
  //   ? await getProductsByCategory(category, limit, skip)
  //   : query
  //     ? await searchProducts(query, limit, skip)
  //     : await getProducts(limit, skip);
  const result = await getProductsByEndPoints({
    limit,
    skip,
    category,
    search,
    sortBy,
    order,
  });
  //const totalPages = Math.ceil(result.data?.total / limit);
  const totalPages = result.data?.total ?? 0;
  const products = result.data?.products ?? [];
  console.log("URL params:", { category, search, page });
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold">Our Products</h1>

      <p className="mb-6 text-gray-500">
        Showing {result.data?.products.length} of {result.data?.total} products
      </p>
      <ProductFilters categories={categories} />

      <ProductList products={products} />

      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
