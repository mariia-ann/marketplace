import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type CrossfadeTextsHandle = {
  trigger: (targetIndex: number) => void;
};

type Props = {
  messages: [string, string, string];
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  duration?: number;
};
//This component changes the text with a crossfade animation initiated by ref in a parent component.
const CrossfadeTexts = forwardRef<CrossfadeTextsHandle, Props>(
  ({ messages, textStyle, containerStyle, duration = 500 }, ref) => {
    const opacities = [
      useRef(new Animated.Value(0)).current,
      useRef(new Animated.Value(0)).current,
      useRef(new Animated.Value(0)).current,
    ];

    const visibleIndexRef = useRef<number | null>(null);
    const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);

    const trigger = (targetIndex: number) => {
      if (visibleIndexRef.current === null) {
        // At first mount all elements just fade in
        opacities.forEach((o) => o.setValue(0));
        Animated.timing(opacities[targetIndex], {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => {
          visibleIndexRef.current = targetIndex;
        });
        return;
      }

      const from = visibleIndexRef.current;
      const to = targetIndex;
      if (from === to) return;

      Animated.parallel([
        Animated.timing(opacities[from], {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacities[to], {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        visibleIndexRef.current = to;
      });
    };

    // Expose the `trigger` method to parent
    useImperativeHandle(ref, () => ({
      trigger,
    }));

    return (
      <View
        style={[
          styles.wrapper,
          containerStyle,
          measuredHeight ? { height: measuredHeight } : null,
        ]}
      >
        {measuredHeight === null && (
          <Text
            style={[textStyle, styles.measure]}
            onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}
          >
            {messages.reduce((a, b) => (a.length >= b.length ? a : b))}
          </Text>
        )}

        <Animated.Text
          style={[styles.layer, textStyle, { opacity: opacities[0] }]}
        >
          {messages[0]}
        </Animated.Text>
        <Animated.Text
          style={[styles.layer, textStyle, { opacity: opacities[1] }]}
        >
          {messages[1]}
        </Animated.Text>
        <Animated.Text
          style={[styles.layer, textStyle, { opacity: opacities[2] }]}
        >
          {messages[2]}
        </Animated.Text>
      </View>
    );
  }
);

export default CrossfadeTexts;

const styles = StyleSheet.create({
  wrapper: {
    width: 310,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  layer: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  measure: {
    opacity: 0,
    position: "relative",
  },
});
