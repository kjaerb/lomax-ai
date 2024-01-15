interface DateProps {
  date: Date;
}

export function Date({ date }: DateProps) {
  return <span>{date.toDateString()}</span>;
}
