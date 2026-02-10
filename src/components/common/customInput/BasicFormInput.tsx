// this component is a basic form input which accepts label, errorMessage and other TextInputProps
// It also supports an optional right icon with press functionality
import React, { useState, forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  FocusEvent,
  Pressable,
} from 'react-native';
import Colors from '@/constants/Colors';

interface BasicFormInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  noTextError?: boolean;
  rightIcon?: {
    render: React.ReactNode;
    onPress?: () => void;
  };
}
// this component is a basic form input which accepts label, errorMessage and other TextInputProps
const BasicFormInput = forwardRef<TextInput, BasicFormInputProps>(
  (
    {
      label,
      errorMessage,
      noTextError,
      rightIcon,
      style,
      onFocus,
      onBlur,
      textContentType,
      autoComplete,
      importantForAutofill,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const ERROR_HEIGHT = 10;

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
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            style={[
              styles.input,
              rightIcon && styles.inputWithIcon,
              isFocused && styles.focused,
              errorMessage && styles.errorInput,
              style,
            ]}
            placeholderTextColor={Colors.grey400}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize='none'
            autoCorrect={false}
            textContentType={textContentType ?? 'none'}
            autoComplete={autoComplete ?? 'off'}
            importantForAutofill={importantForAutofill ?? 'no'}
            {...rest}
          />
          {rightIcon && (
            <Pressable
              onPress={rightIcon.onPress}
              style={styles.iconRight}
              hitSlop={8}
            >
              {rightIcon.render}
            </Pressable>
          )}
        </View>
        {!noTextError && (
          <View style={{ minHeight: ERROR_HEIGHT, marginTop: 4 }}>
            <Text style={[styles.errorText, styles.errorHidden]}>
              {errorMessage}
            </Text>
          </View>
        )}
      </View>
    );
  },
);

BasicFormInput.displayName = 'BasicFormInput';
export default BasicFormInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.grey400,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 13.5,
    fontSize: 16,
    fontFamily: 'Manrope',
    color: Colors.blackMain,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  iconRight: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
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
    fontSize: 10,
    fontFamily: 'Manrope',
    letterSpacing: 0.5,
    color: Colors.red,
  },
});
