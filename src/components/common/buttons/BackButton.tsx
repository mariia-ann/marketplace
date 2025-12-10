import { CaretLeft } from "phosphor-react-native";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

interface BackButtonProps {
  style?: StyleProp<ViewStyle>;
  onClick?: (e: GestureResponderEvent) => void;
}

export default function BackButton(props: BackButtonProps) {
  const { style, onClick } = props;
  const router = useRouter();

  const handlePress = (event: GestureResponderEvent) => {
    if (onClick) {
      onClick(event);
      return;
    }
    router.back();
  };

  return (
    <Pressable style={[styles.backButtonWrapper, style]} onPress={handlePress}>
      {({ pressed }) => (
        <View
          style={[
            styles.backIconCircle,
            {
              backgroundColor: pressed ? Colors.activePurple : Colors.purple400,
            },
          ]}
        >
          <CaretLeft size={18} color={Colors.white} weight="bold" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButtonWrapper: {},
  backIconCircle: {
    backgroundColor: Colors.purple400,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
