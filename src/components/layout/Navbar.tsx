import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b dark:bg-gray-800">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Application branding */}
        <Link href="/" className="text-xl font-bold text-gray-100">
          ShopNext
        </Link>

        {/* Primary navigation links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-100 hover:text-black">
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm text-gray-100 hover:text-black"
          >
            Products
          </Link>
        </div>
      </nav>
    </header>
  );
}
