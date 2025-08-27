import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/src/components/common/PrimaryButton";
import SecondaryButton from "@/src/components/common/SecondaryButton";
import TextLink from "@/src/components/common/TextLink_w_arrow";
import WelcomeBackground from "@/src/components/ui/welcome_page/WelcomeBackground";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.container}>
        <View>
          <WelcomeBackground
            style={styles.welcomeBackground}
            width={350}
            height={350}
          />
        </View>
        <Text style={styles.title}>
          Вітаємо у просторі унікальних речей та натхнення!
        </Text>
        <View style={styles.buttonBlock}>
          <PrimaryButton
            title='Увійти'
            onPress={() => router.push("/auth/login")}
            size='L'
            active={true}
          />
          <SecondaryButton
            title='Зареєструватись'
            size='L'
            onPress={() => router.push("/auth/signup")}
          />
          <SecondaryButton
            title='Продовжити як гість'
            active={true}
            size='L'
            onPress={() => router.push("/(tabs)/profile")}
          />
        </View>
        <View style={styles.linkBlock}>
          <TextLink
            title='Мова застосунку українська'
            onPress={() => router.push("/(main)/choose-language")}
            decorated={true}
          />
          <TextLink
            title='Країна вашого перебування Україна'
            onPress={() => router.push("/(main)/choose-country")}
            decorated={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 44,
    gap: 24,
  },
  welcomeBackground: {
    alignSelf: "center",
  },
  title: {
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
  },
  buttonBlock: {
    flexDirection: "column",
    gap: 16,
    alignSelf: "center",
  },
  linkBlock: {
    flexDirection: "column",
    gap: 17,
    alignSelf: "center",
    alignItems: "center",
  },
});
