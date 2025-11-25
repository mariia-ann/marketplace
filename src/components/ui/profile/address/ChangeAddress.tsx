import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from "expo-router";
import { XCircle } from "phosphor-react-native";
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AddressChoose from './addressChoose/AddressChoose';

const logos: Record<string, any> = {
  novaPoshta: logoNovaPoshta,
  ukrposhta: logoUkrposhta,
};

export default function ChangeAddress() {
  const { id, title, address, city, codePostal, logo } = useLocalSearchParams<{
    id: string;
    title: string;
    address: string;
    city: string;
    codePostal: string;
    logo?: string;
  }>();

  const numericPostal = Number(codePostal);
  const router = useRouter();

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentLogo, setCurrentLogo] = useState(logo || 'novaPoshta');
  const [currentAddress, setCurrentAddress] = useState(address);

  // Оновлюємо дані при зміні параметрів
  React.useEffect(() => {
    setCurrentTitle(title);
    setCurrentLogo(logo || 'novaPoshta');
    setCurrentAddress(address);
  }, [title, logo, address]);

  const handleConfirmDelete = () => {
    setConfirmModalVisible(false);
    setSuccessModalVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessModalVisible(false);
    router.replace(`/(tabs)/profile/addresses?deletedId=${id}`);
  };

  const handleSave = () => {
    // Передаємо оновлену адресу назад до MyAddress
    router.replace(`/(tabs)/profile/addresses?updatedId=${id}&updatedTitle=${encodeURIComponent(currentTitle)}&updatedLogo=${currentLogo}&updatedAddress=${encodeURIComponent(currentAddress)}`);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 62 }} style={styles.container}>
        <AddressChoose
          id={Number(id)}
          title={currentTitle}
          address={currentAddress}
          city={city}
          codePostal={numericPostal}
          logo={logos[currentLogo]}
          onAddressChange={setCurrentAddress}
        />

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setConfirmModalVisible(true)}
          >
            <Text style={styles.deleteText}>Видалити</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Модалка підтвердження */}
      <Modal
        visible={confirmModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setConfirmModalVisible(false)}
            >
              <XCircle size={32} color="#170f2b" weight="thin" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Бажаєте видалити адресу?</Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDelete}
            >
              <Text style={styles.confirmText}>Підтвердити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модалка успіху */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseSuccess}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={handleCloseSuccess}
            >
              <XCircle size={32} color="#170f2b" weight="thin" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Адресу успішно видалено!</Text>

            <View style={styles.okButtonWrapper}>
              <TouchableOpacity onPress={handleCloseSuccess}>
                <Text style={styles.confirmText}>Ок</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: Colors.white,
    flex: 1,
  },
  buttonsWrapper: {
    gap: 8,
  },
  deleteButton: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.softPurple,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontFamily: 'ManropeBold',
    fontSize: 16,
    color: Colors.blackMain,
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.softPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    fontFamily: 'ManropeBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 45,
  },

  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
    width: '100%',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  modalText: {
    fontFamily: 'Manrope',
    fontSize: 22,
    color: Colors.blackMain,
    marginBottom: 24,
  },
  confirmButton: {
    height: 41,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderColor: Colors.softPurple,
    borderWidth: 1,
  },
  confirmText: {
    fontFamily: 'ManropeBold',
    fontSize: 16,
    color: Colors.softPurple,
  },
  okButtonWrapper: {
    alignItems: 'flex-end',
  },
});