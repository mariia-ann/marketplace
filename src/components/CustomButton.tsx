import React, { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  customStyles?: any;
  customTextStyles?: any;
  whiteTheme?: boolean;
  disabled?: boolean;
};
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  customStyles,
  whiteTheme,
  customTextStyles,
  disabled,
}) => {
  const isWhiteTheme = whiteTheme ? { color: "" } : {};
  return (
    <Pressable
      style={{
        ...styles.addButton,
        ...(customStyles || {}),
        ...(disabled ? { opacity: 0.5 } : {}),
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.addButtonText, ...customTextStyles }}>
        {title}
      </Text>
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
