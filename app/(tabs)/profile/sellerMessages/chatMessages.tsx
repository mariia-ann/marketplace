import Messages from "@/src/components/ui/profile/sellerMessages/Messages";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function chatMessages() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Messages />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
