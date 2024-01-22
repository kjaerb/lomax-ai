import { Actions } from "@/components/ui/data-table/actions";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserResponseTableColumns } from "@/components/tables/history-table/columns";
import { Delete } from "./delete";
import { UpdateSegmentForm } from "./update";

interface HistoryActionsColumnProps {
  row: UserResponseTableColumns;
}

export function HistoryActionsColumn({ row }: HistoryActionsColumnProps) {
  return (
    <Actions>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup className="text-sm">
        <UpdateSegmentForm row={row} />
        <Delete row={row} />
      </DropdownMenuGroup>
    </Actions>
  );
}
