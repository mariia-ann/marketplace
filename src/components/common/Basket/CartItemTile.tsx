import Colors from '@/constants/Colors';
import CustomButton from '@/src/components/common/CustomButton';
import CustomDropdown from '@/src/components/common/CustomDropdown';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { useBasketStore } from '@/src/state/useBasketStore';
import { TCartItemTile } from '@/src/types/CartItems';
import { truncateText } from '@/src/utils/truncateText';
import React from 'react';
import { Image, Text, View } from 'react-native';

function CartItemTile({
  cartItem,
  isWishListCheck,
  handleIsCheck,
  onToggleSelection,
}: TCartItemTile) {
  const { name, price, currency, quantity, color, imageSource } = cartItem;

  const { addItem, removeItem } = useBasketStore();

  const handleSelectColorOption = () => {};

  const wishlistIconSize: number = 30;
  const plusMinusIconSize: number = 20;

  const renderColors = (colorOption: any) => {
    return {
      label: colorOption.name || '',
      value: colorOption.colorCode || '',
      color: colorOption.colorCode || '',
      size: colorOption.size || 0,
    };
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 8,
        shadowColor: Colors.lightGrey,
        marginBottom: 20,
      }}
    >
      <View style={{ position: 'relative' }}>
        <CheckBox
          containerStyle={{ position: 'absolute', top: 1, zIndex: 99 }}
          isChecked={cartItem.isChecked}
          onPress={onToggleSelection}
        />
        <Image
          source={{ uri: imageSource }}
          style={{ width: 100, height: 130, borderRadius: 8 }}
        />
      </View>
      <View
        style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // gap: 25,
          }}
        >
          <Text style={{ width: 225 }}>{truncateText(name, 24)}</Text>
          {typeof handleIsCheck === 'function' && (
            <CustomButton
              onPress={handleIsCheck}
              customStyles={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.purple50,
                borderRadius: '100%',
                borderColor: 'transparent',
                width: wishlistIconSize + 10,
                height: wishlistIconSize + 10,
              }}
            >
              <SvgIcons
                name={
                  isWishListCheck
                    ? CUSTOM_ICON_REF.WishlistFillIcon
                    : CUSTOM_ICON_REF.WishlistIcon
                }
                baseStyle={{
                  width: wishlistIconSize,
                  height: wishlistIconSize,
                }}
              />
            </CustomButton>
          )}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
          }}
        >
          <CustomDropdown
            ifColorCode
            dropdownArrowIconStyle={{ width: 22, height: 22 }}
            labelStyle={{ fontSize: 13, color: Colors.blackMain }}
            dropdownStyle={{
              backgroundColor: Colors.purple50,
              borderColor: 'transparent',
              paddingHorizontal: 6,
              paddingVertical: 8,
            }}
            containerStyle={{ maxHeight: 32, width: 180 }}
            options={(color || []).map(renderColors)}
            onSelect={handleSelectColorOption}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <CustomButton
              onPress={() => removeItem(cartItem.id || '')}
              customStyles={{
                display: 'flex',
                alignItems: 'center',
                borderColor: 'transparent',
                backgroundColor: Colors.white,
                width: plusMinusIconSize,
                height: 'auto',
              }}
            >
              <SvgIcons
                name={CUSTOM_ICON_REF.Minus}
                baseStyle={{
                  width: plusMinusIconSize,
                  height: plusMinusIconSize,
                }}
              />
            </CustomButton>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                fontWeight: 'bold',
              }}
            >
              {quantity}
            </Text>
            <CustomButton
              onPress={() => addItem(cartItem)}
              customStyles={{
                display: 'flex',
                alignItems: 'center',
                borderColor: 'transparent',
                backgroundColor: Colors.white,
                width: plusMinusIconSize,
                height: 'auto',
              }}
            >
              <SvgIcons
                name={CUSTOM_ICON_REF.Plus}
                baseStyle={{
                  width: plusMinusIconSize,
                  height: plusMinusIconSize,
                }}
              />
            </CustomButton>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {price || 0} {currency || '₴'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CartItemTile;
