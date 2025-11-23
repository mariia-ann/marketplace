import logoNovaPoshta from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from '@/constants/Colors';
import CustomSwitch from '@/src/components/common/CustomSwitch';
import { useRouter } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddressChooseProps {
    id?: number;
    title: string;
    address: string;
    city: string;
    codePostal: number;
    logo: any;
    onAddressChange?: (address: string) => void;
}

const logos: Record<string, any> = {
    novaPoshta: logoNovaPoshta,
    ukrposhta: logoUkrposhta,
};

const AddressChoose: React.FC<AddressChooseProps> = ({ id, title, address, city, codePostal, logo, onAddressChange }) => {
    const [isDefault, setIsDefault] = useState(true);
    const router = useRouter();

    // Стан для полів адреси кур'єра
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');

    // Функції валідації для введення тільки цифр
    const handleBuildingChange = (text: string) => {
        const normalized = text.replace(/[^0-9a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ\/\\\-\s]/g, '');
        setBuilding(normalized);
    };
    const handleApartmentChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setApartment(numericText);
    };

    // Парсимо існуючу адресу при завантаженні
    React.useEffect(() => {
        if (title.includes('Кур') && address) {
            // Простий парсинг адреси для кур'єра
            const parts = address.split(', ');
            if (parts.length >= 1) {
                setStreet(parts[0] || '');
            }
            if (parts.length >= 2) {
                setBuilding(parts[1] || '');
            }
            if (parts.length >= 3 && parts[2].includes('кв.')) {
                setApartment(parts[2].replace('кв. ', '') || '');
            }
        }
    }, [address, title]);

    // Оновлюємо адресу при зміні полів кур'єрської доставки
    React.useEffect(() => {
        if (title.includes('Кур') && onAddressChange && street && building) {
            const newAddress = `${street}, ${building}${apartment ? ', кв. ' + apartment : ''}`.trim();
            if (newAddress !== address) {
                onAddressChange(newAddress);
            }
        }
    }, [street, building, apartment, title, onAddressChange, address]);

    // Визначаємо логотип на основі назви
    const getLogo = () => {
        if (title.includes('Укрпошта')) {
            return logos.ukrposhta;
        }
        return logos.novaPoshta;
    };

    // Визначаємо назву поля та placeholder залежно від методу доставки
    const getThirdFieldConfig = () => {
        if (title.includes('Відділення')) {
            return {
                title: 'Відділення',
                placeholder: 'Оберіть номер відділення',
                type: 'select'
            };
        } else if (title.includes('Поштомат')) {
            return {
                title: 'Поштомат',
                placeholder: 'Оберіть поштомат',
                type: 'select'
            };
        } else if (title.includes('Кур')) {
            return {
                title: 'Адреса доставки',
                placeholder: 'Введіть адресу',
                type: 'input'
            };
        }
        return {
            title: 'Відділення',
            placeholder: 'Оберіть номер відділення',
            type: 'select'
        };
    };

    return (
        <ScrollView>

            <View style={styles.block}>
                <Text style={styles.labelCity}>Місто</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => router.push({
                        pathname: "/(tabs)/profile/addresses/changeAddress/cityFields",
                        params: {
                            source: 'change',
                            id: id?.toString() || '',
                            title,
                            address,
                            city,
                            codePostal: codePostal.toString(),
                        }
                    })}
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
                {getThirdFieldConfig().type !== 'input' && (
                    <Text style={styles.label}>{getThirdFieldConfig().title}</Text>
                )}
                {getThirdFieldConfig().type === 'input' ? (
                    <>
                        <View style={styles.block}>
                            <Text style={styles.label}>Адреса доставки</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введіть вулицю"
                                placeholderTextColor={Colors.grey400}
                                value={street}
                                onChangeText={setStreet}
                            />
                        </View>

                        <View style={styles.block}>

                            <View style={styles.rowInputs}>
                                <View style={styles.thirdInput}>
                                    <Text style={styles.label}>Номер будинку</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Номер будинку"
                                        placeholderTextColor={Colors.grey400}
                                        value={building}
                                        onChangeText={handleBuildingChange}

                                    />
                                </View>
                                <View style={styles.thirdInput}>
                                    <Text style={styles.label}>Номер квартири</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Номер квартири"
                                        placeholderTextColor={Colors.grey400}
                                        value={apartment}
                                        onChangeText={handleApartmentChange}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.thirdInput}>
                                    <Text style={styles.label}>Поштовий індекс</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Поштовий індекс"
                                        placeholderTextColor={Colors.grey400}
                                        value={codePostal.toString()}
                                        editable={false}
                                        keyboardType="numeric"
                                        maxLength={6}
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            const isUkr = title.includes('Укрпошта');
                            const isDepartment = title.includes('Відділення');
                            const pathname = isDepartment
                                ? "/(tabs)/profile/addresses/changeAddress/departmentFields"
                                : "/(tabs)/profile/addresses/changeAddress/parcelFields";
                            router.push({
                                pathname,
                                params: {
                                    source: 'change',
                                    carrier: isUkr ? 'ukr' : 'nova',
                                    type: isDepartment ? 'department' : 'parcel',
                                    city,
                                    id: id?.toString() || '',
                                    title,
                                    address,
                                    codePostal: codePostal.toString(),
                                }
                            });
                        }}
                    >
                        <Text
                            style={styles.inputText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {address || getThirdFieldConfig().placeholder}
                        </Text>
                        <CaretRight size={18} weight="bold" />
                    </TouchableOpacity>
                )}
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
    rowInputs: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 10,
    },
    thirdInput: {
        flex: 1,
    },
});

export default AddressChoose;
