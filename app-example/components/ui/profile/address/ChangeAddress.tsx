import CustomSwitch from '@/app-example/components/CustomSwitch';
import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import { Link } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const ChangeAddress = () => {
    const [isDefault, setIsDefault] = useState(true);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 62 }} style={styles.container}>
            <View style={styles.block}>
                <Text style={styles.labelCity}>Місто</Text>
                <TouchableOpacity
                    style={styles.input}
                //onPress={() => navigation.navigate('ChooseCityScreen')}
                >
                    <Text style={styles.inputText}>Київ</Text>
                    <CaretRight size={18} weight="bold" />
                </TouchableOpacity>
            </View>

            <Link href="/(tabs)/profile/addresses/changeAddress/deliveryMethod" asChild>
                <View style={styles.block}>
                    <Text style={styles.label}>Спосіб доставки</Text>
                    <TouchableOpacity
                        style={styles.input}
                    >
                        <View style={styles.deliveryRow}>
                            <Image source={logoNovaPoshta} style={styles.logo} resizeMode="contain" />
                            <Text style={styles.inputText}>Відділення Нова Пошта</Text>
                        </View>
                        <CaretRight size={18} weight="bold" />
                    </TouchableOpacity>
                </View>
            </Link>

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
                        Відділення №131 (до 30 кг) : просп. Палладіна, 46
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

            <View style={styles.buttonsWrapper}>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Видалити</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>Зберегти</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        backgroundColor: '#fff',
        flex: 1,
    },
    block: {
        marginBottom: 16,
    },
    labelCity: {
        fontFamily: 'Manrope',
        fontSize: 18,
        color: '#170F2B',
        marginBottom: 12,
    },
    label: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: '#170F2B',
        marginBottom: 12,
    },
    input: {
        height: 48,
        borderRadius: 10,
        borderColor: '#999999',
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: '#170F2B',
        flex: 1,
        paddingRight: 5,
    },
    arrow: {
        marginLeft: 10,
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
        marginBottom: 32,
    },
    switchLabel: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: '#170F2B',
        flex: 1,
        paddingRight: 10,
    },
    buttonsWrapper: {
        gap: 8,
    },
    deleteButton: {
        height: 52,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8E6CEF',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        //fontFamily: 'Outfit-Bold',
        fontWeight: 700,
        fontSize: 16,
        color: '#170F2B',
    },
    saveButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: '#8E6CEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveText: {
        //fontFamily: 'Outfit-Bold',
        fontWeight: 700,
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default ChangeAddress;
