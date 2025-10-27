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

interface InputWithLabelProps extends TextInputProps {
  label: string;
  errorMessage?: string;
}

const InputWithLabel = forwardRef<TextInput, InputWithLabelProps>(
  ({ label, errorMessage, style, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: FocusEvent) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <View style={[styles.container, errorMessage && { marginBottom: -8 }]}>
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
          {...rest}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";
export default InputWithLabel;

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
  errorText: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Manrope",
    color: Colors.red,
  },
});
