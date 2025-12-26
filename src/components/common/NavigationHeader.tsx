import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/src/components/common/buttons/BackButton";
import Colors from "@/constants/Colors";

// Props that allow the NavigationHeader to be used standalone (outside of a native stack navigator)
type StandaloneExtras = {
  // title to display in the header
  title?: string;
  // this variable indicates whether to show the back button
  showBack?: boolean;
  onBack?: () => void;
  customStyles?: object;
};

// This element should be used as a header in stack navigator and in standalone pages
type NavigationHeaderProps = Partial<NativeStackHeaderProps> & StandaloneExtras;

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  route,
  options,
  back,
  navigation,
  title,
  onBack,
  customStyles,
  showBack = true,
}) => {
  const router = useRouter();

  const canGoBackFromStack = !!back || navigation?.canGoBack?.() === true;

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
      return;
    }
    if (navigation && canGoBackFromStack) {
      navigation.goBack();
      return;
    }
    router.back();
  };

  const resolvedTitle = title ?? options?.title ?? route?.name ?? "";

  return (
    <SafeAreaView edges={["top"]} style={{ ...customStyles, ...styles.header }}>
      {/* Left */}
      <View style={styles.sideLeft}>
        {showBack ? <BackButton onClick={handleBack} /> : null}
      </View>
      {/* Center */}
      <View style={styles.center}>
        <Text style={styles.title} accessibilityRole="header">
          {resolvedTitle}
        </Text>
      </View>
      {/* Right - spacer */}
      <View style={styles.sideRight} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideLeft: {
    height: 40,
    width: 48,
    justifyContent: "center",
    paddingRight: 8,
  },
  sideRight: {
    width: 48,
    height: 40,
    justifyContent: "center",
    paddingLeft: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Manrope",
    textAlign: "center",
    color: Colors.blackMain,
  },
});
