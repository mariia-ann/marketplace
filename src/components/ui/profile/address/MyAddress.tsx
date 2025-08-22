import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import Colors from "@/constants/Colors";
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AddressCard from './AddressCard';
export default function MyAddress() {
  const [activeSwitchIndex, setActiveSwitchIndex] = useState<number | null>(null);

  const handleSwitchToggle = (index: number) => {
    setActiveSwitchIndex(prev => (prev === index ? null : index));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }}contentContainerStyle={styles.container}>

        <AddressCard
          title="Відділення Нова Пошта"
          address="Нова Пошта №131: проспект академіка Палладіна, б. 36, Київ, 03131"
          logo={<Image source={logoNovaPoshta} style={{ width: 26, height: 26 }} />}
          active={activeSwitchIndex === 0}
          onPress={() => handleSwitchToggle(0)}
          isSwitchEnabled={activeSwitchIndex === 0}
          onToggleSwitch={() => handleSwitchToggle(0)}
        />

        <AddressCard
          title="Кур’єр Нова Пошта"
          address="проспект Вернадського, б. 36, Київ, 03131"
          logo={<Image source={logoNovaPoshta} style={{ width: 26, height: 26 }} />}
          active={activeSwitchIndex === 1}
          onPress={() => handleSwitchToggle(1)}
          isSwitchEnabled={activeSwitchIndex === 1}
          onToggleSwitch={() => handleSwitchToggle(1)}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Додати нову адресу</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },

  saveButton: {
    backgroundColor: Colors.softPurple,
    height: 52,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    //fontFamily: 'OutfitBold',
    fontWeight: 700,
  },
})