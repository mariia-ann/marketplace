export type CountryType = {
  id: number;
  country: string;
  isoCode: string;
};

export const countries: CountryType[] = [
  { id: 0, country: "Ukraine", isoCode: "ua" },
  { id: 1, country: "United Kingdom", isoCode: "gb" },
];
