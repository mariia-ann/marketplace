import { create } from 'zustand';

export interface FavoriteProduct {
  id: number;
  title: string;
  price?: number;
  oldPrice?: number | null;
  rating?: number;
  image: any;
}

type FavoritesState = {
  items: FavoriteProduct[];
  /** Додати товар у вибране на початок списку або видалити, якщо вже є */
  toggleFavorite: (product: FavoriteProduct, isFavorite: boolean) => void;
  /** Видалити декілька товарів за їх id */
  removeMany: (ids: number[]) => void;
};

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  items: [],

  toggleFavorite: (product, isFavorite) =>
    set((state) => {
      // якщо знімаємо лайк — видаляємо з обраних
      if (!isFavorite) {
        return {
          items: state.items.filter((p) => p.id !== product.id),
        };
      }

      // якщо додаємо — переносимо товар на початок списку,
      // уникаючи дублювання за id
      const withoutCurrent = state.items.filter((p) => p.id !== product.id);
      return {
        items: [
          {
            ...product,
          },
          ...withoutCurrent,
        ],
      };
    }),

  removeMany: (ids) =>
    set((state) => ({
      items: state.items.filter((p) => !ids.includes(p.id)),
    })),
}));
