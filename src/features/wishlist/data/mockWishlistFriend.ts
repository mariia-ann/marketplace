import { WishlistFriendData } from '@/src/types/WishlistFriend';

export const defaultWishlistFriendData: WishlistFriendData = {
  id: '1',
  title: 'Для дому',
  friendName: 'Катерина К.',
  friendProfileImage:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  totalProducts: 19,
  productsReserved: 3,
  isSaved: false,
  productList: [
    {
      id: 1,
      title: 'Сумка жіноча з натуральної шкіри',
      price: 4199,
      oldPrice: null,
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 2,
      title: 'Муслінове покривало бавовняне двостороннє',
      price: 1550,
      oldPrice: 2550,
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 3,
      title: 'Ваза керамічна мінімалістична "Сфера"',
      price: 890,
      oldPrice: 1200,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop&q=80',
      isFavorite: true,
      isReserved: true,
    },
    {
      id: 4,
      title: 'Ароматична соєва свічка "Лаванда та ваніль"',
      price: 450,
      oldPrice: null,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 5,
      title: 'Набір лляних серветок для столу (4 шт.)',
      price: 680,
      oldPrice: 850,
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 6,
      title: "Плед в'язаний з вовни мериноса",
      price: 2300,
      oldPrice: 2800,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&auto=format&fit=crop&q=80',
      isFavorite: true,
      isReserved: true,
    },
    {
      id: 7,
      title: 'Світильник настільний у скандинавському стилі',
      price: 1750,
      oldPrice: null,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 8,
      title: "Дерев'яна тарілка для фруктів ручної роботи",
      price: 920,
      oldPrice: 1150,
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: true,
    },
    {
      id: 9,
      title: 'Чоботи Марсала жіночі осінні',
      price: 4199,
      oldPrice: null,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
    {
      id: 10,
      title: 'Керамічне кашпо для кімнатних рослин',
      price: 620,
      oldPrice: 790,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      isFavorite: false,
      isReserved: false,
    },
  ],
};

/**
 * Returns wishlist friend data. By default, returns identical data for any given ID
 * for easy mockup testing until the backend API is connected.
 */
export function getWishlistFriendData(
  id?: string | string[],
): WishlistFriendData {
  return {
    ...defaultWishlistFriendData,
    id: typeof id === 'string' ? id : defaultWishlistFriendData.id,
    productList: defaultWishlistFriendData.productList.map((p) => ({ ...p })),
  };
}
