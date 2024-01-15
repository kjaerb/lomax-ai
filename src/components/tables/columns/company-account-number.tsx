import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface SortableColumnProps<TData> {
  column: Column<TData>;
  children?: React.ReactNode;
}

export function SortableColumn<TData>({
  column,
  children,
}: SortableColumnProps<TData>) {
  return (
    <Button
      variant="ghost"
      className="pl-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
