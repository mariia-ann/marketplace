import CardOrderSupport from '@/app-example/components/ui/profile/support/CardOrderSupport';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import orders from './ordersExample';

const SelectOrder = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                {orders.map((order, index) => (
                    <View key={index} style={styles.orderRow}>
                        <TouchableOpacity
                            onPress={() =>
                                setSelectedIndex(selectedIndex === index ? null : index)
                            }
                            style={[
                                styles.circle,
                                selectedIndex === index
                                    ? { backgroundColor: Colors.softPurple }
                                    : {
                                        backgroundColor: 'white',
                                        borderWidth: 1,
                                        borderColor: Colors.grey400,
                                    },
                            ]}
                        />
                        <CardOrderSupport orderNumber={order.orderNumber}
                            date={order.date}
                            time={order.time}
                            orderStatus={order.orderStatus}
                            orderList={order.orderList}
                            orderDetail={order.orderDetail}
                            paymentDetail={order.paymentDetail}
                        />
                    </View>
                ))}

                {selectedIndex !== null && (
                    <TouchableOpacity style={styles.filledButton}>
                        <Text style={styles.filledButtonText}>Підтвердити</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
        paddingBottom: 37,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 7,
        marginTop: 0,
    },
    filledButton: {
        height: 52,
        borderRadius: 8,
        backgroundColor: '#A174FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginBottom: 37,
    },
    filledButtonText: {
        fontFamily: 'ManropeBold',
        fontSize: 16,
        color: '#FFFCF5',
    },
});

export default SelectOrder;
