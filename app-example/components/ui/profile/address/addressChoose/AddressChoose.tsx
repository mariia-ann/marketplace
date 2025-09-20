import CustomSwitch from '@/app-example/components/CustomSwitch';
import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AddressChooseProps {
    title: string;
    address: string;
    city: string;
    codePostal: number;
    logo: any;
}

const AddressChoose: React.FC<AddressChooseProps> = ({ title, address, city, codePostal }) => {
    const [isDefault, setIsDefault] = useState(true);
    const router = useRouter();

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
                    onPress={() => router.push("/(tabs)/profile/addresses/changeAddress/deliveryMethod")}
                >
                    <View style={styles.deliveryRow}>
                        <Image source={logoNovaPoshta} style={styles.logo} resizeMode="contain" />
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
