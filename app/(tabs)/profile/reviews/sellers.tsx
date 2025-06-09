import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SellerReviews() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
            <Text>Про продавців</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 19,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
});
