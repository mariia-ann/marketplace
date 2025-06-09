import { Link } from "expo-router";
import { MagnifyingGlass } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import messagesData from "./SellerMessagesConst";

export default function sellerMessages() {
    const [query, setQuery] = useState('');

    const filteredMessages = query.length >= 3
        ? messagesData.filter(item =>
            item.seller.toLowerCase().includes(query.toLowerCase())
        )
        : messagesData;

    return (
        <View style={styles.container}>

            <View style={styles.searchContainer}>
                <MagnifyingGlass size={24} color="#170f2b" weight="thin" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Пошук..."
                    placeholderTextColor="#999999"
                    onChangeText={setQuery}
                    value={query}
                    underlineColorAndroid="transparent"
                />
            </View>

            <ScrollView style={{ marginTop: 24 }}>
                {query.length >= 3 && filteredMessages.length === 0 ? (
                    <Text style={styles.notFoundText}>Нічого не знайдено</Text>
                ) : (
                    filteredMessages.map(item => (
                        <Link key={item.id} href="/(tabs)/profile/sellerMessages/chatMessages" asChild>
                            <Pressable style={styles.messageContainer}>

                                <Image source={{ uri: item.avatar }} style={styles.avatar} />

                                <View style={styles.messageTextContainer}>
                                    <Text style={styles.seller}>{item.seller}</Text>
                                    <Text style={styles.order}>{item.order}</Text>
                                </View>

                                <View style={styles.dateContainer}>
                                    <Text style={styles.date}>{item.date}</Text>
                                    <Text style={styles.date}>{item.time}</Text>
                                </View>

                            </Pressable>
                        </Link>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999999',
        paddingLeft: 10,
        height: 48,
        marginHorizontal: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#170f2b',
        height: 48,
        outlineWidth: 0,
    },
    messageContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    avatar: {
        width: 53,
        height: 53,
        borderRadius: 26.5,
        resizeMode: 'cover',
    },
    messageTextContainer: {
        flex: 1,
        marginLeft: 20,
    },
    seller: {
        fontFamily: 'Outfit',
        fontSize: 14,
        color: '#170f2b',
    },
    order: {
        marginTop: 8,
        fontFamily: 'Outfit',
        fontSize: 14,
        color: '#666666',
    },
    dateContainer: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
        paddingRight: 0,
        fontFamily: 'Manrope',
    },
    date: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
    },
    notFoundText: {
        textAlign: 'center',
        fontFamily: 'Outfit',
        fontSize: 16,
        color: '#666666',
        marginTop: 40,
    },
});