import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CustomSwitchProps {
  value: boolean;
  onToggle: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.switchContainer,
        { backgroundColor: value ? "#8E6CEF" : "#fff" },
      ]}
    >
      <View
        style={[
          styles.circle,
          value && styles.activeCircle,
          { backgroundColor: value ? "#fff" : "#8E6CEF" },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 29,
    height: 20,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#8E6CEF",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    // transition: "all 0.3s",
  },
  activeCircle: {
    alignSelf: "flex-end",
    // backgroundColor: "#8E6CEF",
  },
});

export default CustomSwitch;
