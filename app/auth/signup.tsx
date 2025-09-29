import CustomButton from "@/src/components/CustomButton";
import CheckBox from "@/src/components/ui/customInput/Checkbox";
import CustomInput from "@/src/components/ui/customInput/Input";
import { CUSTOM_ICON_REF } from "@/src/components/ui/SvgIcons/IconRef";
import SvgIcons from "@/src/components/ui/SvgIcons/SvgIcons";
import { useRegisterAndLogin } from "@/src/features/auth/hooks";
import { signUpSchema } from "@/src/features/auth/validationSchema";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

const Signup = () => {
  const [signInAs, setSignInAs] = useState<"Покупця" | "Продавця">("Покупця");
  const { mutateAsync: registerAndLogin, isPending } = useRegisterAndLogin();

  const inactivebtncss = {
    borderColor: "#999999",
    color: "#170F2B",
    backgroundColor: "#ffffff",
  };

  return (
    <Formik<FormValues>
      initialValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      }}
      validationSchema={signUpSchema}
      validateOnBlur
      validateOnChange
      onSubmit={async (values, { setFieldError, setStatus }) => {
        try {
          await registerAndLogin({
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            role: signInAs === "Покупця" ? "buyer" : "seller",
          });
          // navigate on success, e.g. router.replace("/home")
        } catch (err: any) {
          const status = err?.response?.status;
          const data = err?.response?.data;
          // map common server errors
          if (status === 409) {
            setFieldError(
              "email",
              data?.message ?? "Email вже використовується"
            );
          } else if (status === 422 && data?.errors) {
            Object.entries<string>(data.errors).forEach(([k, v]) =>
              setFieldError(k as keyof FormValues, v)
            );
          } else {
            setStatus(data?.message ?? "Помилка реєстрації. Спробуйте ще раз.");
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        isValid,
        dirty,
      }) => (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          {/* Title */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{ textAlign: "center", fontSize: 22, ...styles.fontTheme }}
            >
              Створити акаунт
            </Text>
          </View>

          {/* Buyer / Seller */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <CustomButton
              title='Покупця'
              customStyles={{
                padding: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                width: "50%",
                ...(signInAs === "Продавця" && inactivebtncss),
              }}
              customTextStyles={{
                ...(signInAs === "Продавця" && { color: "#170F2B" }),
              }}
              onPress={() => setSignInAs("Покупця")}
            />
            <CustomButton
              title='Продавця'
              customStyles={{
                padding: 10,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: "50%",
                ...(signInAs === "Покупця" && inactivebtncss),
              }}
              customTextStyles={{
                ...(signInAs === "Покупця"
                  ? { color: "#170F2B" }
                  : { color: "#fff" }),
              }}
              onPress={() => setSignInAs("Продавця")}
            />
          </View>

          {/* Subtitle */}
          <View
            style={{ flexDirection: "row", paddingTop: 30, paddingBottom: 20 }}
          >
            <Text
              style={{ fontSize: 15, textAlign: "center", ...styles.fontTheme }}
            >
              Заповніть вашу інформацію нижче або зареєструйтесь за допомогою
              свого облікового запису в соціальних мережах
            </Text>
          </View>
          {/* Name */}
          <CustomInput
            textStyle={styles.label}
            directionRow
            label='Name'
            placeholder='Name'
            value={values.name}
            onChangeText={(t: string) => setFieldValue("name", t)}
            onBlur={() => setFieldTouched("name", true)}
            customStyle={{ ...styles.input, ...styles.fontTheme }}
            errors={
              touched.name && errors.name
                ? { isError: true, errorMessage: errors.name }
                : undefined
            }
          />

          {/* Email */}
          <CustomInput
            textStyle={styles.label}
            directionRow
            label='Email'
            placeholder='Email'
            value={values.email}
            onChangeText={(t: string) => setFieldValue("email", t)}
            onBlur={() => setFieldTouched("email", true)}
            customStyle={{ ...styles.input, ...styles.fontTheme }}
            errors={
              touched.email && errors.email
                ? { isError: true, errorMessage: errors.email }
                : undefined
            }
          />

          {/* Phone (optional) */}
          <CustomInput
            textStyle={styles.label}
            directionRow
            label='Телефон'
            placeholder='+38(0XX)-XXX-XXXX'
            value={values.phone}
            onChangeText={(t: string) => setFieldValue("phone", t)}
            onBlur={() => setFieldTouched("phone", true)}
            customStyle={{ ...styles.input, ...styles.fontTheme }}
            errors={
              touched.phone && errors.phone
                ? { isError: true, errorMessage: errors.phone as string }
                : undefined
            }
          />

          {/* Password */}
          <CustomInput
            label='Введіть пароль'
            textStyle={styles.label}
            directionRow
            placeholder='Password'
            value={values.password}
            onChangeText={(t: string) => setFieldValue("password", t)}
            onBlur={() => setFieldTouched("password", true)}
            othertextprops={{ secureTextEntry: true }}
            passwordInput
            passwordIconBaseStyle={{ width: 25 }}
            customStyle={styles.input}
            errors={
              touched.password && errors.password
                ? { isError: true, errorMessage: errors.password }
                : undefined
            }
          />

          {/* Confirm Password */}
          <CustomInput
            label='Підтвердіть пароль'
            textStyle={styles.label}
            directionRow
            placeholder='Password'
            value={values.confirmPassword}
            onChangeText={(t: string) => setFieldValue("confirmPassword", t)}
            onBlur={() => setFieldTouched("confirmPassword", true)}
            othertextprops={{ secureTextEntry: true }}
            passwordInput
            passwordIconBaseStyle={{ width: 25 }}
            customStyle={styles.input}
            errors={
              touched.confirmPassword && errors.confirmPassword
                ? { isError: true, errorMessage: errors.confirmPassword }
                : undefined
            }
          />

          {/* Terms */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CheckBox
              title='Я погоджуюсь з'
              isChecked={values.termsAccepted}
              onPress={() =>
                setFieldValue("termsAccepted", !values.termsAccepted)
              }
              titleStyle={styles.checkboxTitleStyle}
            />
            <Text style={{ color: "#8E6CEF" }}>Умовами та положеннями</Text>
          </View>
          {touched.termsAccepted && errors.termsAccepted ? (
            <Text
              style={{ color: "#D30004", textAlign: "right", paddingTop: 10 }}
            >
              {errors.termsAccepted as string}
            </Text>
          ) : null}

          {/* Submit */}
          <CustomButton
            title={
              signInAs === "Покупця"
                ? "Зареєструватись як покупець"
                : "Зареєструватись як продавець"
            }
            onPress={handleSubmit as any}
            customStyles={{
              marginTop: 70,
              ...(!isValid || !dirty || isPending
                ? { backgroundColor: "#E3DBF7", color: "#AC94E8" }
                : {}),
            }}
            disabled={!isValid || !dirty || isPending}
          />

          {/* Socials */}
          <Text style={styles.socialmediatextloginstyle}>
            або увійдіть за допомогою
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 40,
              paddingTop: 50,
            }}
          >
            <SvgIcons
              name={CUSTOM_ICON_REF.Google}
              baseStyle={styles.socialMediaiconStyle}
            />
            <SvgIcons
              name={CUSTOM_ICON_REF.Facebook}
              baseStyle={styles.socialMediaiconStyle}
            />
            <SvgIcons
              name={CUSTOM_ICON_REF.Apple}
              baseStyle={styles.socialMediaiconStyle}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 30,
              paddingBottom: 70,
            }}
          >
            <Text style={styles.ifsignedin}>вже маєте акаунт?</Text>
            <Text
              style={{
                color: "#8E6CEF",
                paddingLeft: 10,
                fontFamily: "Manrope",
              }}
            >
              Увійдіть
            </Text>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", padding: 20 },
  fontTheme: { color: "#170F2B", fontFamily: "Manrope" },
  label: { color: "#999999", paddingBottom: 10, fontFamily: "Manrope" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999999",
    marginBottom: 15,
    padding: 12,
  },
  checkboxTitleStyle: {
    fontSize: 16,
    color: "#170F2B",
    marginLeft: 5,
  },
  socialmediatextloginstyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Manrope",
    paddingTop: 30,
    color: "#999999",
  },
  ifsignedin: { color: "#999999", fontFamily: "Manrope" },
  socialMediaiconStyle: { width: 45, height: 45 },
});
