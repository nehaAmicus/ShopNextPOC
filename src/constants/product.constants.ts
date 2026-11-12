import type { SelectOption } from "@/components/ui/Select";

export const sortOptions: SelectOption[] = [
  { label: "Default", value: "", order: "" },
  { label: "Price low to high", value: "price", order: "asc" },
  { label: "Price high to low", value: "price", order: "desc" },
  { label: "Rating high to low", value: "rating", order: "desc" },
  { label: "Rating low to high", value: "rating", order: "asc" },
  { label: "Name A-Z", value: "title", order: "asc" },
  { label: "Name Z-A", value: "title", order: "desc" },
];
