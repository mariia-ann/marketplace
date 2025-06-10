import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddCard() {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Номер картки</Text>
        <TextInput
          style={styles.input}
          placeholder='Введіть номер картки'
          keyboardType='numeric'
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.label}>Термін дії</Text>
          <TextInput
            style={styles.input}
            placeholder='mm/yy'
            keyboardType='numeric'
          />
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder='***'
            keyboardType='numeric'
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Додати картку</Text>
      </TouchableOpacity>
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
  inputGroup: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "Manrope-Regular",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Manrope-Regular",
    color: "#170F2B",
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
