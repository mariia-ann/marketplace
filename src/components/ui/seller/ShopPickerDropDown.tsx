import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
export type ShopPickerDropDownProps = {
  backgroundColor: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function ShopPickerDropDown(props: ShopPickerDropDownProps) {
  return (
    <View
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <View style={styles.side}>{props.leftIcon}</View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.side}>{props.rightIcon}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
});
