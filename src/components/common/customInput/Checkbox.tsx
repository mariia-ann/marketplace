import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  isChecked?: boolean;
  onPress?: () => void;
  title?: string;
  titleStyle?: any;
  containerStyle?: any;
  checkboxStyle?: any;
}

const CheckBox = (props: Props) => {
  const { checkboxStyle, titleStyle, containerStyle } = props;
  const iconName = props.isChecked ?
    "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={Colors.softPurple}
          {...checkboxStyle}
        />
      </Pressable>
      <Text style={titleStyle}>{props.title}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
