import search from "@/assets/images/profile/search/search.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
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
                <Image source={search} style={styles.icon}  resizeMode="contain"/>
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
        backgroundColor: Colors.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey400,
        paddingLeft: 10,
        height: 48,
        marginHorizontal: 20,
    },
    icon: {
        marginRight: 10,
        height:24,
        width:24,
    },
    input: {
        flex: 1,
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
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
        fontFamily: 'ManropeBold',
        fontSize: 14,
        color: Colors.blackMain,
    },
    order: {
        marginTop: 8,
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey500,
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
        color: Colors.grey500,
        marginBottom: 8,
    },
    notFoundText: {
        textAlign: 'center',
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.grey500,
        marginTop: 40,
    },
});