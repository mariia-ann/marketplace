import { Product } from "@/app/(tabs)";
import whiteboots from '@/assets/images/category/womens/white-boots.png';
import brownBoots from '@/assets/images/category/womens/brown-boots.png';
import blackBoots from '@/assets/images/category/womens/black-boots.png';
import maroonBoots from '@/assets/images/category/womens/maroon-boots.png';

const suggesstionProducts: Product[] = [
    {
      id: 1,
      title: 'Чоботи Mavka жіночі білі',
      price: 2890,
      oldPrice: 3300,
      rating: 4.5,
      image: whiteboots,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Чоботи Марсала жіночі осінні ',
      oldPrice: 4199,
      rating: 4.5,
      image: brownBoots,
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Чоботи Kachorovska жіночі ковбойки',
      oldPrice: 4199,
      rating: 4.5,
      image: maroonBoots,
      isFavorite: false,
    },
    {
      id: 4,
      title: 'Чоботи Kasandra жіночі чорні',
      oldPrice: 4199,
      rating: 4.5,
      image: blackBoots,
      isFavorite: false,
    },
  ];

export { suggesstionProducts };
