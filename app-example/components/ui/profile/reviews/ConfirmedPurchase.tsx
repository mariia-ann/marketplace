import { SealCheck } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function ConfirmedPurchase() {
  return (
    <View style={styles.confirmationRow}>
      <SealCheck size={32} weight="thin" color="#8E6CEF" />
      <Text style={styles.confirmationText}>Підтверджена покупка</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  confirmationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },
  confirmationText: {
    fontFamily: "Manrope",
    color: "#666666",
  },
})
