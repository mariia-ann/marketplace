import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const deliveryOptions = [
    { id: 1, title: 'Відділення Нова Пошта', price: '60 грн', logoKey: 'novaPoshta' },
    { id: 2, title: 'Кур\'єр Нова Пошта', price: '60 грн', logoKey: 'novaPoshta' },
    { id: 3, title: 'Поштомат Нова Пошта', price: '60 грн', logoKey: 'novaPoshta' },
    { id: 4, title: 'Відділення Укрпошта', price: '40 грн', logoKey: 'ukrposhta' },
];

export default function DeliveryMethodPost() {
    const router = useRouter();
    const { id, title, address, city, codePostal } = useLocalSearchParams<{
        id: string;
        title: string;
        address: string;
        city: string;
        codePostal: string;
    }>();

    const [selectedId, setSelectedId] = useState(1);

    const handleSelectOption = (option: typeof deliveryOptions[0]) => {
        setSelectedId(option.id);
        // Передаємо вибраний спосіб доставки назад до ChangeAddress з оновленими даними
        router.replace({
            pathname: "/(tabs)/profile/addresses/changeAddress",
            params: {
                id,
                title: option.title,
                address,
                city,
                codePostal,
                logo: option.logoKey,
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                {deliveryOptions.map((option, index) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.optionContainer, index === 0 && { marginTop: 32 }]}
                        onPress={() => handleSelectOption(option)}
                    >
                        <View style={styles.radioWrapper}>
                            <View
                                style={[
                                    styles.radioCircle,
                                    selectedId === option.id && styles.radioCircleSelected,
                                ]}
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{option.title}</Text>
                            <Text style={styles.subtitle}>{option.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 245 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    radioWrapper: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999999',
        backgroundColor: '#FFFFFF',
        marginRight: 20,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999999',
        backgroundColor: '#FFFFFF',
    },
    radioCircleSelected: {
        backgroundColor: '#8E6CEF',
        borderWidth: 0,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: '#170F2B',
    },
    subtitle: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: '#999999',
        marginTop: 8,
    },
});