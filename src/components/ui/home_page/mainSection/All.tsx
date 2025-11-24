import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CartForView from "../forYou/CartForView";
// import CartForView from '@/components/ui/home_page/forYou/CartForView';

const products = [
  {
    id: "1",
    image: require("@/assets/images/productInCatalog/image.png"),
    title: "Nike Gym Club Training Bag: Black/College Grey/",
    price: 53.0,
    rating: 4.5,
  },
  {
    id: "2",
    image: require("@/assets/images/productInCatalog/image2.png"),
    title: "Nike Gym Club Training Bag: Gray Edition",
    price: 53.0,
    rating: 4.5,
  },
  /*
  {
    id: '3',
    image: require('@/assets/images/productInCatalog/image.png'),
    title: 'Nike Gym Club Training Bag: Black Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '4',
    image: require('@/assets/images/productInCatalog/image.png'),
    title: 'Nike Gym Club Training Bag: Red/White',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '5',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '6',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '7',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '8',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '9',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },
  {
    id: '10',
    image: require('@/assets/images/productInCatalog/image2.png'),
    title: 'Nike Gym Club Training Bag: Gray Edition',
    price: 53.00,
    rating: 4.5,
  },*/
];

export default function HorizontalProductList() {
  return (
    <FlatList
      horizontal
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CartForView
          item={item}
          onPress={() => console.log("Pressed", item.title)}
        />
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
  },
});
