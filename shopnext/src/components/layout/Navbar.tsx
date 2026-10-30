import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Application branding */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          ShopNextPOC
        </Link>

        {/* Primary navigation links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm text-gray-600 hover:text-black"
          >
            Products
          </Link>
        </div>
      </nav>
    </header>
  );
}
