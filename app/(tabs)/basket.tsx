import Colors from '@/constants/Colors';
import CartItemTile from '@/src/components/common/Basket/CartItemTile';
import CustomButton from '@/src/components/common/CustomButton';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import ItemCard from '@/src/components/ui/home_page/ItemCard';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { useBasketStore } from '@/src/state/useBasketStore';
import { CartItem } from '@/src/types/CartItems';
import { suggesstionProducts } from '@/src/utils/suggesstionProducts';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function Basket() {
  const [sellerItemsSelectedIndex, setSellerItemsSelectedIndex] =
    useState<number>(0);

  const styles = StyleSheet.create({});
  const {
    items,
    toggleItemChecked,
    setAllItemsChecked,
    toggleItemsCheckedByCompany,
    removeSelectedItems,
  } = useBasketStore();
  const trashIconSize = 24;
  const totalSelectedItems = items.filter((item) => item.isChecked).length;
  const totalItems = items.length;

  const billAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleDeleteBasketItems = () => {
    if (totalSelectedItems === 0) {
      return;
    }

    removeSelectedItems();
  };

  const handleSelectAllItemsFromSameSeller = (company: string) => {
    const companyItems = items.filter((item) => item.company === company);
    if (companyItems.length === 0) {
      return;
    }

    const isEveryCompanyItemSelected = companyItems.every(
      (item) => item.isChecked,
    );
    toggleItemsCheckedByCompany(company, !isEveryCompanyItemSelected);
  };

  const handleToggleAllItems = () => {
    const shouldCheckAll = totalSelectedItems !== totalItems;
    setAllItemsChecked(shouldCheckAll);
  };

  const renderBasketStoreItems = (item: CartItem, index: number) => {
    const handleSelectTileWishListCheck = () => {
      // Optional future wishlist handling
    };

    const handleToggleItemChecked = () => {
      toggleItemChecked(item.id);
    };

    return (
      <CartItemTile
        key={`${item.id}-${item.name}`}
        handleIsCheck={handleSelectTileWishListCheck}
        onToggleSelection={handleToggleItemChecked}
        cartItem={item}
        isWishListCheck={false}
      />
    );
  };

  const companies = Array.from(
    new Set(
      items
        .map((item) => item.company)
        .filter((company): company is string => Boolean(company)),
    ),
  );

  const suggesstionItems = ['Рекомендації', 'Перегляди', 'Знижки'];

  const renderSuggesstionItems = (item: string, index: number) => {
    const handleSelectedSuggestionTitle = () => {
      setSellerItemsSelectedIndex(index);
    };

    const isSelected: boolean = sellerItemsSelectedIndex === index;
    return (
      <CustomButton key={index} customStyles={{ backgroundColor: Colors.white, borderColor: "transparent", height: 'fit-content', marginRight: 10 }} onPress={handleSelectedSuggestionTitle}>
        <Text style={{ color: isSelected ? Colors.softPurple : Colors.blackMain, fontWeight: "bold" }}>
          {item}
        </Text>
      </CustomButton>
    );
  };

  const renderSuggesstionProducts = (item: any, index: number) => {
    // const handleSelectedSuggesstionProduct = () => { };
    return (
      <ItemCard
        key={item.id}
        imageSrc={item.image}
        itemName={item.title}
        discountedPrice={item.price}
        mrpPrice={item.oldPrice}
        rating={item.rating}
        addedTowishlist={item.isFavorite}
        handleSetWishlist={() => { }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <NavigationHeader title="Кошик" route={{ name: 'basket', key: 'basket' }} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 22,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CheckBox title='Усі' onPress={handleToggleAllItems} isChecked={totalItems > 0 && totalSelectedItems === totalItems} />
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
        {companies.map((company) => {
          const companyItems = items.filter((item) => item.company === company);
          const companySelected =
            companyItems.length > 0 &&
            companyItems.every((item) => item.isChecked);

          return (
            <React.Fragment key={company}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}
              >
                <CustomButton
                  onPress={() => handleSelectAllItemsFromSameSeller(company)}
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
                  <CheckBox isChecked={companySelected} />
                  <Text style={{ color: Colors.blackMain }}>{company}</Text>
                  <SvgIcons
                    name={CUSTOM_ICON_REF.Arrowright}
                    baseStyle={{ width: 16, height: 16, marginLeft: 6 }}
                  />
                </CustomButton>
                <Text style={{ color: Colors.softPurple }}>Написати продавцю</Text>
              </View>
              <View>{companyItems.map(renderBasketStoreItems)}</View>
            </React.Fragment>
          );
        })}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20 }} contentContainerStyle={{ paddingHorizontal: 10 }}>{suggesstionItems.map(renderSuggesstionItems)}</ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingHorizontal: 10,
          }}
        >
          {suggesstionProducts.map(renderSuggesstionProducts)}
        </View>
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 10, paddingTop: 20, paddingBottom: 50 }}>
        <Text style={{ fontSize: 24 }}>{billAmount}₴</Text>
        <CustomButton customStyles={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "auto", width: "70%", height: 50 }} onPress={() => { }}>
          <Text style={{ color: Colors.white }}>Оформити замовлення</Text>
        </CustomButton>
      </View>
    </View>
  );
}

export default Basket;
