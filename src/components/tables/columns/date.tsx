interface DateProps {
  date: Date;
}

export function Date({ date }: DateProps) {
  if (!date) return <span>Invalid Date</span>;

  return <span>{date.toDateString()}</span>;
}
