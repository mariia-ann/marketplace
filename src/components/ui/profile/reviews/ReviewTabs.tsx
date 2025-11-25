import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ReviewTabsProps = {
  activeTab: "products" | "sellers";
  onTabChange: (tab: "products" | "sellers") => void;
};

const ReviewTabs = ({ activeTab, onTabChange }: ReviewTabsProps) => {
  return (
    <SafeAreaView>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabLeft, activeTab === "products" && styles.activeTab]}
          onPress={() => onTabChange("products")}
        >
          <Text
            style={[styles.text, activeTab === "products" && styles.activeText]}
          >
            Про товари
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabRight, activeTab === "sellers" && styles.activeTab]}
          onPress={() => onTabChange("sellers")}
        >
          <Text
            style={[styles.text, activeTab === "sellers" && styles.activeText]}
          >
            Про продавців
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  tabLeft: {
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#999999",
  },
  tabRight: {
    width: "50%",
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#999999",
  },
  activeTab: {
    borderBottomColor: "#8E6CEF",
    backgroundColor: "#8E6CEF",
    borderWidth: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    color: "#170F2B",
  },
  activeText: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
export default ReviewTabs;
