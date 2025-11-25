import { languages, LanguageType } from "@/constants/languages";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ChangeLanguageModalProps = {
  onSelect: (language: (typeof languages)[number]) => void;
  initialSelectedId: number;
};

const ChangeLanguageModal: React.FC<ChangeLanguageModalProps> = ({
  onSelect,
  initialSelectedId,
}) => {
  const [selectedId, setSelectedId] = useState<number>(initialSelectedId);

  useEffect(() => {
    setSelectedId(initialSelectedId);
  }, [initialSelectedId]);

  const handleSelect = (language: LanguageType) => {
    setSelectedId(language.id);
    onSelect(language);
  };

  return (
    <View>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.id}
          style={styles.languageContainer}
          onPress={() => handleSelect(language)}
        >
          <View style={styles.radioWrapper}>
            <View style={selectedId === language.id && styles.radioCircle} />
          </View>

          <Text style={styles.languageText}>{language.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChangeLanguageModal;

const styles = StyleSheet.create({
  languageContainer: {
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
  languageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  languageText: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
});
