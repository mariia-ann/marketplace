export type CurrencyType = {
  id: number;
  type: string;
  value: string;
};

export const currencies: CurrencyType[] = [
  { id: 0, type: "Українська гривня", value: "грн" },
  { id: 1, type: "Американський долар", value: "USD" },
  { id: 2, type: "Євро", value: "EUR" },
];
