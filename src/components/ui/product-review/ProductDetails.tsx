import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CustomButton from '@/src/components/common/CustomButton';
import CustomDropdown from '@/src/components/common/CustomDropdown';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { TileComponent } from '@/src/components/HOC/common';
import { productDetailsData } from '@/constants/product-review';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';

type CardOffer = {
  cardIcon: CUSTOM_ICON_REF;
  name: string;
  description: string;
};

interface ProductInformation {
  title?: string;
  link?: string | any;
  value?: string;
  brandName?: string;
  cardOffers?: CardOffer[];
}

const styles = StyleSheet.create({
  // Container & Main Layout
  productOrdersButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  // Product Header
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  productNameText: {
    width: '80%',
    fontSize: 18,
  },
  // Product ID Section
  productIdContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 20,
  },
  copyButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    width: 40,
    height: 40,
  },
  // Stock Status Section
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  stockIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  stockText: {
    color: Colors.grey500,
    fontSize: 11,
  },
  // Price Section
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  discountedPrice: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 16,
  },
  regularPrice: {
    color: Colors.grey400,
    fontWeight: 'bold',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    color: Colors.blackMain,
    fontWeight: 'bold',
  },
  ratingCount: {
    color: Colors.blackMain,
  },
  // Divider
  divider: {
    width: '100%',
    borderWidth: 0.7,
    borderColor: Colors.line,
  },
  // Variants Section
  variantsSection: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  variantsTitle: {
    color: Colors.blackMain,
    fontSize: 18,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 15,
  },
  sizeScrollView: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 25,
  },
  sizeScrollContentContainer: {
    gap: 10,
  },
  // Color Option Button
  colorButton: {
    position: 'relative',
    width: 42,
    height: 42,
    padding: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  colorUnavailableLine: {
    position: 'absolute',
    top: 21,
    left: -8,
    zIndex: 10,
    transform: [{ rotate: '-45deg' }],
    width: 50,
    height: 2,
    backgroundColor: Colors.purple200,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 3,
  },
  // Size Button
  sizeButton: {
    height: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  // Product Information Tile
  tileContainer: {
    paddingBottom: 10,
  },
  tileHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  tileHeaderText: {
    color: Colors.blackMain,
    fontSize: 18,
    fontWeight: '500',
  },
  tileContentText: {
    color: Colors.blackMain,
    fontSize: 16,
    marginTop: 4,
  },
  // Card Offer
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 10,
  },
  offerContentContainer: {
    flex: 1,
  },
  offerTitle: {
    color: Colors.blackMain,
    fontSize: 16,
    fontWeight: '500',
  },
  offerDescription: {
    color: Colors.blackMain,
    fontSize: 14,
  },
  // Delivery Section
  deliveryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryHeaderText: {
    color: Colors.blackMain,
    fontSize: 18,
  },
  deliveryWayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  deliveryWayContentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    flex: 1,
    paddingBottom: 10,
  },
  deliveryWayTitle: {
    color: Colors.blackMain,
    fontSize: 16,
    fontWeight: '500',
  },
  deliveryWayInstructions: {
    color: Colors.blackMain,
    fontSize: 14,
    fontWeight: 'bold',
  },
  deliveryWayCharges: {
    color: Colors.blackMain,
    fontSize: 16,
  },
  // City Dropdown Container
  cityDropdownContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  cityDropdownLabel: {
    color: Colors.blackMain,
    fontSize: 14,
    marginBottom: 8,
  },
  // Buttons Container
  buttonsContainer: {
    paddingBottom: 60,
  },
});

