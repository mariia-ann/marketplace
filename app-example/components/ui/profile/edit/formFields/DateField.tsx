import { CalendarBlank } from 'phosphor-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function DataField() {
    const [date, setDate] = useState(new Date(2005, 3, 18));
    const [textDate, setTextDate] = useState(formatDate(date));

    function formatDate(date: Date) {
        return date.toLocaleDateString('uk-UA');
    }

    function parseDateFromString(str: string) {
        const parts = str.split('.');
        if (parts.length === 3) {
            const [day, month, year] = parts.map(Number);
            const parsed = new Date(year, month - 1, day);
            if (!isNaN(parsed.getTime())) return parsed;
        }
        return null;
    }


    return (
        <View>
            <Text style={styles.label}>Дата народження</Text>
            <View style={styles.dateInputContainer}>
                <TextInputMask
                    type={'datetime'}
                    options={{ format: 'DD.MM.YYYY' }}
                    style={styles.input}
                    value={textDate}
                    onChangeText={(formatted) => {
                        setTextDate(formatted);
                        const parsed = parseDateFromString(formatted);
                        if (parsed) setDate(parsed);
                    }}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.dateIcon}
                >
                    <CalendarBlank size={32} color="#170f2b" weight="thin" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: '#999999',
        fontFamily: 'Manrope-Regular',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: 'Manrope-Regular',
        color: '#170F2B',
    },
    dateInputContainer: {
        position: 'relative',
    },
    dateIcon: {
        position: 'absolute',
        right: 10,
        top: 5,
    },

});
