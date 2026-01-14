import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import whiteboots from "@/assets/images/category/womens/white-boots.png";
import brownBoots from "@/assets/images/category/womens/brown-boots.png";
import blackBoots from "@/assets/images/category/womens/black-boots.png";
import maroonBoots from "@/assets/images/category/womens/maroon-boots.png";
import CustomButton from '@/src/components/common/CustomButton';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import BackArrow from '@/src/components/ui/BackArrow';
import { Product } from '@/app/(tabs)';
import ItemCard from '@/src/components/ui/home_page/ItemCard';

function WomensBoots() {

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 30,
    },
  });

  const iconbSize: number = 35;

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Чоботи Mavka жіночі білі",
      price: 2890,
      oldPrice: 3300,
      rating: 4.5,
      image: whiteboots,
      isFavorite: false,
    },
    {
      id: 2,
      title: "Чоботи Марсала жіночі осінні ",
      oldPrice: 4199,
      rating: 4.5,
      image: brownBoots,
      isFavorite: false,
    },
    {
      id: 3,
      title: "Чоботи Kachorovska жіночі ковбойки",
      oldPrice: 4199,
      rating: 4.5,
      image: maroonBoots,
      isFavorite: false,
    },
    {
      id: 4,
      title: "Чоботи Kasandra жіночі чорні",
      oldPrice: 4199,
      rating: 4.5,
      image: blackBoots,
      isFavorite: false,
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, paddingTop: 20 }}>
        <BackArrow />
        <Text style={{ fontSize: 22, marginLeft: 10, paddingLeft: 60 }}>Чоботи жіночі</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: "space-between", gap: 10 }}>
        <CustomButton onPress={() => { }} customStyles={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "48%", alignItems: "center", backgroundColor: "transparent", borderColor: "transparent" }}>
          <SvgIcons name={CUSTOM_ICON_REF.Funnel} baseStyle={{ width: iconbSize, height: iconbSize, color: "#000000" }} />
          <View style={{paddingLeft: 10}}>
            <Text>Фільтр</Text>
            <Text style={{color: "#666666"}}>не обраний</Text>
          </View>
        </CustomButton>
        <CustomButton onPress={() => { }} customStyles={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "48%", alignItems: "center", backgroundColor: "transparent", borderColor: "transparent" }}>
          <SvgIcons name={CUSTOM_ICON_REF.SlidersHorizontal} baseStyle={{ width: iconbSize, height: iconbSize, color: "#000000" }} />
          <View style={{paddingLeft: 10}}>
            <Text>Сортування</Text>
            <Text style={{color: "#666666"}}>за рейтингом</Text>
          </View>
        </CustomButton>
      </View>
      
      {/* Products grid would go here */}
      <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: "space-between", flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ItemCard key={product.id} imageSrc={product.image} itemName={product.title} discountedPrice={product.price} mrpPrice={product.oldPrice} rating={product.rating} addedTowishlist={product.isFavorite} handleSetWishlist={() => { }} /> 
        ))}
      </View>
    </ScrollView>
  )
}

export default WomensBoots