import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl font-bold">Welcome to ShopNextPOC</h1>

      <p className="mt-4 text-gray-600">
        Discover amazing products at great prices.
      </p>

      <Link
        href="/products"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Explore Products
      </Link>
    </main>
  );
}
