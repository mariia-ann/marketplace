import { Pressable, Text, View } from "react-native";

interface Props {
  baseStyle?: any;
  textStyle?: any;
  title?: string;
}

function OptionToggle(props: Props) {

  const { baseStyle, textStyle, title } = props;

  return (
    <Pressable style={{ padding: 3, ...baseStyle }}>
      <Text style={textStyle}>{title}</Text>
      <View style={{width: 18, height: 18, borderWidth: 1, borderColor: "#8E6CEF", borderRadius: 100}}></View>
    </Pressable>
  )
}

export default OptionToggle