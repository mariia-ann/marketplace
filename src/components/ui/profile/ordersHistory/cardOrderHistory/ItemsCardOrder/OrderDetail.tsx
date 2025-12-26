import Colors from "@/constants/Colors";
import * as Clipboard from "expo-clipboard";
import { CaretDown, Copy } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SectionHeaderProps = {
  title: string;
  expanded: boolean;
  onPress: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  expanded,
  onPress,
}) => (
  <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <CaretDown
      size={24}
      color="#170f2b"
      weight="bold"
      style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}
    />
  </TouchableOpacity>
);

const copyToClipboard = async (text: string) => {
  if (Platform.OS === "web") {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
  } else {
    await Clipboard.setStringAsync(text);
  }
};

type Props = {
  numberTTN: string;
  recipient: string;
  phone: string;
  deliveryMethod: string;
  addressDelivery: string;
};
const OrderDetail: React.FC<Props> = ({
  numberTTN,
  recipient,
  phone,
  deliveryMethod,
  addressDelivery,
}) => {
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
        {/* Деталі замовлення */}
        <View style={{ marginTop: 16 }}>
          <SectionHeader
            title="Деталі замовлення"
            expanded={expandedSections.details}
            onPress={() => toggleSection("details")}
          />

          {expandedSections.details && (
            <View style={{ marginTop: 16 }}>
              <View>
                <View style={styles.detailsBlock}>
                  <Text style={styles.detailsLabel}>Номер ТТН</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsValue}>{numberTTN}</Text>
                    <TouchableOpacity
                      onPress={() => copyToClipboard(numberTTN)}
                    >
                      <Copy size={24} color="#999999" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.detailsBlock}>
                  <Text style={styles.detailsLabel}>Отримувач замовлення</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsValue}>{recipient}</Text>
                  </View>
                  <Text style={styles.detailsValue}>{phone}</Text>
                </View>

                <View style={styles.detailsBlock}>
                  <Text style={styles.detailsLabel}>Спосіб доставки</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsValue}>{deliveryMethod}</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.detailsLabel}>Адреса доставки</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsValue}>{addressDelivery}</Text>
                  </View>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "ManropeSemiBold",
    fontSize: 16,
    color: Colors.blackMain,
  },
  detailsBlock: {
    marginBottom: 12,
  },
  detailsLabel: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: Colors.grey500,
  },
  detailsValue: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: Colors.blackMain,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default OrderDetail;
