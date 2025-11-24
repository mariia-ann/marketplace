import Colors from "@/constants/Colors";
import { Answer } from "@/src/types/Answer";
import { ArrowBendDownRight } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

interface AnswersProps {
  answers: Answer[];
}

export default function Answers({ answers }: AnswersProps) {
  return (
    <View style={styles.answers}>
      {answers.map((answer, index) => (
        <View key={index}>
          <View style={styles.blockDataSeller}>
            <View style={styles.arrowSeller}>
              <ArrowBendDownRight size={32} weight="thin" />
              <Text style={styles.sellerName}>{answer.author}</Text>
            </View>
            <Text style={styles.dateComment}>{answer.date}</Text>
          </View>
          <View style={{ paddingLeft: 32 }}>
            <Text style={styles.textComment}>{answer.answer}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  answers: {
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
  },
});
