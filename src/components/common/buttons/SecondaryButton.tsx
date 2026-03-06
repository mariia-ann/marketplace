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

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SecondaryButton: FC<SecondaryButtonProps> = ({
  title,
  onPress,
  size = 'M',
  active = true,
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

  // Press interactions only matter if active
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

  const borderColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [Colors.purple200, Colors.softPurple, Colors.activePurple],
  });

  const textColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [Colors.purple200, Colors.blackMain, Colors.purple400],
  });

  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0.98],
  });

  return (
    <View>
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.base,
          sizeStyles[size],
          { borderColor, transform: [{ scale }] },
          style,
        ]}
      >
        <Animated.Text style={[styles.label, { color: textColor }, textStyle]}>
          {title}
        </Animated.Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
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
  L: { width: 350 },
  M: { minWidth: 330 },
  S: { minWidth: 165 },
};

export default SecondaryButton;
