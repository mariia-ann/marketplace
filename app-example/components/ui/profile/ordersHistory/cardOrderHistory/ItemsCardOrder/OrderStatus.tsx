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
    statusDate: string;
    tracking: {
        dateTracking: string;
        timeTracking: string;
        nameTracking: string;
        isLast: boolean;
    }[],
};
const OrderStatus: React.FC<Props> = ({ status, statusDate, tracking }) => {
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

                {/* Статус замовлення */}
                <View style={{ marginTop: 16 }}>
                    <SectionHeader
                        title="Статус замовлення"
                        expanded={expandedSections.status}
                        onPress={() => toggleSection('status')}
                    />
                    <View style={styles.statusRow}>
                        <Text style={styles.statusText}>{status}</Text>
                        <Text style={styles.statusDate}>{statusDate}</Text>
                    </View>

                    {expandedSections.status && (
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.trackingTitle}>Деталі трекінгу</Text>
                            {tracking.map((item, idx) => (
                                <View key={idx} style={styles.trackingItem}>
                                    <View
                                        style={[
                                            styles.circle,
                                            { backgroundColor: item.isLast ? '#999999' : '#8E6CEF' },
                                        ]}
                                    />
                                    <View style={styles.trackingDateContainer}>
                                        <Text style={styles.trackingDate}>{item.dateTracking}</Text>
                                        <Text style={styles.trackingDate}>{item.timeTracking}</Text>
                                    </View>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={[styles.trackingLabel, item.isLast && { color: '#666666' }]}
                                    >
                                        {item.nameTracking}
                                    </Text>
                                </View>

                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusText: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.softPurple,
    },
    statusDate: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.grey500,
    },
    trackingTitle: {
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
        marginBottom: 12,
    },
    trackingItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    trackingDateContainer: {
        marginLeft: 16,
        marginRight: 20,
    },
    trackingDate: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey500,
    },
    trackingLabel: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.blackMain,
        flex: 1,
        flexWrap: 'wrap',
        minWidth: 0,
    },

});


export default OrderStatus;