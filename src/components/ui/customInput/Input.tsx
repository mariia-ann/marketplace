import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { CUSTOM_ICON_REF } from "../SvgIcons/IconRef";
import SvgIcons from "../SvgIcons/SvgIcons";

interface Props {
  directionRow: boolean;
  value: string;
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;

  // NEW: support blur directly
  onBlur?: TextInputProps["onBlur"];

  // better types for styles
  textStyle?: StyleProp<TextStyle>;
  customStyle?: StyleProp<TextStyle>;

  // spread-through props to TextInput
  othertextprops?: TextInputProps;

  // password helpers
  passwordInput?: boolean;
  passwordIconBaseStyle?: StyleProp<ViewStyle>;

  // error API
  errors?: {
    isError?: boolean;
    errorMessage?: string;
    errorMessageCustomStyling?: StyleProp<TextStyle>;
  };
}

function CustomInput({
  label,
  textStyle,
  customStyle,
  onChangeText,
  onBlur,
  placeholder,
  value,
  othertextprops,
  passwordInput,
  passwordIconBaseStyle,
  errors,
}: Props) {
  const isErrorStyling = errors?.isError
    ? { color: "#D30004", borderColor: "#D30004" }
    : {};

  // toggle for password visibility
  const [secure, setSecure] = useState<boolean>(
    passwordInput ? true : !!othertextprops?.secureTextEntry
  );

  return (
    <View style={styles.baseContainer}>
      <Text style={textStyle}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          {...othertextprops}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={
            passwordInput ? secure : othertextprops?.secureTextEntry
          }
          style={[styles.inputBase, customStyle, isErrorStyling]}
        />

        {/* Error text */}
        {errors?.isError && (
          <Text style={[styles.errorText, errors.errorMessageCustomStyling]}>
            {errors.errorMessage}
          </Text>
        )}

        {/* Right-side icon: error or password eye */}
        {errors?.isError ? (
          <SvgIcons
            name={CUSTOM_ICON_REF.Info}
            baseStyle={styles.inputRightIcon}
          />
        ) : passwordInput ? (
          <Pressable
            onPress={() => setSecure((s) => !s)}
            hitSlop={8}
            style={[styles.inputRightIcon, passwordIconBaseStyle]}
          >
            <SvgIcons
              name={CUSTOM_ICON_REF.EyeIcon}
              baseStyle={{ color: "#999999", width: 25, height: 25 }}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  baseContainer: { display: "flex", flexDirection: "column" },
  inputContainer: { position: "relative" },
  inputBase: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999999",
    padding: 12,
  },
  errorText: { color: "#D30004", fontFamily: "Manrope", marginTop: 6 },
  inputRightIcon: { position: "absolute", right: 6, top: 8, width: 25 },
});
