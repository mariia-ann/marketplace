// this is a input component for password fields which uses BasicFormInput and adds secure text entry functionality
import BasicFormInput from "@/src/components/common/customInput/BasicFormInput";
import React, { useState, forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Eye, EyeSlash } from "phosphor-react-native";
import Colors from "@/constants/Colors";

interface PasswordInputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  textContentType?: TextInputProps["textContentType"];
  autoComplete?: TextInputProps["autoComplete"];
  importantForAutofill?: TextInputProps["importantForAutofill"];
}

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    {
      label,
      errorMessage,
      textContentType = "newPassword",
      autoComplete = "new-password",
      importantForAutofill = "yes",
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <BasicFormInput
        ref={ref}
        label={label}
        errorMessage={errorMessage}
        secureTextEntry={!isPasswordVisible}
        textContentType={textContentType}
        autoComplete={autoComplete}
        importantForAutofill={importantForAutofill}
        rightIcon={{
          render: isPasswordVisible ? (
            <Eye size={20} color={Colors.grey400} />
          ) : (
            <EyeSlash size={20} color={Colors.grey400} />
          ),
          onPress: () => setIsPasswordVisible((prev) => !prev),
        }}
        {...rest}
      />
    );
  },
);
PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
