import { Link } from "expo-router";
import {
  Chat,
  Star,
  Storefront,
  ThumbsDown,
  ThumbsUp,
} from "phosphor-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfirmedPurchase from "./ConfirmedPurchase";
import { mockReview as review } from "./review";

export default function ReviewProductCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.infoBlock}>
          <Image style={styles.image} source={review.image} />
          <View style={styles.info}>
            <View style={styles.infoProduct}>
              <Text style={styles.text}>{review.title}</Text>
              <Text style={styles.text}>Ар. {review.articul}</Text>
            </View>
            <View style={styles.seller}>
              <Text style={styles.sellerName}>{review.seller}</Text>
              <Storefront size={32} weight="thin" color="#8E6CEF" />
            </View>
            <View style={styles.paramBlock}>
              <View style={styles.param}>
                <View style={styles.color}></View>
                <Text style={styles.paramInfo}>
                  {review.size} | {review.quantity} шт.
                </Text>
              </View>
              <Text style={styles.price}>{review.price} ₴</Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.reviewBlock}>
          <View>
            <View style={styles.infoReview}>
              <Text style={styles.name}>Катерина</Text>
              <Text style={styles.date}>19.04.2025</Text>
            </View>
            {review.confirmed && <ConfirmedPurchase />}
            <View style={styles.rating}>
              <Star size={20} color="#FFA500" weight="fill" />
              <Text style={styles.ratingText}>{review.rating}</Text>
            </View>
            <Text style={styles.response}>{review.response}</Text>
            <View style={styles.likesBlock}>
              <View style={styles.likes}>
                <ThumbsDown size={32} weight="thin" />
                <Text>0</Text>
              </View>
              <View style={styles.likes}>
                <ThumbsUp size={32} weight="thin" />
                <Text>12</Text>
              </View>
            </View>
            <View style={styles.line}></View>
          </View>
        </View>
        <View style={styles.commentsBlock}>
          <Link href='/profile/reviews/addComment'
            asChild>
            <Pressable style={styles.btnComment}>
              <Chat size={32} weight="thin" />
              <Text style={styles.text}>3</Text>
            </Pressable>
          </Link>
          <TouchableOpacity>
            <Text style={styles.comments}>Коментарі (2)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
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
    gap: 10,
    marginBottom: 12,
    paddingRight: 20,
  },
  image: {
    width: 127,
    height: 132,
    borderRadius: 8,
  },
  info: {
    gap: 6,
    flex: 1,
  },
  infoProduct: {
    gap: 6,
  },
  text: {
    fontFamily: "Manrope",
  },
  line: {
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    marginBottom: 12,
  },
  seller: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sellerName: {
    fontFamily: "ManropeSemiBold",
    fontSize: 14,
    color: "#8E6CEF",
  },
  paramBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  param: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paramInfo: {
    fontFamily: "ManropeBold",
    color: "#666666",
  },
  price: {
    fontFamily: "ManropeBold",
  },
  color: {
    width: 40,
    height: 40,
    backgroundColor: "#676A76",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#C1AEF6",
  },
  reviewBlock: {},
  infoReview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: "#666666",
  },
  date: {
    fontFamily: "Manrope",
    color: "#666666",
  },
  rating: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontFamily: "ManropeBold",
    fontSize: 16,
  },
  response: {
    fontFamily: "Manrope",
    marginBottom: 8,
  },
  likesBlock: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
    marginBottom: 8,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  commentsBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnComment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  comments: {
    color: "#8E6CEF",
    fontFamily: "ManropeBold",
    fontSize: 16,
  },
});
