import Colors from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

export type TwoTabsProps = {
  activeTab: "option1" | "option2";
  option1: string;
  option2: string;
  onTabChange: (tab: "option1" | "option2") => void;
  containerStyle?: StyleProp<ViewStyle>;
  tabLeftStyle?: StyleProp<ViewStyle>;
  tabRightStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const TwoTabsSwitch = ({
  activeTab,
  onTabChange,
  option1,
  option2,
  containerStyle,
  tabLeftStyle,
  tabRightStyle,
  textStyle,
}: TwoTabsProps) => {
  const leftAnim = useRef(
    new Animated.Value(activeTab === "option1" ? 1 : 0),
  ).current;
  const rightAnim = useRef(
    new Animated.Value(activeTab === "option2" ? 1 : 0),
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
    <View style={[styles.tabs, containerStyle]}>
      <TouchableWithoutFeedback onPress={() => onTabChange("option1")}>
        <Animated.View
          style={[
            styles.tabLeft,
            { backgroundColor: bgColor(leftAnim) },
            tabLeftStyle,
          ]}
        >
          <Animated.Text
            style={[styles.text, { color: textColor(leftAnim) }, textStyle]}
          >
            {option1}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onTabChange("option2")}>
        <Animated.View
          style={[
            styles.tabRight,
            { backgroundColor: bgColor(rightAnim) },
            tabRightStyle,
          ]}
        >
          <Animated.Text
            style={[styles.text, { color: textColor(rightAnim) }, textStyle]}
          >
            {option2}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
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
