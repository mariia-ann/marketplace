import Colors from "@/constants/Colors";
import { Link, useRouter } from 'expo-router';
import { CaretRight, EnvelopeSimple, Phone } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const topics = [
    { title: 'Повернення грошей та товару', path: '/support/returns' },
    { title: 'Доставка та відслідковування', path: '/support/shipping' },
    { title: 'Оплата', path: '/support/payment' },
    { title: 'Оформлення замовлення', path: '/support/ordering' },
    { title: 'Акції та купони', path: '/support/promos' },
    { title: 'Управління акаунтом', path: '/support/account' },
    { title: 'Юридична інформація та безпека', path: '/support/legal' },
];

export default function SupportScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>Актуальні теми</Text>

                <View style={{ marginTop: 16 }}>
                    {topics.map((item) => (
                        <Link href={item.path as any} asChild key={item.path}>
                            <TouchableOpacity style={styles.topicBlock}>
                                <Text style={styles.topicText}>{item.title}</Text>
                                <CaretRight size={18} weight="bold" color={Colors.blackMain} />
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>

                <Text style={styles.questionText}>Не знайшли інформації щодо своїх питань?</Text>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                    <Phone size={32} color="#8e6cef" />
                    <Text style={styles.buttonText}>Замовити дзвінок</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginTop: 16 }]}
                    onPress={() => router.push("/(tabs)/profile/support/chat")}>
                    <EnvelopeSimple size={32} color="#8e6cef" />
                    <Text style={styles.buttonText}>Написати у чат-підтримку</Text>
                </TouchableOpacity>

                <View style={{ height: 66 }} />

                {/* Popup Modal */}
                <Modal visible={modalVisible} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modaltitle}>Ми отримали ваш запит!</Text>
                            <Text style={styles.modalText}>
                                Наш спеціаліст зателефонує вам протягом найближчої години
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'stretch' }}>
                                <Text style={styles.modalButtonText}>ОК</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'ManropeBold',
        color: Colors.blackMain,
        marginLeft: 20,
    },
    topicBlock: {
        height: 48,
        marginHorizontal: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
    },
    topicText: {
        fontSize: 16,
        fontFamily: 'Manrope',
        color: Colors.blackMain,
    },
    questionText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'ManropeBold',
        color: Colors.blackMain,
        marginTop: 24,
        marginBottom: 20,
        marginHorizontal: 50,
    },
    button: {
        height: 64,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'ManropeBold',
        color: Colors.softPurple,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: 'white',
        paddingHorizontal: 33,
        paddingVertical: 24,
        borderRadius: 10,
        width: 320,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 4,
    },
    modaltitle: {
        fontSize: 22,
        fontFamily: 'Manrope',
        color: Colors.blackMain,
        marginBottom: 24,
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Manrope',
        color: Colors.blackMain,
    },
    modalButtonText: {
        marginTop: 24,
        color: Colors.softPurple,
        fontSize: 16,
        fontFamily: 'ManropeBold',
        width: '100%',
        textAlign: 'right',
    }
});