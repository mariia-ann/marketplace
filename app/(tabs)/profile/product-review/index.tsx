import {
  View,
  Image,
  Text,
  ScrollView,
  ViewStyle,
  StyleProp,
  PressableProps,
  TextInput,
  StyleSheet,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import { ProductReviewImageScroller } from '@/src/components/HOC';
import CustomButton from '@/src/components/common/CustomButton';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { TileComponent } from '@/src/components/HOC/common';

function ProductReview() {
  const productsDetailsButtons = ['Про товар', 'Опис', 'Відгуки'];

  const [isSelectedbuttonIndex, setIsSelectedbuttonIndex] = useState<
    number | null
  >(0);
  const [isSelectedColorIndex, setIsSelectedColorIndex] = useState<
    number | null
  >(0);
  const [tileIndex, setTileIndex] = useState<number | null>(0);

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 60,
      backgroundColor: '#fff',
    },
    productDetailsButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 10,
    },
    productDetailsButton: {
      padding: 10,
      textAlign: 'center',
      width: '33.33%',
      borderColor: '#999999',
      borderWidth: 1,
    },
  });

  const handleIsSelectedButton = (index: number) => {
    if (index === isSelectedbuttonIndex) {
      setIsSelectedbuttonIndex(null);
    } else {
      setIsSelectedbuttonIndex(index);
    }
  };

  const renderProductDetailsButton = (button: string, index: number) => {
    const isfirstButton: boolean = index === 0;
    const isLastButton: boolean = index === productsDetailsButtons.length - 1;
    const buttonsStyling = {
      borderTopLeftRadius: isfirstButton ? 10 : 0,
      borderBottomLeftRadius: isfirstButton ? 10 : 0,
      borderTopRightRadius: isLastButton ? 10 : 0,
      borderBottomRightRadius: isLastButton ? 10 : 0,
      backgroundColor:
        isSelectedbuttonIndex === index ? Colors.softPurple : Colors.white,
      borderColor:
        isSelectedbuttonIndex === index ? Colors.softPurple : Colors.grey400,
    };

    const buttonTextStyling = {
      color: isSelectedbuttonIndex === index ? Colors.white : Colors.blackMain,
    };
    return (
      <CustomButton
        onPress={() => handleIsSelectedButton(index)}
        title={button}
        key={button}
        customStyles={{ ...styles.productDetailsButton, ...buttonsStyling }}
        customTextStyles={buttonTextStyling}
      />
    );
  };

  //for now using this Object, when you have API connectivity, just map the API data with this object, so it can direct fetch
  const productDetailsData = {
    productName: 'Жіночі черевики на підборах з натуральної шкіри',
    productPrice: '4200 ₴',
    productDiscountedPrice: '3600 ₴',
    productRating: '4.5',
    productTotalNumberofrating: '12',
    productReviews: '',
    productId: '9000000076543',
    inStock: true,
    productColors: [
      {
        color: '#C58351',
        available: true,
      },
      {
        color: '#A15221',
        available: true,
      },
      {
        color: '#523E37',
        available: true,
      },
      {
        color: '#272726',
        available: true,
      },
      {
        color: '#303E4D',
        available: false,
      },
    ],
    productSize: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    productInformation: [
      {
        brandName: 'Матеріал',
        value:
          'lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit',
      },
      {
        title: 'Таблиця розмірів',
        value: '2025',
      },
      {
        title: 'Країна виробник',
        value: 'Україна',
      },
    ],
  };

  const shareNetworkSVGIconSize: number = 30;

  const handleCopyId = async () => {
    await Clipboard.setStringAsync(productDetailsData.productId || '');
    console.log('Copy product ID:', productDetailsData.productId);
    Toast.show({
      type: 'success',
      text1: 'Скопійовано в буфер обміну!',
      text2: `ID товару: ${productDetailsData.productId}`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleSelectedColors = (index: number, available: boolean) => {
    if (!available) {
      return;
    }
    if (isSelectedColorIndex === index) {
      setIsSelectedColorIndex(null);
    } else {
      setIsSelectedColorIndex(index);
    }
  };

  const renderColorOptions = (
    color: { color: string; available: boolean },
    index: number,
  ) => {
    //if no color then mark line on color
    const isSelected = isSelectedColorIndex === index;
    return (
      <CustomButton
        key={`color-${index}`}
        onPress={() => handleSelectedColors(index, color.available)}
        customStyles={{
          position: 'relative',
          width: 42,
          height: 42,
          padding: 0,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
      >
        {!color.available && (
          <View
            style={{
              position: 'absolute',
              top: 21,
              left: -8,
              zIndex: 10,
              transform: [{ rotate: '-45deg' }],
              width: 50,
              height: 2,
              backgroundColor: Colors.purple200,
            }}
          ></View>
        )}
        <View
          key={index}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: color.color,
            marginRight: 10,
            borderWidth: 3,
            borderColor: isSelected ? Colors.softPurple : 'transparent',
          }}
        ></View>
      </CustomButton>
    );
  };

  const renderProductSize = (size: number, index: number) => {
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Colors.line,
        }}
      >
        <Text style={{ color: Colors.blackMain }}>{size}</Text>
      </View>
    );
  };

  const handleOpenTile = (index: number) => {
    if (index === tileIndex) {
      setTileIndex(null);
    } else {
      setTileIndex(index);
    }
  };

  const renderProductInformation = (
    item: { title?: string; value: string; brandName?: string },
    index: number,
  ) => {
    const isOpen: boolean = index === tileIndex;

    return (
      <TileComponent
        key={index}
        onPress={() => handleOpenTile(index)}
        styles={{}}
        buttonStyles={{}}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Text
            style={{ color: Colors.blackMain, fontSize: 18, fontWeight: '500' }}
          >
            {item.title || item?.brandName}
          </Text>
          <SvgIcons
            name={CUSTOM_ICON_REF.Arrowright}
            baseStyle={{
              color: Colors.blackMain,
              width: shareNetworkSVGIconSize,
              height: shareNetworkSVGIconSize,
              transform: [{ rotate: isOpen ? '-90deg' : '0deg' }],
            }}
          />
        </View>
        {isOpen && (
          <Text style={{ color: Colors.blackMain, fontSize: 16, marginTop: 4 }}>
            {item.value}
          </Text>
        )}
      </TileComponent>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProductReviewImageScroller bannerDotStyling={{ top: -50 }} />
      <View style={styles.productDetailsButtonsContainer}>
        {productsDetailsButtons.map(renderProductDetailsButton)}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          paddingTop: 20,
        }}
      >
        <Text style={{ width: '80%', fontSize: 18 }}>
          {productDetailsData.productName}
        </Text>
        <SvgIcons
          name={CUSTOM_ICON_REF.ShareNetwork}
          baseStyle={{
            color: Colors.blackMain,
            width: shareNetworkSVGIconSize,
            height: shareNetworkSVGIconSize,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
          paddingTop: 20,
        }}
      >
        <Text>Ap: {productDetailsData.productId}</Text>
        <CustomButton
          onPress={handleCopyId}
          customStyles={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'transparent',
            width: 40,
            height: 40,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.CopyLogo}
            baseStyle={{
              color: Colors.grey400,
              width: shareNetworkSVGIconSize,
              height: shareNetworkSVGIconSize,
            }}
          />
        </CustomButton>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: productDetailsData.inStock
              ? Colors.green
              : Colors.red,
            width: 20,
            height: 20,
            borderRadius: 10,
          }}
        ></View>
        <Text style={{ color: Colors.grey500 }}>
          {productDetailsData.inStock ? 'В наявності' : 'Немає в наявності'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 5,
          }}
        >
          {productDetailsData.productDiscountedPrice && (
            <Text style={{ color: Colors.red }}>
              {productDetailsData.productDiscountedPrice}
            </Text>
          )}
          <Text style={{ color: Colors.blackMain, fontWeight: 'bold' }}>
            {productDetailsData.productPrice}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Star}
            baseStyle={{ color: Colors.yellow, width: 20, height: 20 }}
          />
          <Text style={{ color: Colors.blackMain, fontWeight: 'bold' }}>
            {productDetailsData.productRating}
          </Text>
          <Text style={{ color: Colors.blackMain }}>
            ({productDetailsData.productTotalNumberofrating})
          </Text>
        </View>
      </View>

      <View
        style={{ width: '100%', borderWidth: 0.7, borderColor: Colors.line }}
      ></View>

      <View style={{ paddingTop: 10, paddingBottom: 30 }}>
        <Text style={{ color: Colors.blackMain, fontSize: 18 }}>Варіанти</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            paddingTop: 15,
          }}
        >
          {productDetailsData.productColors.map(renderColorOptions)}
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
          }}
          style={{ paddingTop: 20 }}
        >
          {productDetailsData.productSize.map(renderProductSize)}
        </ScrollView>
      </View>

      <View style={{ paddingBottom: 50 }}>
        {productDetailsData.productInformation.map(renderProductInformation)}
      </View>
    </ScrollView>
  );
}

export default ProductReview;
