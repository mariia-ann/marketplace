import Colors from "@/constants/Colors";
import React, { FC, useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

type ButtonSize = "L" | "M" | "S";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  size = "M",
  active = true,
  style,
  textStyle,
}) => {
  const progress = useRef(new Animated.Value(active ? 0.5 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 0.5 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  const handlePressIn = () => {
    if (!active) return;
    Animated.timing(progress, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    if (!active) return;
    Animated.timing(progress, {
      toValue: 0.5,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [Colors.purple200, Colors.softPurple, Colors.activePurple],
  });

  const textColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [Colors.purple400, Colors.white, Colors.white],
  });

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0.98],
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        sizeStyles[size],
        { backgroundColor, transform: [{ scale }] },
        style,
      ]}
      // If you want screen readers to treat inactive as disabled:
      // accessibilityState={{ disabled: !active }}
    >
      <Animated.Text style={[styles.label, { color: textColor }, textStyle]}>
        {title}
      </Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "Manrope",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  L: { minWidth: 350 },
  M: { minWidth: 320 },
  S: { minWidth: 252 },
};

export default PrimaryButton;
