import logoMasterCard from "@/assets/images/profile/cards/MasterCard.png";
import logoVisa from "@/assets/images/profile/cards/Visa.png";
import { Trash } from "phosphor-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface PaymentCardCardProps {
  id: number;
  cardNumber: string;
  expireMonth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  expireYear: number;
  type: "Visa" | "MasterCard";
  cvv: string;
  // Optional callback for when the card is deleted
  onDelete?: () => void;
  // Optional prop to indicate if the card is selected
  isSelected?: boolean;
}

export default function PaymentCardCard({
  cardNumber,
  expireMonth,
  expireYear,
  type,
  cvv,
  onDelete,
  isSelected,
}: PaymentCardCardProps) {
  return (
    <View style={[styles.container, isSelected && styles.activeBorder]}>
      <Image
        source={type === "Visa" ? logoVisa : logoMasterCard}
        style={styles.logo}
        resizeMode='contain'
      />
      <View style={[styles.textBox, { flex: 1 }]}>
        <Text style={styles.cardText}>{cardNumber}</Text>
        <Text style={styles.cardText}>
          {expireMonth} / {expireYear}
        </Text>
      </View>
      <Pressable onPress={onDelete}>
        <Trash
          style={styles.trashIcon}
          size={32}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  activeBorder: {
    borderWidth: 1,
    borderColor: "#8E6CEF",
  },
  logo: {
    alignSelf: "center",
    marginRight: 40,
  },
  textBox: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardText: {
    fontFamily: "Manrope",
    color: "#170F2B",
    fontSize: 16,
  },
  trashIcon: {},
});
