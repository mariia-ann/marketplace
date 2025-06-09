import ReviewProductCard from "@/app-example/components/ui/profile/reviews/ReviewProductCard";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function ProductReviews() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
            <ReviewProductCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 24,
    paddingBottom: 56,
  },
});
