import { CartItem } from '@/src/types/CartItems';
import { create } from 'zustand';

type BasketState = {
  items: CartItem[]; // Replace 'any' with your actual item type
  addItem: (item: any) => void; // Replace 'any' with your actual item type
  removeItem: (itemId: string) => void;
  clearBasket: () => void;
  handleBasketShare: () => void;
};

export const useBasketStore = create<BasketState>()((set) => ({
  items: [
    {
      name: 'Жіноча сумка Верде зелена',
      price: 2500,
      company: 'MALETSKIY',
      currency: '₴',
      color: [
        {
          name: 'Зелений',
          colorCode: '#56766A',
        },
      ],
      quantity: 1,
      isChecked: true,
      imageSource:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    },
    {
      name: 'Чоловіча сумка Верде чорна',
      price: 3000,
      currency: '₴',
      company: 'MALETSKIY',
      color: [{ name: 'Чорний', colorCode: '#000000', size: 40 }],
      quantity: 2,
      isChecked: false,
      imageSource:
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop',
    },
    {
      name: 'Amigurumi Ведмедик',
      price: 500,
      currency: '₴',
      company: 'Amigurumi',
      color: [{ name: 'Коричневий', colorCode: '#8B4513' }],
      quantity: 1,
      isChecked: true,
      imageSource:
        'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop',
    },
  ],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearBasket: () => set({ items: [] }),
  handleBasketShare: () => {
    // Implement share functionality here
    console.warn('Share button pressed');
  },
}));
