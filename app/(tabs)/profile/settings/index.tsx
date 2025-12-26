import Colors from "@/constants/Colors";
import GeneralSettings from "@/src/components/ui/profile/settings/GeneralSettings";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: Colors.white }}
    >
      <ScrollView
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.container}
      >
        <GeneralSettings />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
