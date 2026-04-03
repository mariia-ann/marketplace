import Colors from '@/constants/Colors';
import CartItemTile from '@/src/components/common/Basket/CartItemTile';
import CustomButton from '@/src/components/common/CustomButton';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { useBasketStore } from '@/src/state/useBasketStore';
import { CartItem, TCartItemTile } from '@/src/types/CartItems';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Basket() {
  const [isSellerItemsSelected, setIsSellerItemsSelected] =
    useState<boolean>(false);

  const styles = StyleSheet.create({});
  const basketStore = useBasketStore();
  const trashIconSize = 24;
  const totalSelectedItems = basketStore.items.filter(
    (item) => item.isChecked,
  ).length;
  const totalItems = basketStore.items.length;

  const handleDeleteBasketItems = () => {
    // Implement delete functionality here
    console.warn('Delete button pressed');
  };

  const handleSelectAllitemsfromSameSeller = () => {};

  const renderBasketStoreItems = (item: CartItem, index: number) => {
    const handleSelectTileWishListCheck = () => {};
    return (
      <CartItemTile
        key={index + item.name}
        handleIsCheck={handleSelectTileWishListCheck}
        cartItem={item}
        isWishListCheck={false}
      />
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.white, paddingHorizontal: 10 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CheckBox title='Усі' />
        </View>
        <Text>
          Обрані {totalSelectedItems}/{totalItems}
        </Text>
        <CustomButton
          onPress={handleDeleteBasketItems}
          customStyles={{
            width: trashIconSize + 4,
            height: trashIconSize + 4,
            backgroundColor: Colors.white,
            borderColor: 'transparent',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Trash}
            baseStyle={{ width: trashIconSize, height: trashIconSize }}
          />
        </CustomButton>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
        }}
      >
        <CustomButton
          onPress={handleSelectAllitemsfromSameSeller}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            width: 150,
            height: 'auto',
            borderColor: Colors.white,
          }}
        >
          <CheckBox isChecked={true} />
          <Text style={{ color: Colors.blackMain }}>MALETSKIY</Text>
          <SvgIcons
            name={CUSTOM_ICON_REF.Arrowright}
            baseStyle={{ width: 16, height: 16, marginLeft: 6 }}
          />
        </CustomButton>
        <Text style={{ color: Colors.softPurple }}>Написати продавцю</Text>
      </View>
      <View>
        {basketStore.items
          .filter((item) => item.company === 'MALETSKIY')
          .map(renderBasketStoreItems)}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
        }}
      >
        <CustomButton
          onPress={handleSelectAllitemsfromSameSeller}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            width: 150,
            height: 'auto',
            borderColor: Colors.white,
          }}
        >
          <CheckBox isChecked={true} />
          <Text style={{ color: Colors.blackMain }}>Amigurumi</Text>
          <SvgIcons
            name={CUSTOM_ICON_REF.Arrowright}
            baseStyle={{ width: 16, height: 16, marginLeft: 6 }}
          />
        </CustomButton>
        <Text style={{ color: Colors.softPurple }}>Написати продавцю</Text>
      </View>
      <View>
        {basketStore.items
          .filter((item) => item.company === 'Amigurumi')
          .map(renderBasketStoreItems)}
      </View>
    </ScrollView>
  );
}

export default Basket;
