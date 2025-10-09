import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import Colors from "@/constants/Colors";
import CustomSwitch from "@/src/components/common/CustomSwitch";
import { Link } from "expo-router";
import { PencilSimple } from "phosphor-react-native";
import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AddressCardProps {
  id: number;
  title: string;
  address: string;
  city: string;
  codePostal: number;
  logo: ImageSourcePropType;
  active: boolean;
  onPress: () => void;
  isSwitchEnabled: boolean;
  onToggleSwitch: () => void;
}
const logos = {
  novaPoshta: logoNovaPoshta,
};

export default function AddressCard({ id, title, address, city, codePostal, logo, active, onPress, isSwitchEnabled, onToggleSwitch }: AddressCardProps) {

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, (active || isSwitchEnabled) && styles.activeBorder]}
    >
      <View style={styles.header}>
        <View style={styles.logoTitle}>
          <Image source={logo} style={{ width: 26, height: 26 }} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <CustomSwitch value={isSwitchEnabled} onToggle={onToggleSwitch} />
      </View>

      <View style={styles.address}>
        <Text numberOfLines={3} style={styles.addressText}>
          {address}, {city}, {codePostal}
        </Text>
        <Link
          href={{
            pathname: "/(tabs)/profile/addresses/changeAddress",
            params: {
              id: id.toString(),
              title,
              address,
              city,
              codePostal: codePostal.toString(),
              logo: title.includes('Укрпошта') ? 'ukrposhta' : 'novaPoshta',
            },
          }}
          asChild
        >
          <Pressable>
            <PencilSimple size={24} color="#170F2B" style={styles.pencilIcon} />
          </Pressable>
        </Link>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 135,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  activeBorder: {
    borderWidth: 1,
    borderColor: Colors.softPurple,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    color: Colors.blackMain,
    marginLeft: 18,
  },
  address: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressText: {
    fontFamily: 'Manrope',
    fontSize: 16,
    color: Colors.blackMain,
    width: '75%',
  },
  pencilIcon: {
    marginRight: 10,
    marginTop: 14,
  },
});