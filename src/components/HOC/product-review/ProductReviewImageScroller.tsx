import BannerCarousel from '@/src/components/ui/home_page/carousel/BannerCarousel';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ProductReviewImageScrollerProps {
  baseStyle?: StyleProp<ViewStyle>;
  banners?: any[];
  bannerDotStyling?: StyleProp<ViewStyle>;
}

function ProductReviewImageScroller({
  baseStyle,
  banners,
  bannerDotStyling,
}: ProductReviewImageScrollerProps) {
  const styles = StyleSheet.create({
    container: {},
  });

  return (
    <View style={styles.container}>
      <BannerCarousel
        banners={banners}
        baseStyle={baseStyle}
        bannerDotStyling={bannerDotStyling}
      />
    </View>
  );
}

export default ProductReviewImageScroller;
