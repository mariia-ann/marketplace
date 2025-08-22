import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      style={[styles.addButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.addButtonText, textStyle]}>{title}</Text>
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
    fontFamily: "ManropeSemiBold",
  },
});

export default CustomButton;
