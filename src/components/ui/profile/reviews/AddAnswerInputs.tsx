import Colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AddAnswerInputs() {
  const [email, setEmail] = useState("konnovalova@gmail.com");
  const [answer, setAnswer] = useState("");

  return (
    <View style={styles.inputGroup}>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Напишіть відповідь</Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={[styles.input, { height: 91 }]}
          placeholder="Ваша відповідь"
          placeholderTextColor={Colors.grey400}
          maxLength={2000}
          value={answer}
          onChangeText={setAnswer}
        />
        <Text style={styles.lengthInput}>{answer.length}/2000</Text>
      </View>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Ваше імя</Text>
        <TextInput
          style={styles.input}
          placeholder="Катерина Коновалова"
          placeholderTextColor={Colors.grey400}
        />
      </View>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={Colors.grey400}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  inputBlock: {
    // marginBottom: 16
  },
  label: {
    fontFamily: "Manrope",
    fontSize: 12,
    color: Colors.grey400,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingVertical: 11.5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  lengthInput: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 8,
    fontSize: 12,
    fontFamily: "Manrope",
    color: Colors.grey400,
    lineHeight: 12,
  },
});
