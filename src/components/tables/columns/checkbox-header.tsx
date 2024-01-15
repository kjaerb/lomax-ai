import { Checkbox } from "@/components/ui/checkbox";
import { Table } from "@tanstack/react-table";

interface CheckboxRowHeaderProps<TData> {
  table: Table<TData>;
}

export function CheckboxRowHeader<TData>({
  table,
}: CheckboxRowHeaderProps<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}
