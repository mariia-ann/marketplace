import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";
import { StyleSheet, Pressable, View, StyleProp, ViewStyle } from "react-native";
import Colors from "@/constants/Colors";

interface BackArrowProps {
  customStyles?: StyleProp<ViewStyle>;
}

export default function BackArrow(props: BackArrowProps) {
  const { customStyles } = props;
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      {({ pressed }) => (
        <View
          style={[
            styles.backIconCircle,
            customStyles,
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
