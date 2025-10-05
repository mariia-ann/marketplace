import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from '@/constants/Colors';
import CustomSwitch from '@/src/components/common/CustomSwitch';
import { useRouter } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AddressChooseProps {
    id?: number;
    title: string;
    address: string;
    city: string;
    codePostal: number;
    logo: any;
}

const logos: Record<string, any> = {
    novaPoshta: logoNovaPoshta,
    ukrposhta: logoUkrposhta,
};

const AddressChoose: React.FC<AddressChooseProps> = ({ id, title, address, city, codePostal, logo }) => {
    const [isDefault, setIsDefault] = useState(true);
    const router = useRouter();

    // Визначаємо логотип на основі назви
    const getLogo = () => {
        if (title.includes('Укрпошта')) {
            return logos.ukrposhta;
        }
        return logos.novaPoshta;
    };

    return (
        <ScrollView>

            <View style={styles.block}>
                <Text style={styles.labelCity}>Місто</Text>
                <TouchableOpacity
                    style={styles.input}
                //onPress={() => navigation.navigate('ChooseCityScreen')}
                >
                    <Text style={styles.inputText}>{city}</Text>
                    <CaretRight size={18} weight="bold" />
                </TouchableOpacity>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Спосіб доставки</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => router.push({
                        pathname: "/(tabs)/profile/addresses/changeAddress/deliveryMethod",
                        params: {
                            id: id?.toString() || '',
                            title,
                            address,
                            city,
                            codePostal: codePostal.toString(),
                        }
                    })}
                >
                    <View style={styles.deliveryRow}>
                        <Image source={getLogo()} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.inputText}>{title}</Text>
                    </View>
                    <CaretRight size={18} weight="bold" />

                </TouchableOpacity>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Відділення</Text>
                <TouchableOpacity
                    style={styles.input}
                //onPress={() => navigation.navigate('ChooseBranchScreen')}
                >
                    <Text
                        style={styles.inputText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {address}
                    </Text>
                    <CaretRight size={18} weight="bold" />
                </TouchableOpacity>
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Встановити як адресу доставки за замовчуванням</Text>
                <CustomSwitch
                    value={isDefault}
                    onToggle={() => setIsDefault(!isDefault)}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    block: {
        marginBottom: 16,
    },
    labelCity: {
        fontFamily: 'Manrope',
        fontSize: 18,
        color: Colors.blackMain,
        marginBottom: 12,
    },
    label: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
        marginBottom: 12,
    },
    input: {
        height: 48,
        borderRadius: 10,
        borderColor: Colors.grey400,
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
        flex: 1,
        paddingRight: 5,
    },
    deliveryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginBottom: 1,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 114,
    },
    switchLabel: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.blackMain,
        flex: 1,
        paddingRight: 10,
    },
});

export default AddressChoose;
