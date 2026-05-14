import { productDetailsData } from '@/constants/product-review';
import CustomButton from '@/src/components/common/CustomButton';
import FeedbackCards from '@/src/components/common/FeedbackCards';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React from 'react';
import { View, Text } from 'react-native';

function ProductReviews() {
  const productsReviews: any[] = productDetailsData.productsReviews || [];
  const iconbSize = 24;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <CustomButton
          onPress={() => {}}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '48%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Funnel}
            baseStyle={{
              width: iconbSize,
              height: iconbSize,
              color: '#000000',
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>Фільтр</Text>
            <Text style={{ color: '#666666' }}>не обраний</Text>
          </View>
        </CustomButton>
        <CustomButton
          onPress={() => {}}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '48%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.SlidersHorizontal}
            baseStyle={{
              width: iconbSize,
              height: iconbSize,
              color: '#000000',
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>Сортування</Text>
            <Text style={{ color: '#666666' }}>за рейтингом</Text>
          </View>
        </CustomButton>
      </View>
      <View style={{ paddingTop: 20, paddingBottom: 40 }}>
        {productsReviews?.map((review, index) => (
          <FeedbackCards key={index} {...review} />
        ))}
      </View>
    </>
  );
}

export default ProductReviews;
