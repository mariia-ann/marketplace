import Colors from '@/constants/Colors';
import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type ButtonSize = 'L' | 'M' | 'S';

type RadioButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  active?: boolean;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RadioButton: FC<RadioButtonProps> = ({
  title,
  onPress,
  size = 'M',
  active = true,
  selected = false,
  style,
  textStyle,
}) => {
  // 0 = inactive, 0.5 = active idle, 1 = active pressed
  const progress = useRef(new Animated.Value(active ? 0.5 : 0)).current;

  // Animate when "active" prop changes
  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 0.5 : 0,
      duration: 180,
      useNativeDriver: false, // color interpolation requires false
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

  const textColor = !active
    ? Colors.softPurple
    : selected
      ? Colors.softPurple
      : Colors.blackMain;

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0.98],
  });

  return (
    <AnimatedPressable
      disabled={!active}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.base,
        sizeStyles[size],
        active && !selected && styles.shadow, // active w/ shade, no border
        selected && styles.selected, // purple border
        !active && styles.disabled, // no border + opacity
        { transform: [{ scale }] },
        style,
      ]}
    >
      <View
        style={[
          styles.dot,
          selected && styles.dotSelected,
          !active && styles.dotDisabled,
        ]}
      />
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
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
  shadow: {
    shadowColor: Colors.blackMain,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.softPurple,
    shadowColor: Colors.softPurple,
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderColor: Colors.softPurple,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  dotSelected: {
    backgroundColor: Colors.softPurple,
  },
  dotDisabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center',
  },
});
const sizeStyles: Record<ButtonSize, ViewStyle> = {
  L: { minWidth: 300, maxWidth: 350 },
  M: { minWidth: 280 },
  S: { minWidth: 165 },
};

export default RadioButton;
