import { View, ScrollView, StyleSheet } from 'react-native';
import { ProductReviewImageScroller } from '@/src/components/HOC';
import CustomButton from '@/src/components/common/CustomButton';
import React, { useState } from 'react';
import Colors from '@/constants/Colors';
import ProductDetails from '@/src/components/ui/product-review/ProductDetails';
import ProductDescription from '@/src/components/ui/product-review/ProductDescription';
import ProductReviews from '@/src/components/ui/product-review/ProductReviews';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  porductDetailsButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  productDetailsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    top: -5,
  },
  productDetailsButton: {
    padding: 10,
    textAlign: 'center',
    width: '33.33%',
    borderColor: '#999999',
    borderWidth: 1,
  },
});

function ProductReview() {
  const productsDetailsButtons = ['Про товар', 'Опис', 'Відгуки'];
  const [isSelectedbuttonIndex, setIsSelectedbuttonIndex] = useState<
    number | null
  >(0);

  const productDetailChildren = [
    ProductDetails,
    ProductDescription,
    ProductReviews,
  ];

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

  return (
    <ScrollView style={styles.container}>
      {isSelectedbuttonIndex === 0 && (
        <ProductReviewImageScroller
          imageContainer={{ height: 400 }}
          imageStyle={{ height: 400, resizeMode: 'cover' }}
          bannerDotStyling={{ bottom: -160, left: -20 }}
          onPressComment={() => {}}
          onPressWishlist={() => {}}
        />
      )}
      <View
        style={{
          ...styles.porductDetailsButtonsContainer,
          paddingBottom: isSelectedbuttonIndex === 0 ? 80 : 10,
        }}
      >
        <View
          style={{
            ...styles.productDetailsButtons,
            ...(isSelectedbuttonIndex === 0 && { position: 'absolute' }),
          }}
        >
          {productsDetailsButtons.map(renderProductDetailsButton)}
        </View>
      </View>

      {productDetailChildren.map((ChildComponent, index) => {
        if (index === isSelectedbuttonIndex) {
          return <ChildComponent key={index} />;
        }
        return null;
      })}
    </ScrollView>
  );
}

export default ProductReview;
