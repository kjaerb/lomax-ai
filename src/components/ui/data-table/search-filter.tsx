import { Table } from "@tanstack/react-table";
import { Input } from "../input";

interface SearchFilterProps<TData extends Record<any, any>> {
  table: Table<TData>;
  filtering: keyof TData;
  filteringLabel?: string;
}

export function SearchFilter<TData extends Record<any, any>>({
  table,
  filtering,
  filteringLabel,
}: SearchFilterProps<TData>) {
  return (
    <Input
      placeholder={filteringLabel || ""}
      value={
        (table.getColumn(filtering.toString())?.getFilterValue() as string) ??
        ""
      }
      onChange={(event) =>
        table
          .getColumn(filtering.toString())
          ?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
