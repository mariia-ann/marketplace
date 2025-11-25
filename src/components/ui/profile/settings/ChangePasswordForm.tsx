import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Eye, EyeClosed } from "phosphor-react-native";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Введіть старий пароль"),
  newPassword: Yup.string()
    .required("Введіть новий пароль")
    .min(8, "Мінімум 8 символів")
    .matches(/[0-9]/, "Повинен містити цифру")
    .matches(/[a-z]/, "Повинен містити малу літеру")
    .matches(/[A-Z]/, "Повинен містити велику літеру")
    .matches(/[^\w]/, "Повинен містити символ"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Пароль не співпадає")
    .required("Підтвердіть новий пароль"),
});

export default function ChangePasswordForm() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOldFocused, setIsOldFocused] = useState(false);
  const [isNewFocused, setIsNewFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  // const [showConfirmErrorIcon, setShowConfirmErrorIcon] = useState(false);

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          {/* Старий пароль */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Введіть поточний пароль</Text>
            <View
              style={[
                styles.passwordWrapper,
                isOldFocused && styles.focusedBorder,
              ]}
            >
              <TextInput
                style={styles.input}
                secureTextEntry={!showOld}
                value={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                onBlur={() => setIsOldFocused(false)}
                onFocus={() => setIsOldFocused(true)}
                placeholder="Поточний пароль"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                {showOld ? (
                  <Eye size={32} weight="thin" color="#999999" />
                ) : (
                  <EyeClosed size={32} weight="thin" color="#999999" />
                )}
              </TouchableOpacity>
            </View>
            {touched.oldPassword && errors.oldPassword && (
              <Text style={styles.error}>{errors.oldPassword}</Text>
            )}
          </View>

          {/* Новий пароль */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Введіть новий пароль</Text>
            <View
              style={[
                styles.passwordWrapper,
                isNewFocused && styles.focusedBorder,
              ]}
            >
              <TextInput
                style={styles.input}
                secureTextEntry={!showNew}
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                onBlur={(e) => {
                  handleBlur("newPassword")(e);
                  setIsNewFocused(false);
                }}
                onFocus={() => setIsNewFocused(true)}
                placeholder="Новий пароль"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                {showNew ? (
                  <Eye size={32} weight="thin" color="#999999" />
                ) : (
                  <EyeClosed size={32} weight="thin" color="#999999" />
                )}
              </TouchableOpacity>
            </View>
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.error}>{errors.newPassword}</Text>
            )}
          </View>

          {/* Підтвердження паролю */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Підтвердіть новий пароль</Text>
            <View
              style={[
                styles.passwordWrapper,
                isConfirmFocused && styles.focusedBorder,
              ]}
            >
              <TextInput
                style={styles.input}
                secureTextEntry={!showConfirm}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={(e) => {
                  handleBlur("confirmPassword")(e);
                  setIsConfirmFocused(false);

                  // setShowConfirmErrorIcon(
                  //   values.confirmPassword !== values.newPassword &&
                  //     values.confirmPassword.length > 0
                  // );
                }}
                onFocus={() => {
                  setIsConfirmFocused(true);
                  // setShowConfirmErrorIcon(false);
                }}
                placeholder="Новий пароль"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                {/* {showConfirmErrorIcon ? (
                  <WarningCircle size={24} color="#D30004" />
                ) : */}
                {showConfirm ? (
                  <Eye size={32} weight="thin" color="#999999" />
                ) : (
                  <EyeClosed size={32} weight="thin" color="#999999" />
                )}
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSubmit}
          >
            <Text style={styles.saveButtonText}>Зберегти зміни</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  inputContainer: {},
  label: {
    fontSize: 12,
    fontFamily: "Manrope",
    marginBottom: 8,
    color: "#999999",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    // paddingVertical: 6,
  },
  focusedBorder: {
    borderColor: "#8E6CEF",
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Manrope",
    color: "#999999",
    borderWidth: 0,
    // outlineStyle: "none", // щоб в браузері не було бордера
    paddingVertical: 14,
  },
  error: {
    color: "#D30004",
    fontSize: 12,
    marginTop: 8,
    fontFamily: "Manrope",
  },
  saveButton: {
    backgroundColor: "#8E6CEF",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Outfit-Bold",
  },
});
