import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Colors from "@/constants/Colors";

interface BackButtonProps {
  style?: any;
  onClick?: (e: any) => void;
}

export default function BackButton(props: BackButtonProps) {
  const { style } = props;
  const router = useRouter();

  return (
    <Pressable
      style={[styles.backButtonWrapper, style]}
      onPress={() => router.back()}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.backIconCircle,
            {
              backgroundColor: pressed ? Colors.activePurple : Colors.purple400,
            },
          ]}
        >
          <CaretLeft
            size={18}
            color={Colors.white}
            weight='bold'
          />
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
