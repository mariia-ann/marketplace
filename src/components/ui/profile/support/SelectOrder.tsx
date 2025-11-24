import Colors from "@/constants/Colors";
import CardOrderSupport from "@/src/components/ui/profile/support/supportScreenThree/CardOrderSupport";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import orders from "./supportScreenThree/ordersExample";

const SelectOrder = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleConfirmOrder = () => {
    if (selectedIndex !== null) {
      const selectedOrder = orders[selectedIndex];
      if ((global as any).addOrderMessage) {
        (global as any).addOrderMessage(selectedOrder.orderNumber);
      }
      router.back();
    }
  };

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
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: Colors.grey400,
                    },
              ]}
            />
            <CardOrderSupport
              orderNumber={order.orderNumber}
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
          <TouchableOpacity
            style={styles.filledButton}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.filledButtonText}>Підтвердити</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 58 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 37,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 7,
    marginTop: 10,
  },
  filledButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.softPurple,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  filledButtonText: {
    fontFamily: "ManropeBold",
    fontSize: 16,
    color: Colors.white,
  },
});

export default SelectOrder;
