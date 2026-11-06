"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types/product";
import { useDebounce } from "@/hooks/useDebounce";

type ProductFiltersProps = {
  categories: ProductCategory[]; // Category slugs, e.g. "smartphones"
};

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "";
  const order = searchParams.get("order") ?? "asc";
  // Initialize the input from the current URL.
  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const [query, setQuery] = useState(currentQuery);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  // Keep the input synchronized with browser back/forward navigation.
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);
  const debouncedSearch = useDebounce(searchValue, 300);
  // Update URL only after user stops typing
  useEffect(() => {
    const query = debouncedSearch.trim();

    // Avoid unnecessary URL updates
    if (query === currentQuery) return;

    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    // Reset pagination after searching
    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [debouncedSearch, currentQuery, searchParams, pathname, router]);
  useEffect(() => {
    console.log("Effect ran");
    const timer = setTimeout(() => {
      console.log("Debounce timer fired");
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("q", searchValue.trim());
      } else {
        params.delete("q");
      }

      //   A new search starts at page 1.
      params.set("page", "1");

      const queryString = params.toString();

      //   router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      //     scroll: false,
      //   });
    }, 300);

    // Cancel the previous timer when the user types again.
    return () => {
      clearTimeout(timer);
      console.log("Effect cleanup");
    };
  }, [query, searchParams]);

  //   useEffect(() => {
  //     console.log("Effect ran");

  //     const timer = setTimeout(() => {
  //       console.log("Debounce timer fired");
  //     }, 300);

  //     return () => {
  //       console.log("Effect cleanup");
  //       clearTimeout(timer);
  //     };
  //   }, [query, searchParams, pathname, router]);

  const handleSearchChange = (nextValue: string) => {
    setSearchValue(nextValue);
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue.trim()) {
      params.set("q", nextValue.trim());
    } else {
      params.delete("q");
    }

    params.set("page", "1");
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });

    // setSearchParams(nextParams)
  };
  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    // setCategory(currentCategory);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("page");

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }
  // Update sorting while preserving other filters
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      const [field, direction] = value.split("-");
      params.set("sortBy", field);
      params.set("order", direction);
    } else {
      params.delete("sortBy");
      params.delete("order");
    }

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // Remove all filters
  const handleClearFilters = () => {
    setSearchValue("");

    router.replace(pathname, { scroll: false });
  };

  // Build the selected sort option from URL parameters
  const sortValue = sortBy ? `${sortBy}-${order}` : "";
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      {/* Search updates as the user types. */}
      <input
        value={currentQuery}
        onChange={(event) => handleSearchChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="rounded border px-3 py-2"
      />

      {/* Category updates immediately. */}
      <select
        value={currentCategory}
        onChange={(event) => handleCategoryChange(event.target.value)}
        aria-label="Filter by category"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Sorting */}
      <div>
        <label
          htmlFor="sort-filter"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Sort by
        </label>

        <select
          id="sort-filter"
          value={sortValue}
          onChange={(event) => handleSortChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Default sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Clear filters */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleClearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
