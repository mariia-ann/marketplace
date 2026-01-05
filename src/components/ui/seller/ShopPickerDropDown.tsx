import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { Check, HourglassLow, Storefront } from 'phosphor-react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export type ShopPickerDropDownProps = {
  title: string;
  backgroundColor: string;
  shops?: ShopData[];
};

export interface ShopData {
  title: string;
  image?: ImageSourcePropType;
  confirmed: boolean;
}

export default function ShopPickerDropDown(props: ShopPickerDropDownProps) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View>
      <View
        style={[styles.container, { backgroundColor: props.backgroundColor }]}
      >
        <Pressable
          style={styles.top}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <View style={styles.side}>
            <Storefront size={32} weight='thin' />
          </View>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.side}>
            {menuVisible ? (
              <Entypo name='chevron-up' size={24} color='black' />
            ) : (
              <Entypo name='chevron-down' size={24} color='black' />
            )}
          </View>
        </Pressable>
        {menuVisible ? (
          <View>
            <View style={styles.line} />
            {props.shops?.map((shop, index) => (
              <View key={index} style={styles.shopContainer}>
                <View style={styles.side}>
                  {shop.image ? (
                    <Image source={shop.image} style={styles.shopImage} />
                  ) : null}
                </View>
                <Text style={styles.title}>{shop.title}</Text>
                <View style={styles.side}>
                  {shop.confirmed ? (
                    <View style={styles.conformedIconStyle}>
                      <Check size={14} weight='bold' color={Colors.white} />
                    </View>
                  ) : (
                    <HourglassLow size={24} color={Colors.grey500} />
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
  },
  side: {
    flexShrink: 0,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: 20,
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Manrope',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    marginHorizontal: 16,
  },
  shopContainer: {
    margin: 16,
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
  },
  conformedIconStyle: {
    backgroundColor: Colors.green,
    borderRadius: 20,
    padding: 4,
  },
});
