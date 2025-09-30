import ReviewAboutSeller from "@/src/components/ui/profile/reviews/ReviewAboutSeller";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function SellerReviews() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ReviewAboutSeller />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 19,
    paddingBottom: 56,
  },
});
