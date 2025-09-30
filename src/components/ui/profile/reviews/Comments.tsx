import Colors from "@/constants/Colors";
import { Comment } from "@/src/types/Comment";
import { Link } from "expo-router";
import { ArrowBendDownRight, Chat } from "phosphor-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Answers from "./Answers";

interface CommentsProps {
  comments: Comment[];
}

export default function Comments({ comments }: CommentsProps) {
  const [isAnswersVisible, setIsAnswersVisible] = useState<boolean[]>(
    comments.map(() => false)
  );

  const handleToggleAnswers = (index: number) => {
    setIsAnswersVisible((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };
  return (
    <View style={styles.comments}>
      {comments.map((comment, index) => (
        <View key={index}>
          <View style={styles.blockDataSeller}>
            <View style={styles.arrowSeller}>
              <ArrowBendDownRight
                size={32}
                weight='thin'
              />
              <Text style={styles.sellerName}>{comment.author}</Text>
            </View>
            <Text style={styles.dateComment}>{comment.date}</Text>
          </View>

          <View style={styles.blockComment}>
            <Text style={styles.textComment}>{comment.comment}</Text>
            <View style={styles.blockAnswers}>
              <Link
                href='/profile/reviews/addAnswer'
                asChild
              >
                <Pressable>
                  <Chat
                    size={32}
                    weight='thin'
                  />
                </Pressable>
              </Link>
              <TouchableOpacity onPress={() => handleToggleAnswers(index)}>
                <Text style={styles.answers}>
                  Відповіді ({comment.answers?.length || 0})
                </Text>
              </TouchableOpacity>
            </View>
            {isAnswersVisible[index] && comment.answers && (
              <Answers answers={comment.answers} />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  comments: {
    gap: 16,
  },
  blockDataSeller: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  arrowSeller: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sellerName: {
    color: Colors.grey500,
    fontFamily: "Manrope",
    fontSize: 16,
  },
  dateComment: {
    color: Colors.grey500,
    fontFamily: "Manrope",
    fontSize: 14,
  },
  blockComment: {
    paddingLeft: 40,
  },
  answers: {
    color: Colors.softPurple,
    fontFamily: "ManropeBold",
    fontSize: 16,
  },
  textComment: {
    color: Colors.blackMain,
    fontFamily: "Manrope",
    fontSize: 14,
    marginBottom: 8,
  },
  blockAnswers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
