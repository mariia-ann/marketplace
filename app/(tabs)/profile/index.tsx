import Benefits from "@/src/components/ui/profile/profile/Benefits";
import DashBoard from "@/src/components/ui/profile/profile/DashBoard";
import User from "@/src/components/ui/profile/profile/User";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

export default function ProfilePage() {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
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
    paddingHorizontal: 20,
  },
});
