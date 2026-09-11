export type SortOption = 'newest' | 'rating' | 'price_asc' | 'price_desc';

export interface SortOptionItem {
  id: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortOptionItem[] = [
  { id: 'newest', label: 'Спочатку нові' },
  { id: 'rating', label: 'За рейтингом' },
  { id: 'price_asc', label: 'Від дешевих до дорогих' },
  { id: 'price_desc', label: 'Від дорогих до дешевих' },
];

export const SORT_LABEL_MAP: Record<SortOption, string> = {
  newest: 'спочатку нові',
  rating: 'за рейтингом',
  price_asc: 'від дешевих',
  price_desc: 'від дорогих',
};
