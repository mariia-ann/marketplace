import { JSX, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
type CountryType = {
  id: number;
  country: string;
  icon: JSX.Element;
};

const initialCountries: CountryType[] = [
  {
    id: 0,
    country: "Ukraine",
    icon: <CountryFlag isoCode="ua" size={32} />,
  },
  {
    id: 1,
    country: "United Kingdom",
    icon: <CountryFlag isoCode="gb" size={32} />,
  },
];

const ChangeCountryModal = () => {
  const [selectedId, setSelectedId] = useState<number>(0);

  return (
    <View>
      {initialCountries.map((country) => (
        <TouchableOpacity
          key={country.id}
          style={styles.countryContainer}
          onPress={() => setSelectedId(country.id)}
        >
          <View style={styles.radioWrapper}>
            <View style={[selectedId === country.id && styles.radioCircle]} />
          </View>
          <View style={styles.countryInfo}>
            <Text style={styles.countryText}>{country.country}</Text>
            <View>{country.icon}</View>
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