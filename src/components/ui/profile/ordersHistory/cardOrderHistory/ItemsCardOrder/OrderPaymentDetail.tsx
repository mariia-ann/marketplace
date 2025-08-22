import Colors from '@/constants/Colors';
import { CaretDown } from 'phosphor-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type SectionHeaderProps = {
    title: string;
    expanded: boolean;
    onPress: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, expanded, onPress }) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <CaretDown
            size={24}
            color="#170f2b"
            weight='bold'
            style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
        />
    </TouchableOpacity>
);

type Props = {
    status: string;
    paymentMethod: string;
    paymentOrder: number;
    paymentDelivery: number;
    amount: number;
};

const OrderPaymentDetail: React.FC<Props> = ({ status, paymentMethod, paymentOrder, paymentDelivery, amount }) => {
    const [expandedSections, setExpandedSections] = useState({
        status: false,
        items: false,
        details: false,
        payment: false,
    });
    type SectionKey = keyof typeof expandedSections;
    const toggleSection = (key: SectionKey) => {
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                {/* Деталі оплати */}
                <View style={{ marginTop: 16 }}>
                    <SectionHeader
                        title="Деталі оплати"
                        expanded={expandedSections.payment}
                        onPress={() => toggleSection('payment')}
                    />

                    <View style={styles.statusRow}>
                        <Text style={styles.detailsLabel}>Статус</Text>
                        <Text style={styles.statusText}>{status}</Text>
                    </View>

                    {expandedSections.payment && (
                        <View>
                            <View style={{ marginTop: 12 }}>
                                <View style={styles.paymentRow}>
                                    <Text style={styles.paymentLabel}>Спосіб оплати</Text>
                                    <Text style={styles.paymentValue}>{paymentMethod}</Text>
                                </View>
                                <View style={styles.paymentRow}>
                                    <Text style={styles.paymentLabel}>За товари</Text>
                                    <Text style={styles.paymentValue}>{paymentOrder} ₴</Text>
                                </View>
                                <View style={styles.paymentRow}>
                                    <Text style={styles.paymentLabel}>За доставку</Text>
                                    <Text style={styles.paymentValue}>{paymentDelivery} ₴</Text>
                                </View>
                            </View>

                            <View style={styles.paymentRow}>
                                <Text style={styles.paymentAmount}>Разом</Text>
                                <Text style={styles.paymentAmount}>{amount} ₴</Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.blackMain,
    },
    statusRow: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsLabel: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
    },
    statusText: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.softPurple,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    paymentLabel: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
    },
    paymentValue: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.blackMain,
    },
    paymentAmount: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.blackMain,
    },
});


export default OrderPaymentDetail;