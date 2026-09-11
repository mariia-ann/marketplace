import { create } from 'zustand';
import { Collection, CollectionIconType } from '@/src/types/Collection';

const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'wardrobe',
    title: 'Гардероб',
    itemCount: 9,
    icon: 'folder',
    previewImages: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80', // red dress
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80', // beige trench coat
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80', // denim & boots
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80', // brown boots
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', // green handbag
    ],
    routePath: '/favorite/collections/for-home',
  },
  {
    id: 'for-home',
    title: 'Для дому',
    itemCount: 5,
    icon: 'gift',
    previewImages: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80', // patterned blanket
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', // dark backpack/bag
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&q=80', // fluffy slippers
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80', // pink hair bow
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80', // ceramic mug / decor
    ],
    routePath: '/favorite/collections/for-home',
  },
];

type CollectionsState = {
  collections: Collection[];
  addCollection: (title: string, icon?: CollectionIconType) => Collection;
  removeCollection: (id: string) => void;
  updateCollectionTitle: (id: string, title: string) => void;
  updateCollectionIcon: (id: string, icon: CollectionIconType) => void;
  getCollectionById: (id: string) => Collection | undefined;
};

export const useCollectionsStore = create<CollectionsState>()((set, get) => ({
  collections: INITIAL_COLLECTIONS,

  addCollection: (title: string, icon: CollectionIconType = 'folder') => {
    const newCollection: Collection = {
      id: `col-${Date.now()}`,
      title: title.trim(),
      itemCount: 0,
      icon,
      previewImages: [],
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      collections: [...state.collections, newCollection],
    }));

    return newCollection;
  },

  removeCollection: (id: string) =>
    set((state) => ({
      collections: state.collections.filter((col) => col.id !== id),
    })),

  updateCollectionTitle: (id: string, title: string) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === id ? { ...col, title: title.trim() } : col,
      ),
    })),

  updateCollectionIcon: (id: string, icon: CollectionIconType) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === id ? { ...col, icon } : col,
      ),
    })),

  getCollectionById: (id: string) => {
    return get().collections.find((col) => col.id === id);
  },
}));
