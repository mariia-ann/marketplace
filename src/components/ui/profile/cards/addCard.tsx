import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleCardNumberChange = (text: string) => {
    // 1) remove non-digits
    let digits = text.replace(/\D/g, "");
    // 2) limit to 16 digits
    if (digits.length > 16) digits = digits.slice(0, 16);
    // 3) insert a space every 4 digits
    const groups = digits.match(/.{1,4}/g) || [];
    const formatted = groups.join(" ");
    setCardNumber(formatted);
  };

  // Function to handle changes in the expiry date input
  // It formats the input to mm/yy format and limits the length to 4 digits
  const handleExpiryDateChange = (text: string) => {
    let digits = text.replace(/\D/g, "");
    if (digits.length > 4) digits = digits.slice(0, 4);
    if (digits.length > 2) {
      digits = digits.slice(0, 2) + "/" + digits.slice(2);
    }
    setExpiry(digits);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Номер картки</Text>
            <TextInput
              style={styles.input}
              placeholder='0000 0000 0000 0000'
              placeholderTextColor='#999999'
              keyboardType='number-pad'
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              maxLength={19}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.field}>
                <Text style={styles.label}>Термін дії</Text>
                <TextInput
                  style={[styles.input, styles.expiryDate]}
                  value={expiry}
                  onChangeText={handleExpiryDateChange}
                  placeholder='mm/yy'
                  keyboardType='number-pad'
                  placeholderTextColor='#999999'
                  maxLength={5}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={[styles.input, styles.cvv]}
                  placeholder='***'
                  keyboardType='number-pad'
                  maxLength={3}
                  placeholderTextColor='#999999'
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Додати картку</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 32,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  inputGroup: {
    marginBottom: 8,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    color: "#170F2B",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 10,
    paddingVertical: 11.5,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  expiryDate: {
    textAlign: "center",
    width: 93,
  },
  cvv: {
    width: 71,
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
});
