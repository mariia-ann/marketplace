import Colors from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export type TwoTabsProps = {
  activeTab: "option1" | "option2";
  option1: string;
  option2: string;
  onTabChange: (tab: "option1" | "option2") => void;
};

const TwoTabsSwitch = ({
  activeTab,
  onTabChange,
  option1,
  option2,
}: TwoTabsProps) => {
  const leftAnim = useRef(
    new Animated.Value(activeTab === "option1" ? 1 : 0)
  ).current;
  const rightAnim = useRef(
    new Animated.Value(activeTab === "option2" ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(leftAnim, {
        toValue: activeTab === "option1" ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(rightAnim, {
        toValue: activeTab === "option2" ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [activeTab]);

  const bgColor = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.white, Colors.softPurple],
    });

  const textColor = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.blackMain, Colors.white],
    });

  return (
    <SafeAreaView>
      <View style={styles.tabs}>
        <TouchableWithoutFeedback onPress={() => onTabChange("option1")}>
          <Animated.View
            style={[styles.tabLeft, { backgroundColor: bgColor(leftAnim) }]}
          >
            <Animated.Text
              style={[styles.text, { color: textColor(leftAnim) }]}
            >
              {option1}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => onTabChange("option2")}>
          <Animated.View
            style={[styles.tabRight, { backgroundColor: bgColor(rightAnim) }]}
          >
            <Animated.Text
              style={[styles.text, { color: textColor(rightAnim) }]}
            >
              {option2}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
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
    borderColor: Colors.grey400,
    alignItems: "center",
  },
  tabRight: {
    width: "50%",
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey400,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default TwoTabsSwitch;
