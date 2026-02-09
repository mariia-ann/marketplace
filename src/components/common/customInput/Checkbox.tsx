import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';

interface Props {
  isChecked?: boolean;
  onPress?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<TextStyle>;
}

const CheckBox = (props: Props) => {
  const { checkboxStyle, titleStyle } = props;
  const iconName = props.isChecked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={Colors.softPurple}
          style={checkboxStyle}
        />
        <Text style={titleStyle}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
