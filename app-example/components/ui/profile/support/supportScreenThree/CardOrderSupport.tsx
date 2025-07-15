import Colors from '@/constants/Colors';
import React from 'react';
import { ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';


import OrderDetail from '../../ordersHistory/cardOrderHistory/ItemsCardOrder/OrderDetail';
import OrderList from '../../ordersHistory/cardOrderHistory/ItemsCardOrder/OrderList';
import OrderPaymentDetail from '../../ordersHistory/cardOrderHistory/ItemsCardOrder/OrderPaymentDetail';
import OrderStatus from '../../ordersHistory/cardOrderHistory/ItemsCardOrder/OrderStatus';
import ItemOrderList from '../../ordersHistory/cardOrderHistory/ItemsCardOrder/itemOrderList/ItemOrderList';

const VerticalLine = () => <View style={styles.verticalLine} />;

type Props = {
    orderNumber: number;
    date: string;
    time: string;

    orderStatus?: {
        status: string;
        statusDate: string;
        tracking: {
            dateTracking: string;
            timeTracking: string;
            nameTracking: string;
            isLast: boolean;
        }[];
    }

    orderList?: {
        items: {
            image: ImageSourcePropType;
            title: string;
            articul: number;
            seller: string;
            color: string;
            size: string;
            quantity: number;
            price: number;
        }[];
    };

    orderDetail?: {
        numberTTN: string;
        recipient: string;
        phone: string;
        deliveryMethod: string;
        addressDelivery: string;
    }


    paymentDetail?: {
        status: string;
        paymentMethod: string;
        paymentOrder: number;
        paymentDelivery: number;
        amount: number;
    };
};

const CardOrderSupport: React.FC<Props> = ({ orderNumber, date, time, orderStatus, orderList, orderDetail, paymentDetail }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.innerContainer}>

                    <View style={styles.headerRow}>
                        <Text style={styles.orderNumber}>№ {orderNumber}</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.orderDate}>{date}</Text>
                            <Text style={styles.orderTime}>{time}</Text>
                        </View>
                    </View>
                    <VerticalLine />

                    {/* Статус замовлення */}
                    {orderStatus && (<OrderStatus
                        status={orderStatus.status}
                        statusDate={orderStatus.statusDate}
                        tracking={orderStatus.tracking}
                    />)}
                    <VerticalLine />

                    {/* Список товарів */}
                    {orderList && (
                        <OrderList >
                            {orderList.items.map((item, index) => (
                                <ItemOrderList
                                    key={index}
                                    image={item.image}
                                    title={item.title}
                                    articul={item.articul}
                                    seller={item.seller}
                                    color={item.color}
                                    size={item.size}
                                    quantity={item.quantity}
                                    price={item.price}
                                />
                            ))}
                        </OrderList>
                    )}
                    <VerticalLine />


                    {/* Деталі замовлення */}
                    {orderDetail && (<OrderDetail
                        numberTTN={orderDetail.numberTTN}
                        recipient={orderDetail.recipient}
                        phone={orderDetail.phone}
                        deliveryMethod={orderDetail.deliveryMethod}
                        addressDelivery={orderDetail.addressDelivery}
                    />)}
                    <VerticalLine />

                    {/* Деталі оплати */}
                    {paymentDetail && (
                        <OrderPaymentDetail
                            status={paymentDetail.status}
                            paymentMethod={paymentDetail.paymentMethod}
                            paymentOrder={paymentDetail.paymentOrder}
                            paymentDelivery={paymentDetail.paymentDelivery}
                            amount={paymentDetail.amount}
                        />
                    )}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        marginBottom: 22,
        paddingTop: 10,
    },
    innerContainer: {
        marginHorizontal: 10,
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNumber: {
        fontFamily: 'ManropeSemiBold',
        fontSize: 16,
        color: Colors.blackMain,
    },
    orderDate: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey500,
    },
    orderTime: {
        fontFamily: 'Manrope',
        fontSize: 14,
        color: Colors.grey500,
        marginTop: 8,
    },
    verticalLine: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 20,
    },
});
export default CardOrderSupport;