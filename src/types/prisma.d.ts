export type PrismaMandatoryFields<T> = Omit<
  T,
  "id" | "createdAt" | "updatedAt"
>;
