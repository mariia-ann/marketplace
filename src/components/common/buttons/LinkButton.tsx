/* This is a link button component 
As per Figma design it has 3 states: active, inactive and pressed.
Link text could be:
- with underline;
- without underline;
*/
import Colors from "@/constants/Colors";
import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type LinkButtonProps = {
  title: string;
  onPress?: () => void;
  /** Controls enabled/disabled visuals and pressability */
  active?: boolean;
  /** Show an underline under the label */
  underline?: boolean;
  /** Override the default active color */
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const LinkButton: FC<LinkButtonProps> = ({
  title,
  onPress,
  active = true,
  underline = true,
  color,
  style,
  textStyle,
}) => {
  const activeColor = color ?? Colors.softPurple;
  const pressedColor = Colors.activePurple;
  const inactiveColor = Colors.purple300;

  const resolveColor = (pressed: boolean) => {
    if (!active) return inactiveColor;
    if (pressed) return pressedColor;
    return activeColor;
  };

  return (
    <Pressable
      disabled={!active}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        !active && styles.inactive,
        pressed && active && styles.pressed,
        style,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.label,
            {
              color: resolveColor(pressed),
              textDecorationLine: underline ? "underline" : "none",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  pressed: {
    opacity: 0.85,
  },
  inactive: {
    opacity: 0.6,
  },
  label: {
    fontFamily: "Manrope",
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: "700",
  },
});

export default LinkButton;
