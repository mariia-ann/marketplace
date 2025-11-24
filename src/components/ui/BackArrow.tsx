import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";
import { StyleSheet, Pressable, View } from "react-native";
import Colors from "@/constants/Colors";

export default function BackArrow() {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      {({ pressed }) => (
        <View
          style={[
            styles.backIconCircle,
            {
              backgroundColor: pressed ? Colors.purple400 : Colors.activePurple,
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
  backArrowWrapper: {
    position: "absolute",
    left: 20,
    top: 70,
    zIndex: 1,
  },
  backIconCircle: {
    backgroundColor: "#AC94E8",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
