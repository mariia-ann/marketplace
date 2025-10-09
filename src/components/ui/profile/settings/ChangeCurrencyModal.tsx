import { currencies, CurrencyType } from "@/constants/currencies";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChangeCurrencyModalProps = {
  onSelect: (currency: typeof currencies[number]) => void;
  initialSelectedId: number;
};

const ChangeCurrencyModal: React.FC<ChangeCurrencyModalProps> = ({ onSelect, initialSelectedId }) => {
  const [selectedId, setSelectedId] = useState<number>(initialSelectedId);

  useEffect(() => {
    setSelectedId(initialSelectedId);
  }, [initialSelectedId]);

  const handleSelect = (currency: CurrencyType) => {
    setSelectedId(currency.id);
    onSelect(currency);
  };

  return (
    <View>
      {currencies.map((currency) => (
        <TouchableOpacity
          key={currency.id}
          style={styles.currencyContainer}
          onPress={() => handleSelect(currency)}
        >
          <View style={styles.radioWrapper}>
            <View style={[selectedId === currency.id && styles.radioCircle]} />
          </View>
        
            <Text style={styles.countryText}>{currency.type}</Text>
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChangeCurrencyModal;

const styles = StyleSheet.create({
  currencyContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
    width: "100%",
    paddingVertical: 10
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
  countryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center"
  },
  countryText: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
});