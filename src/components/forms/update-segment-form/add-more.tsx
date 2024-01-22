import { Button } from "@/components/ui/button";

interface AddMoreProps {
  append: any;
  fields: any;
}

export function AddMore({ fields, append }: AddMoreProps) {
  return (
    fields.length < 3 && (
      <Button
        type="button"
        variant={"link"}
        onClick={() =>
          append({
            name: "",
          })
        }
      >
        Tilføj flere
      </Button>
    )
  );
}
