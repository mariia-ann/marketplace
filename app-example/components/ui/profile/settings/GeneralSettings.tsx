import { Link } from "expo-router";
import { CaretRight, Lock } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";

export default function GeneralSettings() {
  return (
    <View style={styles.block}>
      <Link href="/">
        <View style={styles.link}>
          <Text style={styles.text}>Країна</Text>
          <CountryFlag isoCode="ua" size={32} />
        </View>
      </Link>
      {/* <Link href="/"> */}
        <View style={styles.link}>
          <Text style={styles.text}>Мова</Text>
          <Text style={styles.textTr}>Українська</Text>
        </View>
      {/* </Link> */}
      {/* <Link href="/"> */}
        <View style={styles.link}>
          <Text style={styles.text}>Валюта</Text>
          <Text style={styles.textTr}>грн</Text>
        </View>
      {/* </Link> */}
      <Link href={{ pathname: "/profile/settings/notificationSettings" }}>
        <View style={styles.link}>
          <Text style={styles.text}>Налаштування сповіщень</Text>
          <CaretRight size={18} weight="bold" />
        </View>
      </Link>
      <Link href={{ pathname: "/profile/settings/changePassword" }}>
        <View style={styles.link}>
          <View style={styles.changePassword}>
            <Lock size={32} weight="thin" />
            <Text style={styles.text}>Змінити пароль</Text>
          </View>
          <CaretRight size={18} weight="bold" />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 16,
  },
  link: {
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15, // приблизно відповідає #00000026
    shadowRadius: 15,
    elevation: 5,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
  changePassword: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  textTr: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: '#999999',
  }
});