function ProductDetails() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null,
  );
  const [isSelectedColorIndex, setIsSelectedColorIndex] = useState<
    number | null
  >(0);
  const [tileIndex, setTileIndex] = useState<number | null>(0);

  const [deliveryTileOpen, setDeliveryTileOpen] = useState<boolean>(false);
  const navigate = useRouter();

  const productDeliveryWaysData = {
    deliveryWays: [
      {
        icon: CUSTOM_ICON_REF.MopedFront,
        name: 'Доставка кур’єром Нової Пошти',
        instructions: 'Відправка сьогодні при замовленні до 17:00',
        chargesInstructions: 'За тарифами перевізника',
      },
      {
        icon: CUSTOM_ICON_REF.Storefront,
        name: 'Самовивіз з відділень поштових операторів',
        instructions: 'Відправка сьогодні при замовленні до 17:00',
        chargesInstructions: 'За тарифами перевізника',
      },
    ],
    deliveryCity: [
      {
        name: 'Київ',
      },
      {
        name: 'Львів',
      },
      {
        name: 'Одеса',
      },
    ],
    exchangeDetails: [
      {
        icon: CUSTOM_ICON_REF.ShieldCheck,
        title: 'Умови повернення',
        details: [
          'Ви маєте 2 години після оплати, аби відмінити замовлення',
          'Якщо при отриманні ви виявили, що якість товару неналежної якості, товар не відповідає опису, або він не працює - ви маєте право зробити повернення товару протягом 14 днів з дати отримання.',
          'Гроші будуть нараховані на ваш рахунок, з якого було здійснено оплату, протягом 14 банківських днів з моменту оформлення повернення.',
        ],
      },
      {
        icon: CUSTOM_ICON_REF.ShieldCheck,
        title: 'Умови обміну',
        details: [
          'Ви маєте право обміняти товар протягом 14 днів з дати отримання, за умови що товар не використовувався, ви зберегли чек та оригінальну упаковку.',
          'Доставка за рахунок покупця',
          `Зв'яжіться з продавцем або створіть заявку в кабінеті.`,
        ],
      },
    ],
  };

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
        customStyles={styles.colorButton}
      >
        {!color.available && <View style={styles.colorUnavailableLine}></View>}
        <View
          key={index}
          style={[
            styles.colorCircle,
            {
              backgroundColor: color.color,
              borderColor: isSelected ? Colors.softPurple : 'transparent',
            },
          ]}
        ></View>
      </CustomButton>
    );
  };

  const renderProductSize = (
    size: { size: number; available: boolean },
    index: number,
  ) => {
    const isSelected = selectedSize === size.size;
    return (
      <CustomButton
        disabled={!size.available}
        onPress={() => setSelectedSize(size.size)}
        key={`size-${index}`}
        customStyles={{
          ...styles.sizeButton,
          backgroundColor: isSelected ? Colors.softPurple : Colors.white,
          borderColor: isSelected
            ? Colors.softPurple
            : size.available
              ? Colors.blackMain
              : Colors.purple400,
        }}
      >
        <Text
          style={{
            color: isSelected
              ? Colors.white
              : size.available
                ? Colors.blackMain
                : Colors.purple400,
          }}
        >
          {size.size}
        </Text>
      </CustomButton>
    );
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

  const shareNetworkSVGIconSize: number = 30;

  const handleOpenTile = (index: number) => {
    if (index === tileIndex) {
      setTileIndex(null);
    } else {
      setTileIndex(index);
    }
  };

  const renderProductInformation = (
    item: ProductInformation,
    index: number,
  ) => {
    const isOpen: boolean = index === tileIndex;

    const handleTileFunction = () => {
      if (item.link) {
        //navigate to the link
        navigate.push(item.link);
        console.log('Navigate to:', item.link);
      } else {
        handleOpenTile(index);
      }
    };

    const renderCardOffers = (offer: CardOffer, offerIndex: number) => {
      const iconSize: number = 25;
      return (
        <View key={offerIndex} style={styles.offerContainer}>
          <SvgIcons
            name={offer.cardIcon}
            baseStyle={{
              color: Colors.blackMain,
              width: iconSize,
              height: iconSize,
              marginTop: 2,
            }}
          />
          <View style={styles.offerContentContainer}>
            <Text style={styles.offerTitle}>{offer.name}</Text>
            <Text style={styles.offerDescription}>{offer.description}</Text>
          </View>
        </View>
      );
    };

    return (
      <TileComponent key={index} onPress={handleTileFunction}>
        <View style={styles.tileHeaderContainer}>
          <Text style={styles.tileHeaderText}>
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
          <>
            <Text style={styles.tileContentText}>{item.value}</Text>
            {item.cardOffers && item.cardOffers.map(renderCardOffers)}
          </>
        )}
      </TileComponent>
    );
  };

  const handleDeliveryTileClick = () => {
    setDeliveryTileOpen(!deliveryTileOpen);
  };

  const renderdeliveryWays = (item: any, index: number) => {
    const iconSize = 30;
    return (
      <View key={index}>
        <View style={styles.deliveryWayContainer}>
          <SvgIcons
            name={item.icon}
            baseStyle={{
              color: Colors.blackMain,
              width: iconSize,
              height: iconSize,
            }}
          />
          <View style={styles.deliveryWayContentContainer}>
            <Text style={styles.deliveryWayTitle}>{item.name}</Text>
            <Text style={styles.deliveryWayInstructions}>
              {item.instructions}
            </Text>
            <Text style={styles.deliveryWayCharges}>
              {item.chargesInstructions}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderExchangeDetails = (item: any, index: number) => {
    const iconSize = 30;

    const renderExchangeDetail = (detail: string, detailIndex: number) => (
      <Text key={detailIndex}>{detail}</Text>
    );
    return (
      <View key={index}>
        <View style={styles.deliveryWayContainer}>
          <SvgIcons
            name={item.icon}
            baseStyle={{
              color: Colors.blackMain,
              width: iconSize,
              height: iconSize,
            }}
          />
          <View style={styles.deliveryWayContentContainer}>
            <Text style={styles.deliveryWayTitle}>{item.title}</Text>
            {item.details.map(renderExchangeDetail)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.productNameContainer}>
        <Text style={styles.productNameText}>
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

      <View style={styles.productIdContainer}>
        <Text>Ap: {productDetailsData.productId}</Text>
        <CustomButton onPress={handleCopyId} customStyles={styles.copyButton}>
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

      <View style={styles.stockContainer}>
        <View
          style={[
            styles.stockIndicator,
            {
              backgroundColor: productDetailsData.inStock
                ? Colors.green
                : Colors.red,
            },
          ]}
        ></View>
        <Text style={styles.stockText}>
          {productDetailsData.inStock ? 'В наявності' : 'Немає в наявності'}
        </Text>
      </View>

      <View style={styles.priceSection}>
        <View style={styles.priceContainer}>
          {productDetailsData.productDiscountedPrice && (
            <Text style={styles.discountedPrice}>
              {productDetailsData.productDiscountedPrice}
            </Text>
          )}
          <Text
            style={{
              ...styles.regularPrice,
              textDecorationLine: productDetailsData.productDiscountedPrice
                ? 'line-through'
                : 'none',
            }}
          >
            {productDetailsData.productPrice}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <SvgIcons
            name={CUSTOM_ICON_REF.Star}
            baseStyle={{ color: Colors.yellow, width: 20, height: 20 }}
          />
          <Text style={styles.ratingText}>
            {productDetailsData.productRating}
          </Text>
          <Text style={styles.ratingCount}>
            ({productDetailsData.productTotalNumberofrating})
          </Text>
        </View>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.variantsSection}>
        <Text style={styles.variantsTitle}>Варіанти</Text>
        <View style={styles.colorOptionsContainer}>
          {productDetailsData.productColors.map(renderColorOptions)}
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.sizeScrollContentContainer}
          style={styles.sizeScrollView}
        >
          {productDetailsData.productSize.map(renderProductSize)}
        </ScrollView>
      </View>

      <View style={styles.tileContainer}>
        {productDetailsData.productInformation.map(renderProductInformation)}
        <TileComponent
          styles={{ paddingTop: 20 }}
          onPress={handleDeliveryTileClick}
        >
          <View
            style={[
              styles.deliveryHeaderContainer,
              { paddingBottom: deliveryTileOpen ? 10 : 0 },
            ]}
          >
            <Text style={styles.deliveryHeaderText}>Доставка та умови</Text>
            <SvgIcons
              name={CUSTOM_ICON_REF.Arrowright}
              baseStyle={{
                color: Colors.blackMain,
                width: shareNetworkSVGIconSize,
                height: shareNetworkSVGIconSize,
                transform: [{ rotate: deliveryTileOpen ? '-90deg' : '0deg' }],
              }}
            />
          </View>
          {deliveryTileOpen &&
            productDeliveryWaysData.deliveryWays.map(renderdeliveryWays)}
          {deliveryTileOpen && (
            <View style={styles.cityDropdownContainer}>
              <Text style={styles.cityDropdownLabel}>Ваше місто</Text>
              <CustomDropdown
                options={productDeliveryWaysData.deliveryCity.map(
                  (city: any) => ({
                    label: city.name,
                    value: city.name,
                  }),
                )}
                selectedValue={selectedCity}
                onSelect={(option) => {
                  setSelectedCity(option.value);
                  console.log('Selected city:', option.value);
                }}
                placeholder='Виберіть місто'
              />
            </View>
          )}
          {deliveryTileOpen &&
            productDeliveryWaysData.exchangeDetails.map(renderExchangeDetails)}
        </TileComponent>
      </View>

      <TileComponent
        styles={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => {}}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: Colors.blackMain,
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            Товари з цієї категорії
          </Text>
          <SvgIcons
            name={CUSTOM_ICON_REF.Arrowright}
            baseStyle={{
              color: Colors.blackMain,
              width: shareNetworkSVGIconSize,
              height: shareNetworkSVGIconSize,
            }}
          />
        </View>
      </TileComponent>
      <TileComponent>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: Colors.blackMain,
              fontSize: 18,
              textAlign: 'left',
              width: '80%',
            }}
          >
            Аналогічні товари цього продавця
          </Text>
          <SvgIcons
            name={CUSTOM_ICON_REF.Arrowright}
            baseStyle={{
              color: Colors.blackMain,
              width: shareNetworkSVGIconSize,
              height: shareNetworkSVGIconSize,
            }}
          />
        </View>
      </TileComponent>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title='Додати у кошик'
          customStyles={{
            backgroundColor: Colors.white,
            ...styles.productOrdersButton,
          }}
          customTextStyles={{ color: Colors.blackMain, paddingBottom: 2 }}
          onPress={() => {}}
        />
        <CustomButton
          title='Купити зараз'
          customStyles={styles.productOrdersButton}
          onPress={() => {}}
        />
      </View>
    </>
  );
}

export default ProductDetails;
