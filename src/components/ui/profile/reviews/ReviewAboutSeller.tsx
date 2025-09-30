import Colors from "@/constants/Colors";
import { mockReviewSeller as review } from "@/src/types/review";
import { formatNumber } from "@/src/utils/formatNumber";
import { formatRating } from "@/src/utils/formatRating";
import { truncateText } from "@/src/utils/truncateText";
import { CaretRight, Star } from "phosphor-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ConfirmedPurchase from "./ConfirmedPurchase";

export default function ReviewAboutSeller() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.infoBlock}>
          <Text style={styles.textNumber}>№ {formatNumber(review.number)}</Text>
          <Text style={styles.textDate}>{review.date}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockSeller}>
          <View style={styles.blockSellerDetail}>
            <Text style={styles.textKey}>
              Продавець: <Text style={styles.textValue}>{review.seller}</Text>
            </Text>
            <CaretRight
              size={14}
              weight='bold'
              color={Colors.softPurple}
            />
          </View>
          <View style={styles.blockSellerDetail}>
            <Text style={styles.textKey}>
              Товар:{" "}
              <Text style={styles.textValue}>
                {truncateText(review.product)}
              </Text>
            </Text>
            <CaretRight
              size={14}
              weight='bold'
              color={Colors.softPurple}
            />
          </View>
          <View>{!review.confirmed && <ConfirmedPurchase />}</View>
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockComment}>
          <Text style={styles.textComment}>{review.comment}</Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.blockRating}>
          <View style={styles.blockRatingDetail}>
            <Text style={styles.textRatingName}>Актуальна ціна:</Text>
            <View style={styles.ratingSection}>
              <Star
                size={20}
                color={Colors.yellow}
                weight='fill'
              />
              <Text style={styles.rating}>
                {formatRating(review.ratingPrice)}
              </Text>
            </View>
          </View>

          <View style={styles.blockRatingDetail}>
            <Text style={styles.textRatingName}>Актуальний опис товару:</Text>
            <View style={styles.ratingSection}>
              <Star
                size={20}
                color={Colors.yellow}
                weight='fill'
              />
              <Text style={styles.rating}>
                {formatRating(review.ratingDesc)}
              </Text>
            </View>
          </View>

          <View style={styles.blockRatingDetail}>
            <Text style={styles.textRatingName}>
              Актуальна наявність товару:
            </Text>
            <View style={styles.ratingSection}>
              <Star
                size={20}
                color={Colors.yellow}
                weight='fill'
              />
              <Text style={styles.rating}>
                {formatRating(review.ratingAvialability)}
              </Text>
            </View>
          </View>

          <View style={styles.blockRatingDetail}>
            <Text style={styles.textRatingName}>
              Дотримання термінів доставки:
            </Text>
            <View style={styles.ratingSection}>
              <Star
                size={20}
                color={Colors.yellow}
                weight='fill'
              />
              <Text style={styles.rating}>
                {formatRating(review.ratingDeliveryDeadlines)}
              </Text>
            </View>
          </View>

          <View style={styles.blockRatingDetail}>
            <Text style={styles.textRatingNameBold}>Рекомендація:</Text>
            <View style={styles.ratingSection}>
              <Star
                size={20}
                color={Colors.yellow}
                weight='fill'
              />
              <Text style={styles.rating}>
                {formatRating(review.ratingRecommended)}
              </Text>
            </View>
          </View>
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
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    marginBottom: 16,
  },
  textNumber: {
    fontFamily: "ManropeSemiBold",
    fontSize: 16,
    color: Colors.grey500,
  },
  textDate: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: Colors.grey500,
  },
  textKey: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: Colors.grey500,
  },
  textValue: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.softPurple,
  },
  blockSeller: {
    gap: 8,
    marginBottom: 8,
  },
  blockSellerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blockComment: {
    marginBottom: 16,
  },
  textComment: {
    fontFamily: "ManropeBold",
    fontSize: 14,
    color: Colors.blackMain,
  },
  blockRating: {
    gap: 16,
  },
  blockRatingDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRatingName: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: Colors.blackMain,
  },
  textRatingNameBold: {
    fontFamily: "ManropeBold",
    fontSize: 14,
    color: Colors.blackMain,
  },
  ratingSection: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  rating: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.blackMain,
  },
});
