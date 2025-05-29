import ChangePasswordForm from "@/app-example/components/ui/profile/settings/ChangePasswordForm";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ChangePassword() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ChangePasswordForm />
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
