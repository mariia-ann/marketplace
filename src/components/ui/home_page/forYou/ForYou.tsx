import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HorizontalProductList from "./HorizontalProductList";
// import HorizontalProductList from '@/components/ui/home_page/forYou/HorizontalProductList';
// import { ThemedText } from '@/components/ThemedText';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>For you</Text>
      <HorizontalProductList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {
    color: "black",
    marginBottom: 8,
    paddingHorizontal: 21,
  },
});
