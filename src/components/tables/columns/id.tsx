interface IDProps {
  id: number;
}

export function ID({ id }: IDProps) {
  return <span>{id}</span>;
}
