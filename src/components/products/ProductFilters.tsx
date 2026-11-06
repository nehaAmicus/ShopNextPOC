"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types/product";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "../ui/Button";

type ProductFiltersProps = {
  categories: ProductCategory[]; // Category slugs, e.g. "smartphones"
};
const sortOptions = [
  { label: "Default", value: "", order: "" },
  { label: "Price low to high", value: "price", order: "asc" },
  { label: "Price high to low", value: "price", order: "desc" },
  { label: "Rating high to low", value: "rating", order: "desc" },
  { label: "Rating low to high", value: "rating", order: "asc" },
  { label: "Name A-Z", value: "title", order: "asc" },
  { label: "Name Z-A", value: "title", order: "desc" },
] as const;
export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "";
  const order = searchParams.get("order") ?? "asc";
  // Initialize the input from the current URL.
  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

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
  };
  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());
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
    const selected = sortOptions.find((option) => option.label === value);
    const nextParams = new URLSearchParams(searchParams);

    if (selected) {
      if (selected.value && selected.order) {
        nextParams.set("sortBy", selected.value);
        nextParams.set("order", selected.order);
      } else {
        nextParams.delete("sortBy");
        nextParams.delete("order");
      }

      nextParams.set("page", "1");
      //  setSearchParams(nextParams)
    }

    router.replace(`${pathname}?${nextParams.toString()}`, {
      scroll: false,
    });
  };

  // Remove all filters
  const handleClearFilters = () => {
    setSearchValue("");

    router.replace(pathname, { scroll: false });
  };

  const selectedSort =
    sortOptions.find(
      (option) => option.value === sortBy && option.order === order,
    ) ?? sortOptions[0];
  return (
    <div className="mb-6 flex flex-col gap-1">
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
          aria-label="Sort products"
          value={selectedSort.label}
          onChange={(event) => handleSortChange(event.target.value)}
          className="h-[42px] w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-3 text-xs sm:text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        >
          {sortOptions.map((option) => (
            <option
              key={`${option.label}-${option.value || "default"}`}
              value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear filters */}
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleClearFilters}>
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
