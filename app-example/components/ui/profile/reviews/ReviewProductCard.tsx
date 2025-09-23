import { mockReview as review } from "@/app-example/types/review";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import {
  Chat,
  Star,
  Storefront,
  ThumbsDown,
  ThumbsUp,
} from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Comments from "./Comments";
import ConfirmedPurchase from "./ConfirmedPurchase";

export default function ReviewProductCard() {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const handleToggleComments = () => {
    setIsCommentsVisible(prev => !prev);
  }
  return (
    <ScrollView style={styles.container}>
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
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleToggleComments}>
            <Text style={styles.comments}>Коментарі ({review.comments?.length || 0})</Text>
          </TouchableOpacity>
        </View>
        {isCommentsVisible && review.comments && <Comments comments={review.comments} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    color: Colors.softPurple,
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
    color: Colors.grey500,
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
    color: Colors.grey500,
  },
  date: {
    fontFamily: "Manrope",
    color: Colors.grey500,
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
    marginBottom: 16,
  },
  btnComment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  comments: {
    color: Colors.softPurple,
    fontFamily: "ManropeBold",
    fontSize: 16,
  },
});
