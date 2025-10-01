import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { CUSTOM_ICON_REF } from "../SvgIcons/IconRef";
import SvgIcons from "../SvgIcons/SvgIcons";

interface Props {
	directionRow?: boolean;
	value: any;
	label?: string;
	placeholder: string;
	onChangeText: (value: any) => void;
	textStyle: any;
	customStyle: any;
	othertextprops?: any;
	passwordInput?: boolean;
	passwordIconBaseStyle?: any;
	keyboardType?: KeyboardTypeOptions;
	errors?: {
		isError?: boolean;
		errorMessage?: string;
		errorMessageCustomStyling?: any;
	}
}

function CustomInput(props: Props) {
	const { directionRow, label, textStyle, customStyle, onChangeText, placeholder, value, othertextprops, passwordInput, passwordIconBaseStyle, keyboardType, errors } = props;
	const isErrorStyling = () => {
		return errors?.isError ? {color: "#D30004", borderColor: "#D30004"} : {};
	};
	return (
		<View style={ directionRow ? styles.baseRowContainer : styles.baseContainer }>
			{label && <Text style={textStyle}>{label}</Text>}
			<View style={styles.inputContainer}>
				<TextInput
					placeholder={placeholder}
					value={value}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					style={{...customStyle, ...isErrorStyling()}}
					{...othertextprops}
				/>
				{/**If want to apply custom color, just add your color with !important */}
				{errors?.isError && <Text style={{ color: "#D30004", fontFamily: "Manrope", ...errors.errorMessageCustomStyling}}>{errors.errorMessage}</Text>}
				{errors?.isError ? <SvgIcons name={CUSTOM_ICON_REF.Info} baseStyle={styles.inputErrorText} /> : passwordInput && <SvgIcons name={CUSTOM_ICON_REF.EyeIcon} baseStyle={{ color: "#999999", position: "absolute", right: 6, top: 8, ...passwordIconBaseStyle }} />}
			</View>
		</View>
	)
}

export default CustomInput;

const styles = StyleSheet.create({
	baseContainer: { display: "flex", flexDirection: "column" },
	baseRowContainer: { display: "flex", flexDirection: "row" },
	inputContainer: { position: "relative" },
	inputErrorText: {color: "#D30004", position: "absolute", right: 6, top: 8, width: 25, fontFamily: "Manrope"}
})