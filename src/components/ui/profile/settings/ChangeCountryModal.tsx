import { countries, CountryType } from "@/constants/countries";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";

type ChangeCountryModalProps = {
  onSelect: (country: (typeof countries)[number]) => void;
  initialSelectedId: number;
};

const ChangeCountryModal: React.FC<ChangeCountryModalProps> = ({
  onSelect,
  initialSelectedId,
}) => {
  const [selectedId, setSelectedId] = useState<number>(initialSelectedId);

  useEffect(() => {
    setSelectedId(initialSelectedId);
  }, [initialSelectedId]);

  const handleSelect = (country: CountryType) => {
    setSelectedId(country.id);
    onSelect(country);
  };

  return (
    <View>
      {countries.map((country) => (
        <TouchableOpacity
          key={country.id}
          style={styles.countryContainer}
          onPress={() => handleSelect(country)}
        >
          <View style={styles.radioWrapper}>
            <View style={selectedId === country.id && styles.radioCircle} />
          </View>
          <View style={styles.countryInfo}>
            <Text style={styles.countryText}>{country.country}</Text>
            <View>
              <CountryFlag
                key={country.id}
                isoCode={country.isoCode}
                size={32}
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChangeCountryModal;

const styles = StyleSheet.create({
  countryContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
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
    alignItems: "center",
  },
  countryText: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
});
