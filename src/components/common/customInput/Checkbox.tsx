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
  const { checkboxStyle, titleStyle } = props;
  const iconName = props.isChecked ?
    "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress}>
        <MaterialCommunityIcons
          name={iconName} size={24} color="#000" {...checkboxStyle} />
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
    width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
});