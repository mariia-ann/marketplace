import { Product } from './Product';

export interface WishlistFriendProduct extends Product {
  isReserved?: boolean;
}

export interface WishlistFriendData {
  id?: string | number;
  title: string;
  friendName: string;
  friendProfileImage: string;
  totalProducts: number;
  productsReserved: number;
  isSaved?: boolean;
  productList: WishlistFriendProduct[];
}
