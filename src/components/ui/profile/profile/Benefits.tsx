import { StyleSheet, Text, View } from "react-native";
import { PiggyBank, UsersThree } from "phosphor-react-native";

// заглушка
const bonusCount = 54;
const subscriptionsCount = 28;

const formatCount = (num: number) => {
  if (num >= 1_000_000) {
    return `${Math.floor(num / 1_000_000)}м`;
  }
  if (num >= 1_000) {
    return `${Math.floor(num / 1_000)}т`;
  }
  return num.toString();
};

export default function Benefits() {
  return (
    <View style={styles.benefitsBlock}>
      <View style={styles.benefits}>
        <PiggyBank size={32} weight="thin" color="#8E6CEF" />
        <Text style={styles.text}>Бонуси ({formatCount(bonusCount)} ₴)</Text>
      </View>
      <View style={styles.benefits}>
        <UsersThree size={32} weight="thin" color="#8E6CEF" />
        <Text style={styles.text}>
          Підписки ({formatCount(subscriptionsCount)})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  benefitsBlock: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8E6CEF",
    paddingBottom: 16,
  },
  benefits: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#8E6CEF",
    marginLeft: 6,
    fontSize: 16,
    // fontFamily: 'OutfitBold',
    fontWeight: 700,
  },
});
