import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { FC, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type TextLinkProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  decorated?: boolean;
  fontSize?: number;
  pressScale?: number;
  pressOpacity?: number;
  animDuration?: number;
};

const TextLink: FC<TextLinkProps> = ({
  title,
  onPress,
  style,
  textStyle,
  decorated = false,
  fontSize = 16,
  pressScale = 0.97,
  pressOpacity = 0.8,
  animDuration = 120,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animateTo = (s: number, o: number) => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: s,
        duration: animDuration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: o,
        duration: animDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const textStyles = [
    styles.text,
    { fontSize },
    decorated ? styles.decorated : undefined,
    textStyle,
  ] as TextStyle[];

  const textColor =
    (Array.isArray(textStyles)
      ? textStyles.find((s) => (s as TextStyle)?.color)?.color
      : undefined) || styles.text.color;

  return (
    <Animated.View style={[{ transform: [{ scale }], opacity }]}>
      <Pressable
        style={[styles.container, style]}
        onPress={onPress}
        onPressIn={() => animateTo(pressScale, pressOpacity)}
        onPressOut={() => animateTo(1, 1)}
        accessibilityRole='button'
      >
        <Text style={textStyles}>{title}</Text>
        <AntDesign
          name='right'
          size={fontSize}
          color={textColor as string}
        />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: {
    color: Colors.softPurple,
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "700",
    marginRight: 8,
  },
  decorated: {
    textDecorationLine: "underline",
  },
});

export default TextLink;
