import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Notification() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/home_page/header_image/bell.png")}
        style={styles.logo}
      />
      <TouchableOpacity onPress={() => console.log("bell")}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
