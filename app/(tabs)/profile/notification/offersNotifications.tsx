import OffersAndNotificationsList from "@/app-example/components/ui/profile/notifications/notificationsList";
import { SafeAreaView, StyleSheet } from "react-native";

export default function OffersAndNotifications() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <OffersAndNotificationsList />
    </SafeAreaView>
  );
}

//todo: remove this styles becasue removed scrollview because it was not needed, FlatList already has scroll functionality
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
