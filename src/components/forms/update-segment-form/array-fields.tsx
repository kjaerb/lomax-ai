import {
  ArrayPath,
  Control,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import { AddMore } from "./add-more";
import { SelectFormField } from "./select-form-field";

interface ArrayFieldsProps<TData extends FieldValues> {
  control: Control<TData>;
  name: ArrayPath<TData>;
  title: string;
}

export function ArrayFields<TData extends FieldValues>({
  control,
  name,
  title,
}: ArrayFieldsProps<TData>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <p className="font-bold pb-1">{title}</p>
      <div className="space-y-2">
        {fields.map((field, idx) => (
          <SelectFormField
            control={control}
            remove={remove}
            index={idx}
            fieldId={field.id}
            name={`${name}.${idx}.name`}
            key={field.id}
          />
        ))}
      </div>
      <AddMore append={append} fields={fields} />
    </div>
  );
}
