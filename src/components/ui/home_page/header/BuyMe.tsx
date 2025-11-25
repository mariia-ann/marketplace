import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function BuyMe() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/home_page/header_image/BuyMe.png")}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => console.log("mail")}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 52,
    marginBottom: -16,
  },
  logo: {
    width: 50,
    height: 24,
    resizeMode: "contain",
  },
});
