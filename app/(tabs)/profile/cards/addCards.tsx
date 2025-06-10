import AddCard from "@/app-example/components/ui/profile/cards/addCard";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function AddCards() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AddCard />
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
