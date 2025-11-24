import { CUSTOM_ICON_REF } from "@/src/components/common/SvgIcons/IconRef";
import SvgIcons from "@/src/components/common/SvgIcons/SvgIcons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { NavigationHeader } from "@/src/components/common/NavigationHeader";
import { router } from "expo-router";
import PrimaryButton from "@/src/components/common/buttons/PrimaryButton";
import BasicFormInput from "@/src/components/common/customInput/BasicFormInput";
import { useLogin } from "@/src/features/auth/hooks";
import { isAxiosError } from "axios";
import { RequireGuest } from "@/src/features/auth/guards";

const Login = () => {
  const { mutate: doLogin, isPending, error, isSuccess } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginErrorMsg = (() => {
    if (!error) return undefined;
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400 || status === 401) return "Невірний email або пароль";
      return "Помилка входу. Спробуйте ще раз.";
    }
    return "Сталася несподівана помилка.";
  })();

  const handleSubmit = () => {
    doLogin({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(tabs)");
    }
  }, [isSuccess]);

  return (
    <RequireGuest to="/(tabs)">
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <NavigationHeader
          title="З поверненням!"
          showBack
          onBack={() => router.back()}
        />
        <Text style={{ ...styles.fontTheme, ...styles.heading }}>
          Вітаємо у нашому Маркетплейсі!
        </Text>
        <View style={{ gap: 20 }}>
          <BasicFormInput
            label="email/телефон"
            placeholder="email@gmail.com"
            value={email}
            onChangeText={setEmail}
            // errorMessage='Невірний формат email'
          />
          <BasicFormInput
            label="Введіть пароль"
            placeholder="Пароль"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            errorMessage={loginErrorMsg}
          />
          <PrimaryButton
            title={isPending ? "Входимо..." : "Увійти"}
            onPress={handleSubmit}
            size="L"
            active={!isPending && !!email && !!password}
          />
        </View>
        {/* <AntIcons name={"google"} size={30} /> */}

        <Text style={styles.socialmediatextloginstyle}>
          або увійдіть за допомогою
        </Text>

        <View
          style={{
            display: "flex",
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
            name={CUSTOM_ICON_REF.Apple}
            baseStyle={styles.socialMediaiconStyle}
          />
          <SvgIcons
            name={CUSTOM_ICON_REF.Facebook}
            baseStyle={styles.socialMediaiconStyle}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <Text style={styles.ifsignedin}>Ще не маєте акаунт?</Text>
          <Text
            style={{ color: "#8E6CEF", paddingLeft: 10, fontFamily: "Manrope" }}
          >
            Зареєструйтесь!
          </Text>
        </View>
      </SafeAreaView>
    </RequireGuest>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  fontTheme: { color: Colors.blackMain, fontFamily: "Manrope" },
  heading: {
    fontSize: 16,
    marginTop: 32,
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey400,
    marginBottom: 15,
    padding: 12,
  },
  socialmediatextloginstyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Manrope",
    paddingTop: 30,
    color: Colors.grey400,
  },
  ifsignedin: {
    color: Colors.grey400,
    fontFamily: "Manrope",
  },
  socialMediaiconStyle: {
    width: 45,
    height: 45,
  },
});
