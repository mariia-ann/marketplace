import Benefits from "@/src/components/ui/profile/profile/Benefits";
import DashBoard from "@/src/components/ui/profile/profile/DashBoard";
import User from "@/src/components/ui/profile/profile/User";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function ProfilePage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <User />
        <Benefits />
        <DashBoard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
});
