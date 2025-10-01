import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DateField from './DateField';

export default function FormFields() {
    const [phone, setPhone] = useState('');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Імя</Text>
                    <TextInput style={styles.input} defaultValue="Катерина" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Прізвище</Text>
                    <TextInput style={styles.input} defaultValue="Коновалова" />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>По батькові</Text>
                    <TextInput style={styles.input} defaultValue="Володимирівна" />
                </View>

                <View style={styles.inputGroup}>
                    <DateField />
                </View>

                <Text style={styles.contactsHeader}>Контакти</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Телефон</Text>
                    <TextInputMask
                        type={'custom'}
                        options={{
                            mask: '+99999-999-9999'
                        }}
                        value="+380991234567"
                        onChangeText={text => setPhone(text)}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>e-mail</Text>
                    <TextInput style={styles.input} defaultValue="konnovalova@gmail.com" />
                </View>
            </ScrollView>
        </SafeAreaView >

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    inputGroup: {
        marginTop: 16,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 12,
        color: Colors.grey400,
        fontFamily: 'Manrope',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.grey400,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: 'Manrope',
        color: Colors.blackMain,
    },
    contactsHeader: {
        fontSize: 18,
        color: Colors.blackMain,
        fontFamily: 'Manrope',
        marginTop: 22,
        marginLeft: 20,
    },
});