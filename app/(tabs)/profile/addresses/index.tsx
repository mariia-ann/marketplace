import MyAddress from "@/src/components/ui/profile/address/MyAddress";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Addresses() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <MyAddress />
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
