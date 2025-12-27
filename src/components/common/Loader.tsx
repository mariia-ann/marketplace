// components/ui/Loader.tsx
import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

type LoaderProps = {
  loading?: boolean;
  size?: "small" | "large" | number;
  color?: string;

  /** Center loader inside its parent (flex) */
  centered?: boolean;

  /** Optional label under the spinner */
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;

  /** Container styling */
  style?: StyleProp<ViewStyle>;
};

export function Loader({
  loading = true,
  size = "small",
  color,
  centered = false,
  label,
  style,
}: LoaderProps) {
  if (!loading) return null;

  return (
    <View style={[centered ? styles.centered : styles.inline, style]}>
      <ActivityIndicator size={size} color={color} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inline: {
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
  },
});
