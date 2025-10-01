import Colors from "@/constants/Colors";
import { XCircle } from "phosphor-react-native";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface ModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  buttonType?: "border" | "ok";
  buttonText?: string; // для кнопки з бордером
  onConfirm?: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isVisible,
  onClose,
  title,
  children,
  buttonType = "border",
  buttonText = "Підтвердити",
  onConfirm,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal}>
       
        <TouchableOpacity onPress={onClose} style={styles.closeModal}>
          <XCircle size={32} weight="thin" />
        </TouchableOpacity>

        <Text style={styles.titleModal}>{title}</Text>

        <View>{children}</View>

        {buttonType === "border" ? (
          <TouchableOpacity
            onPress={onConfirm || onClose}
            style={styles.borderButton}
          >
            <Text style={styles.borderButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onConfirm || onClose}
            style={styles.okButton}
          >
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
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

  borderButton: {
    height: 41,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: Colors.softPurple,
    borderWidth: 1,
    marginTop: 16,
  },
  borderButtonText: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.softPurple,
  },
  okButton: {
    alignItems: "flex-end",
  },
  okButtonText: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.softPurple,
    textTransform: "uppercase",
  },
});


// Використання:
{/* 
<ModalWrapper
  isVisible={isModalVisible}
  onClose={toggleModalCountry}
  title="Країна"
  buttonType="border"
  buttonText="Застосувати"
  onConfirm={toggleModalCountry}
>
  <ChangeCountryModal />
</ModalWrapper>

<ModalWrapper
  isVisible={isOkVisible}
  onClose={toggleOk}
  title="Успішно!"
  buttonType="ok"
>
  <Text>Ваш профіль оновлено</Text>
</ModalWrapper> 

*/}
