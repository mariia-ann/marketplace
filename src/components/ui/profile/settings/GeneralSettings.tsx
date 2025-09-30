import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { CaretRight, Lock, XCircle } from "phosphor-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import Modal from "react-native-modal";
import ChangeCountryModal from "./ChangeCountryModal";


export default function GeneralSettings() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModalCountry = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={toggleModalCountry}>
        <View style={styles.link}>
          <Text style={styles.text}>Країна</Text>
          <CountryFlag isoCode="ua" size={32} />
        </View>
      </Pressable>
      {/* <Link href="/"> */}
      <View style={styles.link}>
        <Text style={styles.text}>Мова</Text>
        <Text style={styles.textTr}>Українська</Text>
      </View>
      {/* </Link> */}
      {/* <Link href="/"> */}
      <View style={styles.link}>
        <Text style={styles.text}>Валюта</Text>
        <Text style={styles.textTr}>грн</Text>
      </View>
      {/* </Link> */}
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

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={toggleModalCountry}
            style={styles.closeModal}
          >
            <XCircle size={32} weight="thin" />
          </TouchableOpacity>
          <Text style={styles.titleModal}>Країна</Text>

          <View>
            <ChangeCountryModal />
          </View>

          <TouchableOpacity
            onPress={toggleModalCountry}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmText}>Застосувати</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modal: {
    backgroundColor: Colors.white,
    position: "relative",
    paddingHorizontal: 30,
    paddingVertical: 24,
    borderRadius: 16,
  },
  closeModal: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  titleModal: {
    fontFamily: "Manrope",
    fontSize: 22,
    color: Colors.blackMain,
    marginBottom: 24,
  },

  confirmButton: {
    height: 41,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: Colors.softPurple,
    borderWidth: 1,
    marginTop: 16
  },
  confirmText: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.softPurple,
  },
});

