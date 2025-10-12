import logoNovaPost from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from '@/constants/Colors';
import CustomSwitch from '@/src/components/common/CustomSwitch';
import { useLocalSearchParams, useRouter } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddNewAddress = () => {
    const router = useRouter();
    const { title, city: paramCity } = useLocalSearchParams<{
        title?: string;
        city?: string;
    }>();

    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>('');
    const [isDefault, setIsDefault] = useState(true);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');

    // Обробляємо параметри з навігації
    useEffect(() => {
        if (title) {
            setSelectedDeliveryMethod(title);
        }
        if (paramCity) {
            setCity(paramCity);
        }
    }, [title, paramCity]);

    const logos: Record<string, any> = {
        novaPoshta: logoNovaPost,
        ukrposhta: logoUkrposhta,
    };

    // Визначаємо логотип на основі вибраного методу доставки
    const getLogo = () => {
        if (selectedDeliveryMethod.includes('Укрпошта')) {
            return logos.ukrposhta;
        }
        return logos.novaPoshta;
    };

    // Визначаємо назву поля та placeholder залежно від методу доставки
    const getThirdFieldConfig = () => {
        if (selectedDeliveryMethod === 'Відділення Нова Пошта' || selectedDeliveryMethod === 'Відділення Укрпошта') {
            return {
                title: 'Відділення',
                placeholder: 'Оберіть номер відділення',
                type: 'select'
            };
        } else if (selectedDeliveryMethod === 'Поштомат Нова Пошта') {
            return {
                title: 'Поштомат',
                placeholder: 'Оберіть поштомат',
                type: 'select'
            };
        } else if (selectedDeliveryMethod === 'Кур\'єр Нова Пошта') {
            return {
                title: 'Вулиця',
                placeholder: 'Введіть вулицю',
                type: 'input'
            };
        }
        return null;
    };

    const handleDeliveryMethodSelect = () => {
        router.push({
            pathname: "/(tabs)/profile/addresses/changeAddress/deliveryMethod",
            params: {
                id: '',
                title: selectedDeliveryMethod,
                address: '',
                city,
                codePostal: '',
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 62 }} style={styles.container}>
            {/* Поле Місто */}
            <View style={styles.block}>
                <Text style={styles.labelCity}>Місто</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {/* Navigate to city selection */ }}
                >
                    <Text style={city ? styles.inputText : styles.placeholderText}>
                        {city || 'Оберіть місто'}
                    </Text>
                    <CaretRight size={18} weight="bold" />
                </TouchableOpacity>
            </View>

            {/* Поле Спосіб доставки */}
            <View style={styles.block}>
                <Text style={styles.label}>Спосіб доставки</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={handleDeliveryMethodSelect}
                >
                    <View style={styles.deliveryRow}>
                        {selectedDeliveryMethod && (
                            <Image source={getLogo()} style={styles.logo} resizeMode="contain" />
                        )}
                        <Text style={selectedDeliveryMethod ? styles.inputText : styles.placeholderText}>
                            {selectedDeliveryMethod || 'Оберіть спосіб доставки'}
                        </Text>
                    </View>
                    <CaretRight size={18} weight="bold" />
                </TouchableOpacity>
            </View>

            {/* Динамічні поля залежно від вибраного методу доставки */}
            {getThirdFieldConfig() && (
                <View style={styles.block}>
                    <Text style={styles.label}>{getThirdFieldConfig()?.title}</Text>
                    {getThirdFieldConfig()?.type === 'input' ? (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder={getThirdFieldConfig()?.placeholder}
                                placeholderTextColor={Colors.grey400}
                                value={street}
                                onChangeText={setStreet}
                            />

                            <View style={styles.rowInputs}>
                                <View style={styles.halfInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Введіть номер"
                                        placeholderTextColor={Colors.grey400}
                                        value={building}
                                        onChangeText={setBuilding}
                                    />
                                </View>
                                <View style={styles.halfInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Введіть номер"
                                        placeholderTextColor={Colors.grey400}
                                        value={apartment}
                                        onChangeText={setApartment}
                                    />
                                </View>
                            </View>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.input}>
                            <Text style={styles.placeholderText}>
                                {getThirdFieldConfig()?.placeholder}
                            </Text>
                            <CaretRight size={18} weight="bold" />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Перемикач за замовчуванням - показується тільки після вибору способу доставки */}
            {selectedDeliveryMethod && (
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Встановити як адресу доставки за замовчуванням</Text>
                    <CustomSwitch
                        value={isDefault}
                        onToggle={() => setIsDefault(!isDefault)}
                    />
                </View>
            )}

            {/* Відступ для кнопок, якщо перемикач не показується */}
            {!selectedDeliveryMethod && <View style={styles.spacerForButtons} />}

            {/* Кнопки */}
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity style={styles.cancelButton}
                    onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Відхилити</Text>
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
        backgroundColor: Colors.white,
        flex: 1,
    },
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
    placeholderText: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.grey400,
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
    rowInputs: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 20,
    },
    halfInput: {
        flex: 1,
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
    spacerForButtons: {
        marginTop: 24,
        marginBottom: 114,
    },
    buttonsWrapper: {
        gap: 8,
    },
    cancelButton: {
        height: 52,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.softPurple,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
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
});

export default AddNewAddress;