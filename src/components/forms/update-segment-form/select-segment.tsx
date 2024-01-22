import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { segmentationGroups } from "@/lib/constants/segmentation-groups";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface SelectSegmentProps<TData extends FieldValues>
  extends ControllerRenderProps<TData> {}

export function SelectSegment<TData extends FieldValues>({
  ...props
}: SelectSegmentProps<TData>) {
  const { onChange, value } = props;
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger className="border-r-0 rounded-r-none">
          <SelectValue placeholder="Vælg en segmentering" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {segmentationGroups.map((segment, jdx) => (
          <SelectItem key={`${segment}.${jdx}`} value={segment}>
            {segment}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
