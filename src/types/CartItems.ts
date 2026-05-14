type ItemColor = {
  name?: string;
  colorCode?: string;
  size?: number;
};

type CartItem = {
  id: string;
  name: string;
  color?: ItemColor[];
  currency?: string;
  price: number;
  quantity: number;
  imageSource?: string;
  isChecked?: boolean;
  company?: string;
};

type TCartItemTile = {
  cartItem: CartItem;
  isWishListCheck: boolean;
  handleIsCheck?: () => void;
  onToggleSelection?: () => void;
};

export { CartItem, TCartItemTile };
