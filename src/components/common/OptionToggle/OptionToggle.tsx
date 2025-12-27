// this is a component to be used as a toggle option button
import Colors from "@/constants/Colors";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";

interface OptionToggleProps {
  title: string;
  handleClick?: () => void;
  pressed?: boolean;
}

const shadow15 = Platform.select({
  ios: {
    shadowColor: Colors.blackMain,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 6,
  },
});

const purpleShadow16 = Platform.select({
  ios: {
    shadowColor: Colors.softPurple,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 6,
  },
});

function OptionToggle({
  title,
  pressed = false,
  handleClick,
}: OptionToggleProps) {
  const containerStyle = pressed
    ? [styles.border, purpleShadow16]
    : [styles.noborder, shadow15];

  return (
    <Pressable onPress={handleClick} style={[styles.box, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.dot, pressed && styles.dotPressed]} />
    </Pressable>
  );
}

export default OptionToggle;

const styles = StyleSheet.create({
  box: {
    width: 165,
    height: 52,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  border: {
    borderColor: Colors.softPurple,
    borderRadius: 10,
    borderWidth: 1,
  },
  noborder: {
    borderWidth: 0,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.softPurple,
  },
  dot: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.softPurple,
    borderRadius: 100,
  },
  dotPressed: {
    backgroundColor: Colors.softPurple,
  },
});
