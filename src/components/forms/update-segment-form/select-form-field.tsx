import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SelectSegment } from "./select-segment";
import { Trash2 } from "lucide-react";
import { Control, FieldValues, UseFieldArrayRemove } from "react-hook-form";

interface SelectFormFieldProps<TData extends FieldValues> {
  index: number;
  fieldId: string;
  control: Control<TData>;
  name: any;
  remove: UseFieldArrayRemove;
}

export function SelectFormField<TData extends FieldValues>({
  index,
  fieldId,
  control,
  name,
  remove,
}: SelectFormFieldProps<TData>) {
  return (
    <FormField
      key={fieldId}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center">
            <SelectSegment {...field} />
            <Trash2
              className="h-10 w-10 p-2 cursor-pointer text-red-500 hover:text-red-600 border rounded-r-md"
              onClick={() => remove(index)}
            />
          </div>
          <FormMessage className="pl-3" />
        </FormItem>
      )}
    />
  );
}
