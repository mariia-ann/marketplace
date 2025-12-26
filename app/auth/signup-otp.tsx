// this is otp verification component which follows the signup
// and allows user to verify either email or phone number via otp
// presently only Phone verification is functional in dummy way
// email is not yet implemented in any way
import Colors from "@/constants/Colors";
import { NavigationHeader } from "@/src/components/common/NavigationHeader";
import OtpVerification from "@/src/components/ui/auth/OtpVerification";
import { RequireGuest } from "@/src/features/auth/guards";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function SignupOtpVerification() {
  return (
    <RequireGuest to="/(tabs)">
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <NavigationHeader
          title="Пройти верифікацію"
          showBack
          onBack={() => router.back()}
        />
        <OtpVerification />
      </SafeAreaView>
    </RequireGuest>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
});
