import Colors from "@/constants/Colors";
import PasswordInput from "@/src/components/common/PasswordInput";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import TwoTabsSwitch from "@/src/components/ui/twoTabsSwitch";
import { signUpSchema } from "@/src/features/auth/validationSchema";
import { Formik, useField } from "formik";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

type FormValues = {
  password: string;
  confirmPassword: string;
};

function PasswordField({
  name,
  label,
  placeholder,
  showStrength,
  style,
}: {
  name: "password" | "confirmPassword";
  label: string;
  placeholder: string;
  showStrength?: boolean;
  style?: any;
}) {
  const [field, meta, helpers] = useField<string>(name);

  // Optional cosmetic strength label for the main password field
  const strengthLabel =
    showStrength && field.value ? getStrengthLabel(field.value) : undefined;

  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      value={field.value}
      onChangeText={helpers.setValue}
      onBlur={(e) => {
        // mark as touched for error display
        helpers.setTouched(true);
        // (no need to forward e to Formik when using useField)
      }}
      errorText={meta.error}
      touched={meta.touched}
      strengthLabel={strengthLabel}
      style={style}
    />
  );
}

// TODO: Delete this check if not needed (by Demidas)
// Optional password strength check
function getStrengthLabel(pwd: string) {
  const checks =
    (/.{8,}/.test(pwd) ? 1 : 0) +
    (/[A-Z]/.test(pwd) ? 1 : 0) +
    (/[a-z]/.test(pwd) ? 1 : 0) +
    (/\d/.test(pwd) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0);
  return ["Very weak", "Weak", "Fair", "Good", "Strong"][Math.min(checks, 4)];
}

export default function SignUp() {
  const [activeTab, setActiveTab] = useState<"option1" | "option2">("option1");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Formik<FormValues>
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={signUpSchema}
        validateOnBlur
        validateOnChange
        onSubmit={async (values) => {
          // TODO: call your API here
          // If server returns field-specific errors:
          // setFieldError("password", "Server says: too common");
        }}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
          >
            <Text style={styles.title}>Створити акаунт</Text>
            <TwoTabsSwitch
              option1='Покупця'
              option2='Продавця'
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <Text style={styles.subtitle}>
              Заповніть вашу інформацію нижче або зареєструйтесь за допомогою
              свого облікового запису в соціальних мережах
            </Text>
            <PasswordField
              name='password'
              style={{ alignSelf: "center" }}
              label='Введіть пароль'
              placeholder='Пароль'
            />
            <PasswordField
              name='confirmPassword'
              style={{ alignSelf: "center" }}
              label='Підтвердіть пароль'
              placeholder='Пароль'
            />
            <PrimaryButton
              title='Зареєструватись як покупець'
              onPress={handleSubmit as any}
              active={!isValid || !dirty || isSubmitting}
              size='L'
            />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 24,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  title: {
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 22,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    color: Colors.grey400,
  },
});
