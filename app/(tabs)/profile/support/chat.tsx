import ChatSupport from "@/src/components/ui/profile/support/ChatSupport";
import { SafeAreaView, StyleSheet } from "react-native";
export default function Chat() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatSupport />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
