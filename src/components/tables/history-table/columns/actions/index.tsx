import { Actions } from "@/components/ui/data-table/actions";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RefreshCcw, Trash2 } from "lucide-react";
import { UserResponseTableColumns } from "@/components/tables/history-table/columns";
import { Delete } from "./delete";
import { usePathname } from "next/navigation";

interface HistoryActionsColumnProps {
  row: UserResponseTableColumns;
}

export function HistoryActionsColumn({ row }: HistoryActionsColumnProps) {
  return (
    <Actions>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="space-y-2">
        <DropdownMenuItem>
          <RefreshCcw className="h-4 w-4 mr-2" />
          <span>Opdater</span>
        </DropdownMenuItem>
        <Delete row={row} />
      </DropdownMenuGroup>
    </Actions>
  );
}
