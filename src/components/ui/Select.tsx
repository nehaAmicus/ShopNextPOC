import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  order?: string;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  order?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function Select({
  label,
  options,
  onChange,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className={`h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:w-auto sm:text-sm ${className}`}
      >
        {options.map((option) => (
          <option
            key={`${option.label}-${option.value || "default"}`}
            value={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
