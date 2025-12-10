import React, { useState, forwardRef } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  FocusEvent,
} from "react-native";
import Colors from "@/constants/Colors";

interface BasicFormInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
}
// this component is a basic form input which accepts label, errorMessage and other TextInputProps
const BasicFormInput = forwardRef<TextInput, BasicFormInputProps>(
  ({ label, errorMessage, style, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const ERROR_HEIGHT = 12;

    // Handlers for focus and blur events
    const handleFocus = (e: FocusEvent) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isFocused && styles.focused,
            errorMessage && styles.errorInput,
            style,
          ]}
          placeholderTextColor={Colors.grey400}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          {...rest}
        />
        <View style={{ minHeight: ERROR_HEIGHT, marginTop: 8 }}>
          <Text style={[styles.errorText, !errorMessage && styles.errorHidden]}>
            {errorMessage ?? " "}
          </Text>
        </View>
      </View>
    );
  },
);

BasicFormInput.displayName = "BasicFormInput";
export default BasicFormInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontFamily: "Manrope",
    fontSize: 12,
    color: Colors.grey400,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 13.5,
    fontSize: 16,
    fontFamily: "Manrope",
    color: Colors.blackMain,
  },
  focused: {
    borderColor: Colors.softPurple,
    borderWidth: 2,
  },
  errorInput: {
    borderColor: Colors.red,
    borderWidth: 2,
  },
  errorHidden: { opacity: 0 },
  errorText: {
    fontSize: 12,
    fontFamily: "Manrope",
    color: Colors.red,
  },
});
