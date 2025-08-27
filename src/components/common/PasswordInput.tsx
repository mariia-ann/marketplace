// components/form/PasswordInput.tsx
import Colors from "@/constants/Colors";
import { Eye, EyeClosed } from "phosphor-react-native";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  // string for the label text
  label?: string;
  value: string;
  // to trigger events when the text changes
  onChangeText: (t: string) => void;
  // to trigger events when the input loses focus
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  errorText?: string;
  touched?: boolean;
  // this is optional
  strengthLabel?: string;
  // these styles override the default styles if needed
  style?: StyleProp<ViewStyle>;
};

export default function PasswordInput({
  label = "Password",
  value,
  onChangeText,
  onBlur,
  placeholder = "**********",
  errorText,
  touched,
  strengthLabel,
  style,
}: Props) {
  const [secure, setSecure] = useState(true);
  const [focused, setFocused] = useState(false);

  const showError = touched && !!errorText;

  return (
    <View style={{ gap: 6 }}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.box,
          focused && styles.boxFocused,
          showError && styles.boxError,
          style,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={(e) => {
            setFocused(false); // trigger the event when focus changes
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          secureTextEntry={secure}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          textContentType='password'
        />
        <Pressable
          onPress={() => setSecure((s) => !s)}
          hitSlop={8}
          style={styles.eye}
        >
          {secure ? <EyeClosed size={20} /> : <Eye size={20} />}
        </Pressable>
      </View>

      {strengthLabel ? <Text style={styles.hint}>{strengthLabel}</Text> : null}
      {showError ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "400",
    paddingBottom: 8,
    color: Colors.grey400,
  },
  box: {
    height: 48,
    width: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey400,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  boxFocused: {
    borderColor: Colors.softPurple,
    borderWidth: 2,
  },
  boxError: { borderColor: Colors.red },
  input: { flex: 1, fontSize: 16 },
  eye: { padding: 6, marginLeft: 6 },
  hint: { fontSize: 12, color: "#6B7280" },
  error: { fontSize: 13, color: Colors.red },
});
