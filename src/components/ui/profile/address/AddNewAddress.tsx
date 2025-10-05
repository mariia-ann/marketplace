import logoNovaPost from '@/assets/images/profile/address/logoNovaPoshta.png';
import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AddressChoose from './addressChoose/AddressChoose';

const AddNewAddress = () => {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 62 }} style={styles.container}>

            <AddressChoose title="Відділення Нова Пошта"
                address="Нова Пошта №131: проспект академіка Палладіна, б. 36"
                city="Київ"
                codePostal={12347} 
                logo ={logoNovaPost}
                />

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