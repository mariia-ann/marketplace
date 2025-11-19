import MarketPlaceHeader from '@/src/components/common/MarketPlaceHeader/MarketPlaceHeader';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import ItemCard from '@/src/components/ui/home_page/ItemCard';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import bagpic from "../../assets/images/bagpic.png";
import whitedress from "../../assets/images/productInCatalog/whitedress.png";
import toaster from "../../assets/images/productInCatalog/toaster.png";
import shoes from "../../assets/images/productInCatalog/shoes.png";
import shoesgold from "../../assets/images/productInCatalog/shoesgold.png";
import reddress from "../../assets/images/productInCatalog/reddress.png";

import { useRef, useState } from 'react';
import BannerCarousel from '@/src/components/ui/home_page/carousel/BannerCarousel';

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  image: string;
  isFavorite: boolean;
  currency?: string;
}

export default function HomeScreen() {

  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const [selectedPillIndex, setSelectedPillIndex] = useState<any>(null);
  const ref =  useRef<any>(null);

  const arrowRightIconSize: number = 30;

  const categoryData = [
    {
      name: "Одяг",
      icon: CUSTOM_ICON_REF.CoatHangar,
    },
    {
      name: "Взуття",
      icon: CUSTOM_ICON_REF.Sneaker,
    },
    {
      name: "Сумки",
      icon: CUSTOM_ICON_REF.BackPack,
    },
    {
      name: "Аксесуари",
      icon: CUSTOM_ICON_REF.Eyeglasses,
    },
    {
      name: "Косметика",
      icon: CUSTOM_ICON_REF.DiamondLogo,
    },
    {
      name: "Дім",
      icon: CUSTOM_ICON_REF.Armchair,
    },
    {
      name: "Електорніка",
      icon: CUSTOM_ICON_REF.Robot,
    },
    {
      name: "Сервіс",
      icon: CUSTOM_ICON_REF.PeopleLogo,
    },
  ];

  const pillsOptions = ["Усе", "Популярні", "Нові надходження", "Знижки", "Рекомендовані"];

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Жіночі черевики на підборах з натураль…",
      price: 3600,
      oldPrice: 4200,
      rating: 4.5,
      image: shoes,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Чоботи Марсала жіночі осінні",
      price: 4199,
      rating: 4.5,
      image: shoesgold,
      isFavorite: false,
    },
    {
      id: 3,
      title: "Жіноче плаття лляне літнє “Summer Bre…”",
      price: 6290,
      rating: 5.0,
      image: reddress,
      isFavorite: true,
    },
    {
      id: 4,
      title: 'Тостер Tefal "Vintage Home" з 2 слотами…',
      price: 1500,
      oldPrice: 1700,
      rating: 4.5,
      image: toaster,
      isFavorite: false,
    },
    {
      id: 5,
      title: 'Чоботи Марсала жіночі осінні ',
      price: 4199,
      oldPrice: null,
      rating: 4.5,
      image: bagpic,
      isFavorite: false,
    },
    {
      id: 6,
      title: 'Тостер Tefal "Vintage Home" з 2 слотами…',
      price: 4199,
      oldPrice: null,
      rating: 4.5,
      image: whitedress,
      isFavorite: false,
    },
  ]);

  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([
    {
      id: 1,
      title: 'Чоботи Марсала жіночі осінні ',
      price: 4199,
      oldPrice: null,
      rating: 4.5,
      image: bagpic,
      isFavorite: false,
    },
    {
      id: 2,
      title: 'Тостер Tefal "Vintage Home" з 2 слотами…',
      price: 4199,
      oldPrice: null,
      rating: 4.5,
      image: whitedress,
      isFavorite: false,
    },
  ]);

  const renderCategorydata = (item: any, index: number) => {
    const iconSize: number = 30;
    const circleSize: number = 60;
    const isSelected: boolean = index === selectedIndex;

    const handleSelectedIndex = (indexSelected: number) => {
      if (selectedIndex === indexSelected) {
        setSelectedIndex(null);
      } else {
        setSelectedIndex(indexSelected);
      }
    }

    const selectedBorderColor: string = isSelected ? "#8E6CEF" : "white";

    return (
      <Pressable key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 15, marginBottom: 15, padding: 8 }} onPress={() => handleSelectedIndex(index)}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: circleSize, height: circleSize, borderRadius: "100%", boxShadow: "0 0 15px #00000026", borderColor: selectedBorderColor, borderWidth: 1 }}>
          <SvgIcons name={item.icon} baseStyle={{ width: iconSize, height: iconSize, color: "#AC94E8" }} />
        </View>
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
      </Pressable>
    )
  }

  const handleSetWishlist = (index: number, isRecommended: boolean) => {
    if(isRecommended){
      const updatedProducts = [...recommendedProducts];
      updatedProducts[index].isFavorite = !updatedProducts[index].isFavorite;
      // Since products is a constant array, we would typically use a state to manage it.
      // For demonstration, we are just updating the local copy here.
      setRecommendedProducts(updatedProducts);
    } else {
      const updatedProducts = [...products];
      updatedProducts[index].isFavorite = !updatedProducts[index].isFavorite;
      // Since products is a constant array, we would typically use a state to manage it.
      // For demonstration, we are just updating the local copy here.
      setProducts(updatedProducts);
    }
  }

  const renderOptionPills = (pill: any, index: number) => {
    const isSelected: boolean = index === selectedPillIndex;
    const handleSelectedPillIndex = (indexSelected: number) => {
      if (selectedPillIndex === indexSelected) {
        setSelectedPillIndex(null);
      } else {
        setSelectedPillIndex(indexSelected);
      }
    }
    const pillTextColor: string = isSelected ? "#8E6CEF" : "#170F2B";
    return (
      <Pressable key={index} style={{paddingRight:15}} onPress={() => handleSelectedPillIndex(index)}>
        <Text style={{fontSize: 16, fontWeight: "bold", color: pillTextColor}}>{pill}</Text>
      </Pressable>
    )
  }

  const renderproducts = (item: Product, index: number) => {
    return (
      <ItemCard key={index} itemName={item.title} addedTowishlist={item.isFavorite} rating={item.rating} handleSetWishlist={()=>handleSetWishlist(index, false)} imageSrc={item.image} discountedPrice={item.price} mrpPrice={item.oldPrice ? item.oldPrice : undefined} />
    )
  }

  const renderRecommendedProducts = (item: Product, index: number) => {
    return (
      <ItemCard key={index} itemName={item.title} addedTowishlist={item.isFavorite} rating={item.rating} handleSetWishlist={()=>handleSetWishlist(index, true)} imageSrc={item.image} discountedPrice={item.price} mrpPrice={item.oldPrice ? item.oldPrice : undefined} />
    )
  }

  return (
    <ScrollView style={styles.container}>
      <MarketPlaceHeader showSearchBar  />
      <BannerCarousel baseStyle={{paddingBottom: 20, paddingTop: 20}} />
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, paddingRight: 0, paddingLeft: 0 }}>
        <Text style={{ ...styles.categoriesText, fontWeight: "bold" }}>Категорії</Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...styles.categoriesText, fontSize: 16 }}>Усі</Text>
          <SvgIcons name={CUSTOM_ICON_REF.Arrowright} baseStyle={{ width: 25, height: 25 }} />
        </View>
      </View>
      <ScrollView horizontal style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", paddingBottom: 20 }}>{categoryData.map(renderCategorydata)}</ScrollView>
      <View style={{ display: "flex", flexDirection: "row" }}></View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ ...styles.categoriesText, fontSize: 20, fontWeight: "bold" }}>Для Вас</Text>
        <SvgIcons name={CUSTOM_ICON_REF.Arrowright} baseStyle={{ width: arrowRightIconSize, height: arrowRightIconSize, fontWeight: "bold", color: "#170F2B" }} />
      </View>
      <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", paddingTop: 20, justifyContent: "space-between" }}>
        {recommendedProducts.map(renderRecommendedProducts)}
        {/* <ItemCard itemName='Чоботи Марсала жіночі осінні ' addedTowishlist rating={4.5} handleSetWishlist={handleSetWishlist} imageSrc={bagpic} discountedPrice={3000} mrpPrice={4199} /> */}
      </View>
      <ScrollView horizontal style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
        {pillsOptions.map(renderOptionPills)}
      </ScrollView>
      <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", paddingTop: 20, justifyContent: "space-between", paddingBottom: 30 }}>
        {products.map(renderproducts)}
        {/* <ItemCard itemName='Чоботи Марсала жіночі осінні ' addedTowishlist rating={4.5} handleSetWishlist={handleSetWishlist} imageSrc={bagpic} discountedPrice={3000} mrpPrice={4199} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    color: '#25292e',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#25292e',
  },
  categoriesText: {
    fontSize: 20,
    color: '#170F2B'
  }
});
