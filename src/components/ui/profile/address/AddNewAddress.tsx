import logoNovaPost from '@/assets/images/profile/address/logoNovaPoshta.png';
import logoUkrposhta from '@/assets/images/profile/address/logoUkrposhta.png';
import Colors from '@/constants/Colors';
import CustomSwitch from '@/src/components/common/CustomSwitch';
import { useLocalSearchParams, useRouter } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddNewAddress = () => {
    const router = useRouter();
    const { title, city: paramCity, third } = useLocalSearchParams<{
        title?: string;
        city?: string;
        third?: string;
    }>();


    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>('');
    const [isDefault, setIsDefault] = useState(true);
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [apartment, setApartment] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [thirdValue, setThirdValue] = useState('');

    // Функції валідації для введення тільки цифр
    const handleBuildingChange = (text: string) => {
        const numericText = text;
        setBuilding(numericText);
    };

    const handleApartmentChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setApartment(numericText);
    };

    const handlePostalCodeChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        if (numericText.length <= 6) {
            setPostalCode(numericText);
        }
    };

    

    useEffect(() => {

        if (title) {
            setSelectedDeliveryMethod(title);
        }
        if (paramCity) {
            setCity(paramCity);
        }
        if (third) {
            setThirdValue(third);
        }
    }, [title, paramCity, third]);

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

        if (selectedDeliveryMethod.includes('Відділення')) {
            return {
                title: 'Відділення',
                placeholder: 'Оберіть номер відділення',
                type: 'select'
            };
        } else if (selectedDeliveryMethod.includes('Поштомат')) {
            return {
                title: 'Поштомат',
                placeholder: 'Оберіть поштомат',
                type: 'select'
            };
        } else if (selectedDeliveryMethod.includes('Кур')) {
            return {
                title: 'Адреса доставки',
                placeholder: 'Введіть адресу',
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

    const handleSaveAddress = () => {
        // Перевіряємо чи заповнені обов'язкові поля
        if (!city || !selectedDeliveryMethod) {
            return;
        }

        // Формуємо адресу залежно від типу доставки
        let fullAddress = '';
        if (selectedDeliveryMethod.includes('Кур')) {
            // Для кур'єра використовуємо вулицю та номер будинку
            fullAddress = `${street}, ${building}${apartment ? ', кв. ' + apartment : ''}`;
        } else {
            // Для відділень та поштоматів використовуємо вибране значення
            fullAddress = thirdValue || 'Адреса буде вказана після вибору';
        }

        // Визначаємо поштовий код
        const finalPostalCode = postalCode || Math.floor(Math.random() * 9000) + 1000;

        // Генеруємо унікальний ID для нової адреси
        const newId = Date.now();

        // Визначаємо logoKey
        const logoKey = selectedDeliveryMethod.includes('Укрпошта') ? 'ukrposhta' : 'novaPoshta';


        // Переходимо назад до списку адрес з новою адресою
        router.replace(`/(tabs)/profile/addresses?newAddress=${JSON.stringify({
            id: newId,
            title: selectedDeliveryMethod,
            address: fullAddress,
            city,
            codePostal: finalPostalCode,
            logoKey
        })}`);
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 62 }} style={styles.container}>
            {/** Валідація форми для активності кнопки Зберегти */}
            {(() => {
                return null;
            })()}
            {/* Поле Місто */}
            <View style={styles.block}>
                <Text style={styles.labelCity}>Місто</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        router.push({
                            pathname: "/(tabs)/profile/addresses/changeAddress/cityFields",
                            params: {
                                source: 'add',
                                city: city || '',
                                // provide defaults for required fields used by the picker route
                                id: '',
                                title: selectedDeliveryMethod || '',
                                address: thirdValue || '',
                                codePostal: postalCode || '',
                                third: thirdValue || '',
                            }
                        });
                    }}
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
                            <View style={styles.block}>
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
                                        <Text style={styles.label}>Будинок</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Введіть номер"
                                            placeholderTextColor={Colors.grey400}
                                            value={building}
                                            onChangeText={handleBuildingChange}

                                        />
                                    </View>
                                    <View style={styles.thirdInput}>
                                        <Text style={styles.label}>Квартира</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Введіть номер"
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
                                            placeholder="Введіть номер"
                                            placeholderTextColor={Colors.grey400}
                                            value={postalCode}
                                            onChangeText={handlePostalCodeChange}
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
                                const isUkr = selectedDeliveryMethod.includes('Укрпошта');
                                const isDepartment = selectedDeliveryMethod.includes('Відділення');
                                const pathname = isDepartment
                                    ? "/(tabs)/profile/addresses/changeAddress/departmentFields"
                                    : "/(tabs)/profile/addresses/changeAddress/parcelFields";
                                router.push({
                                    pathname,
                                    params: {
                                        source: 'add',
                                        carrier: isUkr ? 'ukr' : 'nova',
                                        type: isDepartment ? 'department' : 'parcel',
                                        city,
                                        id: '',
                                        title: selectedDeliveryMethod || '',
                                        address: thirdValue || '',
                                        codePostal: postalCode || '',
                                    }
                                });
                            }}
                        >
                            <Text style={thirdValue ? styles.inputText : styles.placeholderText}>
                                {thirdValue || getThirdFieldConfig()?.placeholder}
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

                {(() => {
                    const isCourier = selectedDeliveryMethod.includes('Кур');
                    const thirdFieldConfig = getThirdFieldConfig();
                    const hasThirdField = Boolean(thirdFieldConfig);
                    const isThirdFieldValid = !hasThirdField || (isCourier ? (street.trim() && building.trim() && postalCode.trim()) : Boolean(thirdValue.trim()));

                    const isFormValid = Boolean(
                        city &&
                        selectedDeliveryMethod &&
                        isThirdFieldValid
                    );

                    return (
                        <TouchableOpacity
                            style={[styles.saveButton, !isFormValid && { backgroundColor: '#b9a3f5' }]}
                            onPress={handleSaveAddress}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.saveText}>Зберегти</Text>
                        </TouchableOpacity>
                    );
                })()}
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
        gap: 10,
    },

    thirdInput: {
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