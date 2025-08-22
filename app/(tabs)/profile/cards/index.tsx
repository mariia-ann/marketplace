import MyCards from "@/src/components/ui/profile/cards/MyCards";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function MyCardsList() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <MyCards />
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
