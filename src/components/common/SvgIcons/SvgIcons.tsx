import React from "react";
import { View } from "react-native";
import { CUSTOM_ICON_REF, CustomIconRef } from "./IconRef";

interface Props {
  name: CUSTOM_ICON_REF;
  baseStyle: any;
}

function SvgIcons(props: Props) {
  const { name, baseStyle } = props;

	const CustomIcon = CustomIconRef[name];
	if (!CustomIcon) return null;
	return (
		<View style={baseStyle}>
			<CustomIcon color={baseStyle?.color} />
		</View>
	)
}

export default SvgIcons;
