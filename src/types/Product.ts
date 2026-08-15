export interface Product {
  id: number;
  title: string;
  price?: number;
  oldPrice?: number | null;
  rating: number;
  image: string;
  isFavorite: boolean;
  currency?: string;
  isSelectedForWishlist?: boolean;
}
