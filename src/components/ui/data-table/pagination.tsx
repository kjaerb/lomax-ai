import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PaginationProps<TData extends Record<any, any>> {
  table: Table<TData>;
  pagination?: boolean;
  totalCount: number;
}

export function Pagination<TData extends Record<any, any>>({
  table,
  pagination,
  totalCount,
}: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-center items-center gap-2">
        <span>Viser</span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-fit">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50, "Vis alle"].map((pageSize) => {
              const isAll = pageSize === "Vis alle";

              return (
                <SelectItem
                  key={pageSize}
                  value={isAll ? `${totalCount}` : `${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <span>af {totalCount}</span>
      </div>

      {pagination ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
