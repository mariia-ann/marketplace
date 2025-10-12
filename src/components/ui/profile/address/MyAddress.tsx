import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AddressCard from './AddressCard';
;

type Address = {
  id: number;
  title: string;
  address: string;
  city: string;
  codePostal: number;
  logoKey: string;
};

const logos: Record<string, any> = {
  novaPoshta: logoNovaPoshta,
  ukrposhta: logoUkrposhta,
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 1,
    title: "Відділення Нова Пошта",
    address: "Нова Пошта №131: проспект академіка Палладіна, б. 36",
    city: "Київ",
    codePostal: 3131,
    logoKey: "novaPoshta",
  },
  {
    id: 2,
    title: "Нова Пошта",
    address: "проспект Вернадського, б. 36",
    city: "Київ",
    codePostal: 4211,
    logoKey: "novaPoshta",
  },
  {
    id: 3,
    title: "Кур'єр Нова Пошта",
    address: "проспект Вернадського, б. 36",
    city: "Київ",
    codePostal: 4211,
    logoKey: "novaPoshta",
  },
];

export default function MyAddress() {
  const { deletedId, updatedId, updatedTitle, updatedLogo } = useLocalSearchParams<{
    deletedId?: string;
    updatedId?: string;
    updatedTitle?: string;
    updatedLogo?: string;
  }>();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [activeSwitchIndex, setActiveSwitchIndex] = useState<number | null>(null);

  // видалення по id
  useEffect(() => {
    if (deletedId) {
      setAddresses(prev => prev.filter((item) => item.id !== Number(deletedId)));
    }
  }, [deletedId]);

  // оновлення адреси при зміні способу доставки
  useEffect(() => {
    if (updatedId && updatedTitle && updatedLogo) {
      setAddresses(prev =>
        prev.map(item =>
          item.id === Number(updatedId)
            ? { ...item, title: updatedTitle, logoKey: updatedLogo }
            : item
        )
      );
    }
  }, [updatedId, updatedTitle, updatedLogo]);

  const handleSwitchToggle = (index: number) => {
    setActiveSwitchIndex(prev => (prev === index ? null : index));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        {addresses.map((addr, index) => (
          <AddressCard
            key={addr.id}
            id={addr.id}
            title={addr.title}
            address={addr.address}
            city={addr.city}
            codePostal={addr.codePostal}
            logo={logos[addr.logoKey]}
            active={activeSwitchIndex === index}
            onPress={() => handleSwitchToggle(index)}
            isSwitchEnabled={activeSwitchIndex === index}
            onToggleSwitch={() => handleSwitchToggle(index)}
          />
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => router.push("/(tabs)/profile/addresses/addNewAddress")}
        >
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
    fontFamily: 'ManropeBold',
    fontWeight: 700,
  },
})