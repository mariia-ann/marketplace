import NotificationList from "@/src/components/ui/profile/settings/NotificationSettings";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NotificationSettings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <NotificationList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 19,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
});
