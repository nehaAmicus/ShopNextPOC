"use client";

import { useEffect, useState } from "react";
import { ProductFiltersProps } from "@/types/product";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "../ui/Button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { sortOptions } from "@/constants/product.constants";
import Select from "../ui/Select";

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const { searchParams, updateQueryParams } = useQueryParams();
  const sortBy = searchParams.get("sortBy") ?? "";
  const order = searchParams.get("order") ?? "asc";
  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(searchValue, 300);

  // Update URL after debounce
  useEffect(() => {
    const query = debouncedSearch.trim();
    // Skip if the URL already contains this query
    if (query === currentQuery) return;
    updateQueryParams({
      q: query || null,
      page: null,
    });
  }, [debouncedSearch, currentQuery]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  function handleCategoryChange(category: string) {
    updateQueryParams({
      category: category || null,
      page: null,
    });
  }
  // Update sorting while preserving other filters
  const handleSortChange = (value: string) => {
    console.log("filter", value);
    const selected = sortOptions.find((option) => option.label === value);

    if (!selected) return;

    updateQueryParams({
      sortBy: selected.value || null,
      order: selected.order || null,
      page: "1",
    });
  };

  // Remove all filters
  const handleClearFilters = () => {
    setSearchValue("");
    updateQueryParams({
      q: null,
      category: null,
      sortBy: null,
      order: null,
      page: null,
    });
  };

  const selectedSort =
    sortOptions.find(
      (option) => option.value === sortBy && option.order === order,
    ) ?? sortOptions[0];
  return (
    <div className="mb-6 flex flex-col gap-1">
      {/* Search updates as the user types. */}
      <input
        value={searchValue}
        onChange={(event) => handleSearchChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="rounded border px-3 py-2"
      />

      {/* Category*/}
      <Select
        id="category-filter"
        label="Category"
        value={currentCategory}
        options={[
          { label: "All categories", value: "" },
          ...categories.map((item) => ({
            label: item.name,
            value: item.slug,
          })),
        ]}
        onChange={handleCategoryChange}
      />
      {/* Sorting */}
      <Select
        id="sort-filter"
        label="Sort by"
        options={sortOptions}
        value={selectedSort.label}
        onChange={handleSortChange}
      />
      {/* Clear filters */}
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleClearFilters}>
          Clear all filters
        </Button>
      </div>
    </div>
  );
}
