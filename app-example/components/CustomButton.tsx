import React, { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  customStyles?: any;
};
const CustomButton: FC<CustomButtonProps> = ({ title, onPress, customStyles }) => {
  return (
    <Pressable style={{...styles.addButton, ...customStyles}} onPress={onPress}>
      <Text style={styles.addButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#8E6CEF",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'ManropeSemiBold'
  },
});

export default CustomButton;
