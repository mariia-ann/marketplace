import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import SvgIcons from "./SvgIcons/SvgIcons";
import { CUSTOM_ICON_REF } from "./SvgIcons/IconRef";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  customStyles?: any;
  customTextStyles?: any;
  whiteTheme?: boolean;
  children?: React.ReactNode;
};
const CustomButton: FC<CustomButtonProps> = ({ title, onPress, customStyles, whiteTheme, customTextStyles, children }) => {

  const styles = StyleSheet.create({
  addButton: {
    backgroundColor: whiteTheme ? "#fff" : "#8E6CEF",
    borderColor: "#8E6CEF",
    borderWidth: 1,
    height: 52,
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  addButtonText: {
    color: whiteTheme ? "" : "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "ManropeSemiBold",
  },
});

const iconStyle = {
	width: 24,
	height: 24,
  color: "#fff",
}

  return (
    <Pressable style={{...styles.addButton, ...customStyles}} onPress={onPress}>
      <Text style={{...styles.addButtonText, ...customTextStyles}}>{title}</Text>
      {children}
    </Pressable>
  );
};

export default CustomButton;
