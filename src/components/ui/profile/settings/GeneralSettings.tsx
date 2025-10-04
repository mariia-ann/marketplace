import { Link } from "expo-router";
import { CaretRight, Lock } from "phosphor-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import ModalWrapper from "../../ModalWrapper";
import ChangeCountryModal from "./ChangeCountryModal";
import ChangeCurrencyModal from "./ChangeCurrencyModal";
import ChangeLanguageModal from "./ChangeLanguageModal";

export default function GeneralSettings() {
  const [selectedCurrency, setSelectedCurrency] = useState({
  id: 0,
  type: "Українська гривня",
  value: "грн",
});
  const [modalType, setModalType] = useState<
    "country" | "language" | "currency" | null
  >(null);

  const openModal = (type: "country" | "language" | "currency") =>
    setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <View style={styles.block}>
      <Pressable onPress={() => openModal("country")}>
        <View style={styles.link}>
          <Text style={styles.text}>Країна</Text>
          <CountryFlag isoCode="ua" size={32} />
        </View>
      </Pressable>

      <Pressable onPress={() => openModal("language")}>
        <View style={styles.link}>
          <Text style={styles.text}>Мова</Text>
          <Text style={styles.textTr}>Українська</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => openModal("currency")}>
        <View style={styles.link}>
          <Text style={styles.text}>Валюта</Text>
          <Text style={styles.textTr}>{selectedCurrency.value}</Text>
        </View>
      </Pressable>

      <Link href={{ pathname: "/profile/settings/notificationSettings" }}>
        <View style={styles.link}>
          <Text style={styles.text}>Налаштування сповіщень</Text>
          <CaretRight size={18} weight="bold" />
        </View>
      </Link>
      <Link href={{ pathname: "/profile/settings/changePassword" }}>
        <View style={styles.link}>
          <View style={styles.changePassword}>
            <Lock size={32} weight="thin" />
            <Text style={styles.text}>Змінити пароль</Text>
          </View>
          <CaretRight size={18} weight="bold" />
        </View>
      </Link>

      {/* Країна модалка */}
      <ModalWrapper
        isVisible={modalType === "country"}
        onClose={closeModal}
        title="Країна"
        buttonType="border"
        buttonText="Застосувати"
        onConfirm={closeModal}
      >
        <ChangeCountryModal />
      </ModalWrapper>

      {/* Вибір мови модалка */}
      <ModalWrapper
        isVisible={modalType === "language"}
        onClose={closeModal}
        title="Мова"
        buttonType="border"
        buttonText="Застосувати"
        onConfirm={closeModal}
      >
        <ChangeLanguageModal />
      </ModalWrapper>

      {/* Вибір валюти модалка */}
      <ModalWrapper
        isVisible={modalType === "currency"}
        onClose={closeModal}
        title="Валюта"
        buttonType="border"
        buttonText="Застосувати"
        onConfirm={closeModal}
      >
        <ChangeCurrencyModal
        initialSelectedId={selectedCurrency.id}
          onSelect={(currency) => {
            setSelectedCurrency(currency);
            // TODO: зберегти у redux/zustand
          }}
        />
      </ModalWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 16,
  },
  link: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
  changePassword: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  textTr: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: "#999999",
  },
});
