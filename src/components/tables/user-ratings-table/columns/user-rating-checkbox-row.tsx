import { Checkbox } from "@/components/ui/checkbox";
import useUserResponseStore from "@/stores/user-reponse-store";
import { Row } from "@tanstack/react-table";
import { useEffect } from "react";

interface UserRatingCheckboxRowProps<TData> {
  index: number;
  row: Row<TData>;
}

export function UserRatingCheckboxRow<TData>({
  index,
  row,
}: UserRatingCheckboxRowProps<TData>) {
  const { setShouldSegment } = useUserResponseStore();
  const isSelected = row.getIsSelected();

  useEffect(() => {
    setShouldSegment(index, isSelected);
  }, [index, isSelected, setShouldSegment]);

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
