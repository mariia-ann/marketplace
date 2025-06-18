import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AddCommentInputs() {
  const [email, setEmail] = useState("konnovalova@gmail.com");
  const [comment, setComment] = useState("");

  return (
    <View style={styles.inputGroup}>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Напишіть коментар</Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={[styles.input, { height: 91 }]}
          placeholder="Ваш коментар"
          placeholderTextColor="#999999"
          maxLength={2000}
          value={comment}
          onChangeText={setComment}
        />
        <Text style={styles.lengthInput}>{comment.length}/2000</Text>
      </View>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>Ваше імя</Text>
        <TextInput
          style={styles.input}
          placeholder="Катерина Коновалова"
          placeholderTextColor="#999999"
        />
      </View>
      <View style={styles.inputBlock}>
        <Text style={styles.label}>email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999999"
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
    color: "#999999",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
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
    color: "#999999",
    lineHeight: 12,
  },
});
