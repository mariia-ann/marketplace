import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PaymentCardCard, { PaymentCardCardProps } from "./PaymentCardCard";

const initialCards: PaymentCardCardProps[] = [
  {
    id: 0,
    cardNumber: "4111 **** 1111",
    expireMonth: 12,
    expireYear: 26,
    type: "Visa",
    cvv: "123",
  },
  {
    id: 1,
    cardNumber: "5555 **** 4444",
    expireMonth: 6,
    expireYear: 27,
    type: "MasterCard",
    cvv: "456",
  },
  {
    id: 2,
    cardNumber: "4012 **** 1881",
    expireMonth: 9,
    expireYear: 28,
    type: "Visa",
    cvv: "789",
  },
];

export default function MyCards() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cards, setCards] = useState<PaymentCardCardProps[]>(initialCards);
  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {cards.map((card) => (
          <TouchableOpacity
            style={styles.cardContainer}
            key={card.id}
            onPress={() => setSelectedId(card.id)}
          >
            <View style={styles.radioWrapper}>
              <View style={[selectedId === card.id && styles.radioCircle]} />
            </View>
            <PaymentCardCard
              {...card}
              isSelected={selectedId === card.id}
              onDelete={() => handleDelete(card.id)}
            />
          </TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.addButton}>
          <Link
            style={styles.addButtonText}
            href='/(tabs)/profile/cards/addCards'
          >
            <Text>Додати нову картку</Text>
          </Link>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginBottom: 66,
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#8E6CEF",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  radioWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#999999",
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: "#8E6CEF",
  },
});
