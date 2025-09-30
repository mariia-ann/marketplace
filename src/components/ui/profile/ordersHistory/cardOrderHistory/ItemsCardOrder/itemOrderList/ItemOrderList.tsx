import Colors from '@/constants/Colors';
import { Storefront } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Props = {
    image: ImageSourcePropType,
    title: string;
    articul: number;
    seller: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
};

const ItemOrderList: React.FC<Props> = ({ image, title, articul, seller, color, size, quantity, price }) => {
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
            <ScrollView style={{ paddingBottom: 16 }}>

                {/* Список товарів */}
                <View style={{ marginHorizontal: 10 }}>
                    <View style={styles.innerContainer}>
                        <View style={styles.infoBlock}>
                            <Image style={styles.image} source={image} />
                            <View style={styles.info}>

                                <View style={styles.infoProduct}>
                                    <Text style={styles.textInfoProduct}>{title}</Text>
                                    <Text style={styles.textInfoProduct}>Ар. {articul}</Text>
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

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    innerContainer: {
        marginTop: 20,
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
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    halfButton: {
        flex: 1,
        height: 39,
        borderRadius: 10,
        borderColor: Colors.softPurple,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlinedButtonText: {
        fontFamily: 'ManropeBold',
        fontSize: 14,
        color: Colors.softPurple,
    },
    fullButton: {
        height: 38,
        borderRadius: 10,
        borderColor: Colors.softPurple,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    infoBlock: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
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
    textInfoProduct: {
        fontFamily: "Manrope",
        fontSize: 14,
        color: Colors.blackMain,
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
        fontSize: 14,
    },
    price: {
        fontFamily: "ManropeBold",
        fontSize: 14,
        color: Colors.blackMain,
    },
    color: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#C1AEF6",
    },

});
export default ItemOrderList;