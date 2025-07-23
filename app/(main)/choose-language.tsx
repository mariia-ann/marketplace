import { StyleSheet, Text, View } from "react-native";

export default function ChooseLanguage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose Language</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#25292e",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#25292e",
  },
});
