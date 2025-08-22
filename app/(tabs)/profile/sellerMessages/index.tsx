import SellerMessages from "@/src/components/ui/profile/sellerMessages/SellerMessages";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function SellerMessage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <SellerMessages />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
