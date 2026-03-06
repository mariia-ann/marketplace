import Colors from '@/constants/Colors';
import CustomButton from '@/src/components/common/CustomButton';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import BannerCarousel from '@/src/components/ui/home_page/carousel/BannerCarousel';
import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface ProductReviewImageScrollerProps {
  baseStyle?: StyleProp<ViewStyle>;
  banners?: string[];
  bannerDotStyling?: StyleProp<ViewStyle>;
  imageContainer?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPressWishlist?: () => void;
  onPressComment?: () => void;
}

function ProductReviewImageScroller({
  baseStyle,
  banners,
  bannerDotStyling,
  imageContainer,
  imageStyle,
  onPressWishlist,
  onPressComment,
}: ProductReviewImageScrollerProps) {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    imageButtonsCommonStyles: {
      backgroundColor: Colors.white,
      height: 'auto',
      padding: 6,
      borderRadius: '100%',
      borderColor: 'transparent',
    },
    imageButtonText: { color: Colors.blackMain },
  });

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
        {typeof onPressWishlist === 'function' && (
          <CustomButton
            onPress={onPressWishlist}
            customStyles={styles.imageButtonsCommonStyles}
            customTextStyles={styles.imageButtonText}
          >
            <SvgIcons
              name={CUSTOM_ICON_REF.WishlistIcon}
              baseStyle={{ width: 24, height: 24, color: Colors.blackMain }}
            />
          </CustomButton>
        )}

        {typeof onPressComment === 'function' && (
          <CustomButton
            onPress={onPressComment}
            customStyles={{ ...styles.imageButtonsCommonStyles, marginTop: 10 }}
            customTextStyles={styles.imageButtonText}
          >
            <SvgIcons
              name={CUSTOM_ICON_REF.ChatCircleDots}
              baseStyle={{ width: 24, height: 24 }}
            />
          </CustomButton>
        )}
      </View>
      <BannerCarousel
        banners={banners}
        baseStyle={baseStyle}
        imageContainer={imageContainer}
        imageStyle={imageStyle}
        bannerDotStyling={bannerDotStyling}
      />
    </View>
  );
}

export default ProductReviewImageScroller;
