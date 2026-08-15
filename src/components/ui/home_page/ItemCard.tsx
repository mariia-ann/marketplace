import React from 'react';
import { Image, Text, View } from 'react-native';
import SvgIcons from '../../common/SvgIcons/SvgIcons';
import { CUSTOM_ICON_REF } from '../../common/SvgIcons/IconRef';
import CustomButton from '@/src/components/common/CustomButton';
import Colors from '@/constants/Colors';
import CheckBox from '@/src/components/common/customInput/Checkbox';

interface Props {
  itemName?: string;
  isToggleSelectProduct?: boolean;
  isSelectedProduct?: boolean;
  addedTowishlist?: boolean;
  rating?: number;
  mrpPrice?: number | null;
  discountedPrice?: number;
  imageSrc?: any;
  handleSetWishlist?: () => void;
}

function ItemCard(props: Props) {
  const {
    imageSrc,
    isToggleSelectProduct,
    isSelectedProduct,
    addedTowishlist,
    itemName,
    discountedPrice,
    mrpPrice,
    rating,
    handleSetWishlist,
  } = props;
  const baseIconSize: number = 31;
  const iswishListed: any = addedTowishlist
    ? CUSTOM_ICON_REF.WishlistFillIcon
    : CUSTOM_ICON_REF.WishlistIcon;

  const selectCheckBoxIconCoordinates: number = 5;

  return (
    <View
      style={{
        boxShadow: '0 0 10px #00000030',
        borderRadius: 10,
        width: 175,
        marginBottom: 20,
      }}
    >
      <View style={{ height: 200, position: 'relative' }}>
        {isToggleSelectProduct ? 
        <CheckBox isChecked={isSelectedProduct} onPress={typeof handleSetWishlist === 'function' ? handleSetWishlist : () => {}} containerStyle={{ position: 'absolute', top: selectCheckBoxIconCoordinates, left: selectCheckBoxIconCoordinates, zIndex: 99 }} checkboxStyle={{backgroundColor: Colors.white, borderRadius: 6}} /> : <CustomButton
          customStyles={{ position: 'absolute', top: selectCheckBoxIconCoordinates, right: selectCheckBoxIconCoordinates, zIndex: 99, backgroundColor: 'transparent', height: 'fit-content', borderColor: 'transparent', padding: 3 }}
          onPress={typeof handleSetWishlist === 'function' ? handleSetWishlist : () => {}}
        >
          <SvgIcons
            name={iswishListed}
            baseStyle={{
              width: baseIconSize,
              height: baseIconSize,
              backgroundColor: '#fff',
              color: iswishListed ? '#8E6CEF' : '',
              padding: 3,
              borderRadius: '100%',
            }}
          />
        </CustomButton>}
        {imageSrc && (
          <Image
            style={{
              width: 'auto',
              height: 200,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={imageSrc}
          />
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F5F4FE',
            borderRadius: 5,
            position: 'absolute',
            bottom: 10,
            left: 10,
            zIndex: 99,
            paddingRight: 8,
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Star}
            baseStyle={{ width: 30, height: 30, padding: 5, color: '#FFA500' }}
          />
          <Text>{rating}</Text>
        </View>
      </View>
      <View style={{ padding: 6, paddingBottom: 12 }}>
        <Text
          style={{
            display: 'flex',
            flex: 1,
            paddingTop: 10,
            paddingBottom: 10,
            flexWrap: 'wrap',
          }}
        >
          {itemName}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 5,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {discountedPrice && (
              <Text style={{ fontWeight: 'bold', color: '#D30004' }}>
                {discountedPrice} ₴
              </Text>
            )}
            {mrpPrice && (
              <Text
                style={{
                  ...(discountedPrice
                    ? { textDecorationLine: 'line-through', color: '#999999' }
                    : { color: '#170F2B' }),
                  paddingLeft: 5,
                  fontWeight: 'bold',
                }}
              >
                {mrpPrice} ₴
              </Text>
            )}
          </View>
          <SvgIcons
            name={CUSTOM_ICON_REF.CartBagIcon}
            baseStyle={{
              width: baseIconSize,
              height: baseIconSize,
              backgroundColor: '#F5F4FE',
              padding: 5,
              borderRadius: '100%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default ItemCard;
