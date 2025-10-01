import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type LanguageType = {
  id: number;
  language: string;
};

const initialanguages: LanguageType[] = [
  {
    id: 0,
    language: "Українська",
  },
  {
    id: 1,
    language: "Англійська",
  },
];

const ChangeLanguageModal = () => {
  const [selectedId, setSelectedId] = useState<number>(0);

  return (
    <View>
      {initialanguages.map((language) => (
        <TouchableOpacity
          key={language.id}
          style={styles.countryContainer}
          onPress={() => setSelectedId(language.id)}
        >
          <View style={styles.radioWrapper}>
            <View style={[selectedId === language.id && styles.radioCircle]} />
          </View>
        
            <Text style={styles.countryText}>{language.language}</Text>
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChangeLanguageModal;

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