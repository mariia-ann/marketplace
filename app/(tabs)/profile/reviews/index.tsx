import ReviewTabs from "@/src/components/ui/profile/reviews/ReviewTabs";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import ProductReviews from "./products";
import SellerReviews from "./sellers";

export default function MyReviews() {
  const [tab, setTab] = useState<"products" | "sellers">("products");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ReviewTabs activeTab={tab} onTabChange={setTab} />
        {tab === "products" ? <ProductReviews /> : <SellerReviews />}
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
