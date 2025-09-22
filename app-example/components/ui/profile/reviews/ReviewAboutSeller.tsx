import Colors from "@/constants/Colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ConfirmedPurchase from "./ConfirmedPurchase";
import { mockReviewSeller as review } from "./review";

export default function ReviewAboutSeller() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.infoBlock}>
          <Text style={styles.textNumber}>{review.number}</Text>
          <Text style={styles.textDate}>{review.date}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockSeller}>
          <Text style={styles.textNumber}>Продавець: {review.seller}</Text>
          <Text style={styles.textDate}>Товар: {review.product}</Text>
          {review.confirmed && <ConfirmedPurchase />}
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockComment}>
          <Text style={styles.textNumber}>{review.comment}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockRating}>
          <Text style={styles.textNumber}>Актуальна ціна: {review.ratingPrice}</Text>
          <Text style={styles.textNumber}>Актуальний опис товару: {review.ratingDesc}</Text>
          <Text style={styles.textNumber}>Актуальний наявність товару: {review.ratingAvialability}</Text>
          <Text style={styles.textNumber}>Дотримання термінів доставки : {review.ratingDeliveryDeadlines}</Text>
          <Text style={styles.textNumber}>Рекомендація: {review.ratingRecommended}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 56,
  },
  card: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    color: Colors.grey500,
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 16,
  },
  textNumber: {
    fontFamily: "ManropeSemiBold",
    fontSize: 16,
  },
  textDate: {
    fontFamily: "Manrope",
    fontSize: 14,
  },
  blockSeller: {},
  blockComment: {},
  blockRating: {},
});
