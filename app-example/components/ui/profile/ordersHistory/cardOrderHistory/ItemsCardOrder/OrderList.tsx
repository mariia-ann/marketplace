import Colors from '@/constants/Colors';
import { CaretDown, Storefront } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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
    count: number;
    image: ImageSourcePropType,
    title: string;
    articul: number;
    seller: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
};
const OrderList: React.FC<Props> = ({ count, image, title, articul, seller, color, size, quantity, price }) => {
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
            <ScrollView contentContainerStyle={styles.container}>
                {/* Список товарів */}

                <View style={{ marginTop: 16 }}>
                    <SectionHeader
                        title="Список товарів"
                        expanded={expandedSections.items}
                        onPress={() => toggleSection('items')}
                    />
                    <Text style={styles.itemsCount}>Усього {count} шт.</Text>

                    {expandedSections.items && (
                        <View>
                            <View style={styles.innerContainer}>
                                <View style={styles.infoBlock}>
                                    <Image style={styles.image} source={image} />
                                    <View style={styles.info}>
                                        <View style={styles.infoProduct}>
                                            <Text style={styles.text}>{title}</Text>
                                            <Text style={styles.text}>Ар. {articul}</Text>
                                        </View>
                                        <View style={styles.seller}>
                                            <Text style={styles.sellerName}>{seller}</Text>
                                            <Storefront size={32} weight="thin" color="#8E6CEF" />
                                        </View>
                                        <View style={styles.paramBlock}>
                                            <View style={styles.param}>
                                                <View style={[styles.color, { backgroundColor: color }]} />
                                                <Text style={styles.paramInfo}>
                                                    {size} | {quantity} шт.
                                                </Text>
                                            </View>
                                            <Text style={styles.price}>{price} ₴</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <View style={styles.rowButtons}>
                                        <TouchableOpacity style={[styles.halfButton, { marginRight: 4.5 }]}>
                                            <Text style={styles.outlinedButtonText}>Обміняти</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.halfButton, { marginLeft: 4.5 }]}>
                                            <Text style={styles.outlinedButtonText}>Скасувати</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.fullButton}>
                                        <Text style={styles.outlinedButtonText}>Залишити відгук про товар</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 3,
    },
    innerContainer: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 14,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: 'ManropeBold',
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

    itemsCount: {
        marginTop: 8,
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey400,
    },
    itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 15,
        marginTop: 8,
    },
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    halfButton: {
        flex: 1,
        height: 52,
        borderRadius: 8,
        borderColor: Colors.softPurple,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlinedButton: {
        height: 52,
        borderRadius: 8,
        borderColor: Colors.softPurple,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    outlinedButtonText: {
        fontFamily: 'ManropeBold',
        fontSize: 14,
        color: Colors.softPurple,
    },
    fullButton: {
        height: 52,
        borderRadius: 8,
        borderColor: Colors.softPurple,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    filledButton: {
        height: 52,
        borderRadius: 8,
        backgroundColor: '#A174FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filledButtonText: {
        fontFamily: 'ManropeBold',
        fontSize: 16,
        color: '#FFFCF5',
    },
    infoBlock: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
        paddingRight: 20,
    },
    image: {
        width: 127,
        height: 132,
        borderRadius: 8,
    },
    info: {
        gap: 6,
        flex: 1,
    },
    infoProduct: {
        gap: 6,
    },
    text: {
        fontFamily: "Manrope",
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: "#CCCCCC",
        marginBottom: 12,
    },
    seller: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sellerName: {
        fontFamily: "ManropeSemiBold",
        fontSize: 14,
        color: Colors.softPurple,
    },
    paramBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    param: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    paramInfo: {
        fontFamily: "ManropeBold",
        color: Colors.grey500,
    },
    price: {
        fontFamily: "ManropeBold",
    },

    color: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#C1AEF6",
    },

});
export default OrderList;