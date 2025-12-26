import { Pressable, Text, View } from "react-native";

interface Props {
  baseStyle?: any;
  textStyle?: any;
  title?: string;
  handleClick?: () => void;
  toggled?: boolean;
}

function OptionToggle(props: Props) {
  const { baseStyle, textStyle, title, handleClick, toggled } = props;

  return (
    <Pressable
      style={{
        padding: 3,
        ...baseStyle,
        ...(toggled && { borderColor: "#8E6CEF", borderWidth: 1 }),
      }}
      onPress={handleClick}
    >
      <Text style={textStyle}>{title}</Text>
      <View
        style={{
          width: 18,
          height: 18,
          borderWidth: 1,
          borderColor: "#8E6CEF",
          borderRadius: 100,
          ...(toggled && { backgroundColor: "#8E6CEF" }),
        }}
      ></View>
    </Pressable>
  );
}

export default OptionToggle;
