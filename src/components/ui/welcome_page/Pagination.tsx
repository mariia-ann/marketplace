import Colors from "@/constants/Colors";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animated, StyleSheet, View } from "react-native";

// Natural widths
const GAP = 3;
const DOT_W = 8;
const DASH_W = 29;

export type PaginationIndicatorHandle = {
  trigger: (stage: number) => void;
};

const PaginationIndicator = forwardRef<PaginationIndicatorHandle>(
  (props, ref) => {
    const dot1Opacity = useRef(new Animated.Value(0)).current;
    const dashOpacity = useRef(new Animated.Value(0)).current;
    const dot2Opacity = useRef(new Animated.Value(0)).current;
    const dashTranslateX = useRef(new Animated.Value(0)).current;

    const [order, setOrder] = useState<("dot1" | "dash" | "dot2")[]>([
      "dash",
      "dot1",
      "dot2",
    ]);

    const animateStage = (stage: number) => {
      // Reset all animated values
      dot1Opacity.setValue(0);
      dashOpacity.setValue(0);
      dot2Opacity.setValue(0);
      dashTranslateX.setValue(0);

      if (stage === 2) {
        setOrder(["dash", "dot1", "dot2"]);

        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dashOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }

      if (stage === 3) {
        setOrder(["dot1", "dash", "dot2"]);
        dashTranslateX.setValue(11);

        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dashOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dashTranslateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }

      if (stage === 4) {
        setOrder(["dot1", "dot2", "dash"]);
        dashTranslateX.setValue(11);

        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dashOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dashTranslateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    // Expose trigger method to parent
    useImperativeHandle(ref, () => ({
      trigger: animateStage,
    }));

    const renderItem = (kind: "dot1" | "dash" | "dot2") => {
      if (kind === "dash") {
        return (
          <View
            key="dash"
            style={[styles.slot, { width: DASH_W, marginHorizontal: GAP / 2 }]}
            pointerEvents="none"
          >
            <Animated.View
              style={[
                styles.dash,
                {
                  opacity: dashOpacity,
                  transform: [{ translateX: dashTranslateX }],
                },
              ]}
            />
          </View>
        );
      }

      const opacity = kind === "dot1" ? dot1Opacity : dot2Opacity;
      return (
        <View
          key={kind}
          style={[styles.slot, { width: DOT_W, marginHorizontal: GAP / 2 }]}
          pointerEvents="none"
        >
          <Animated.View style={[styles.dot, { opacity }]} />
        </View>
      );
    };

    return <View style={styles.row}>{order.map(renderItem)}</View>;
  },
);

PaginationIndicator.displayName = "PaginationIndicator";

export default PaginationIndicator;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  slot: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  dash: {
    width: DASH_W,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.softPurple,
    zIndex: 2,
    position: "relative",
  },
  dot: {
    width: DOT_W,
    height: DOT_W,
    borderRadius: DOT_W / 2,
    borderColor: Colors.softPurple,
    borderWidth: 2,
    zIndex: 1,
    position: "relative",
  },
});
