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
    children?: React.ReactNode;
};

const OrderList: React.FC<Props> = ({ children }) => {
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

    const itemCount = React.Children.count(children);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>

                {/* Список товарів */}
                <View style={{ marginTop: 16 }}>
                    <SectionHeader
                        title="Список товарів"
                        expanded={expandedSections.items}
                        onPress={() => toggleSection('items')}
                    />
                    <Text style={styles.itemsCount}>Усього {itemCount} шт.</Text>


                    {expandedSections.items && (
                        <View style={{ marginHorizontal: 7 }}>
                            {children}
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
    itemsCount: {
        marginTop: 8,
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey500,
    },
});
export default OrderList;