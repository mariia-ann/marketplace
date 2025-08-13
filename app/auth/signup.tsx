import CustomButton from '@/app-example/components/CustomButton';
import CheckBox from '@/app-example/components/ui/customInput/Checkbox';
import CustomInput from '@/app-example/components/ui/customInput/Input';
import { CUSTOM_ICON_REF } from '@/app-example/components/ui/SvgIcons/IconRef';
import SvgIcons from '@/app-example/components/ui/SvgIcons/SvgIcons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [siginAs, setSigninAs] = useState<string>('buyer')
  const [checked, setChecked] = useState<boolean>(false);

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  const style = {
    backArrowWrapper: {
      // position: 'absolute',
      // left: 20,
      // top: 70,
      // zIndex: 1,
    },
    backIconCircle: {
      backgroundColor: '#AC94E8',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  const inactivebtncss = { borderColor: "#999999", color: "#170F2B", backgroundColor: "#ffffff" };

  return (
    <ScrollView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 22, ...styles.fontTheme }}>Створити акаунт</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", paddingTop: 20 }}>
        <CustomButton
          title='Покупця' 
          customStyles={{ padding: 10, borderTopRightRadius: 0, borderBottomRightRadius: 0, width: "50%", ...(siginAs === 'Продавця' && inactivebtncss) }} 
          customTextStyles={{ ...(siginAs === "Продавця" && { color: "#170F2B" }) }} 
          onPress={() => { setSigninAs('Покупця') }} 
        />
        <CustomButton 
          title='Продавця' 
          customStyles={{ padding: 10, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: "50%", ...(siginAs === 'Покупця' && inactivebtncss) }} 
          customTextStyles={{ ...(siginAs === "Покупця" ? { color: "#170F2B" } : { color: "#fff" }) }} 
          onPress={() => { setSigninAs('Продавця') }}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row", paddingTop: 30, paddingBottom: 20 }}>
        <Text style={{ fontSize: 15, textAlign: "center", ...styles.fontTheme }}>Заповніть вашу інформацію нижче або зареєструйтесь за допомогою свого облікового запису в соціальних мережах </Text>
      </View>
      <CustomInput
        textStyle={styles.label}
        directionRow
        label='email/телефон'
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        customStyle={{ ...styles.input, ...styles.fontTheme }}
      />
      <CustomInput
        textStyle={styles.label}
        directionRow
        label='email/телефон'
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        customStyle={{ ...styles.input, ...styles.fontTheme }}
      />
      <CustomInput
        textStyle={styles.label}
        directionRow
        label='Телефон'
        placeholder="+38(0XX)-XXX-XXXX"
        value={email}
        onChangeText={setEmail}
        customStyle={{ ...styles.input, ...styles.fontTheme }}
      />
      <CustomInput
        label='Введіть пароль'
        textStyle={styles.label}
        directionRow
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        othertextprops={{
          secureTextEntry: true
        }}
        // errors={{isError: true, errorMessage: "Пароль не співпадає!"}}
        passwordInput
        passwordIconBaseStyle={{ width: 25 }}
        customStyle={styles.input}
      />
      <CustomInput
        label='Введіть пароль'
        textStyle={styles.label}
        directionRow
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        othertextprops={{
          secureTextEntry: true
        }}
        // errors={{isError: true, errorMessage: "Пароль не співпадає!"}} uncomment this when you want to add api call and pagination
        passwordInput
        passwordIconBaseStyle={{ width: 25 }}
        customStyle={styles.input}
      />
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
        <CheckBox title='Я погоджуюсь з' isChecked={checked} onPress={() => setChecked((prev) => !prev)} titleStyle={styles.checkboxTitleStyle} />
        <Text style={{ color: "#8E6CEF" }}>Умовами та положеннями</Text>
      </View>
      {/** Awaiting the functionality of login from backend when done, change false with the conditional variable */}
      {/* {true && <Text style={{color: "#D30004", textAlign: "right", paddingTop: 10}}>Пароль не співпадає!</Text>} */}
      <CustomButton title="Зареєструватись як покупець" onPress={handleLogin} customStyles={{ marginTop: 70, ...(true ? { backgroundColor: "#E3DBF7", color: "#AC94E8" } : {}) }} />
      {/* <AntIcons name={"google"} size={30} /> */}

      <Text style={styles.socialmediatextloginstyle}>або увійдіть за допомогою</Text>

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 40, paddingTop: 50 }}>
        <SvgIcons name={CUSTOM_ICON_REF.Google} baseStyle={styles.socialMediaiconStyle} />
        <SvgIcons name={CUSTOM_ICON_REF.Facebook} baseStyle={styles.socialMediaiconStyle} />
        <SvgIcons name={CUSTOM_ICON_REF.Apple} baseStyle={styles.socialMediaiconStyle} />
      </View>

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: 30, paddingBottom: 70 }}>
        <Text style={styles.ifsignedin}>вже маєте акаунт?</Text>
        <Text style={{ color: "#8E6CEF", paddingLeft: 10, fontFamily: "Manrope" }}>Увійдіть</Text>
      </View>

    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", padding: 20 },
  fontTheme: { color: "#170F2B", fontFamily: "Manrope" },
  heading: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
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
    // fontWeight: "600",
    // "&:hover": {}
  },
  socialmediatextloginstyle: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Manrope",
    paddingTop: 30,
    color: "#999999"
  },
  ifsignedin: {
    color: "#999999",
    fontFamily: "Manrope",
  },
  socialMediaiconStyle: {
    width: 45,
    height: 45
  },
});
