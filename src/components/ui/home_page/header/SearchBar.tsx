import React from "react";
import { View, Image, TextInput, StyleSheet, TextStyle, ViewStyle } from "react-native";

type Props = {
  baseStyleInput?: TextStyle;
  baseContainerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  value?: string;
};

function SearchBar(props: Props) {
  const { baseStyleInput, baseContainerStyle, onChangeText, value } = props;

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: "#000000",
      backgroundColor: "#fff",
    },

    input: {
      width: baseStyleInput?.width || 180,
      fontFamily: "SFProText-Regular",
      fontWeight: "400",
      fontSize: 13,
      lineHeight: 19.5,
      letterSpacing: -0.13,
      color: "rgba(0, 0, 0, 0.4)",
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    logo: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
  });

  return (
    <View style={[styles.container, baseContainerStyle]}>
      <Image
        source={require("@/assets/images/home_page/header_image/search.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Search for item"
        placeholderTextColor="#aaa"
        autoCorrect={false}
        onChangeText={onChangeText}
        value={value}
      />
      <Image
        source={require("@/assets/images/home_page/header_image/camera.png")}
        style={styles.logo}
      />
    </View>
  );
}

export default SearchBar;