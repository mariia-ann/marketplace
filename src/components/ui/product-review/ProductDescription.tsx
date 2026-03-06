import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { productDetailsData } from '@/constants/product-review';
import Colors from '@/constants/Colors';

const styles = StyleSheet.create({
  featuresofProductContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 60,
  },
});

function ProductDescription() {
  return (
    <>
      <Text>{productDetailsData.productDescription}</Text>
      <View style={styles.featuresofProductContainer}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            color: Colors.blackMain,
          }}
        >
          Особливості моделі:
        </Text>
        {productDetailsData.productFeatures.map((feature, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 10,
              gap: 15,
              backgroundColor:
                index % 2 !== 0 ? Colors.purple50 : 'transparent',
            }}
          >
            <Text
              style={{
                width: '30%',
                color: Colors.grey500,
                flexWrap: 'nowrap',
              }}
              numberOfLines={1}
            >
              {feature.title}
            </Text>
            <Text
              style={{ display: 'flex', width: '65%', color: Colors.blackMain }}
            >
              {feature.data}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

export default ProductDescription;
