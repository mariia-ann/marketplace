import CustomButton from '@/app-example/components/CustomButton';
import BackArrow from '@/app-example/components/ui/BackArrowModified';
import CustomInput from '@/app-example/components/ui/customInput/Input';
import { CUSTOM_ICON_REF } from '@/app-example/components/ui/SvgIcons/IconRef';
import SvgIcons from '@/app-example/components/ui/SvgIcons/SvgIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <BackArrow style={style} />
        <Text style={{width: "75%", textAlign: "center", fontSize: 22}}>З поверненням!</Text>
      </View>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: 30, paddingBottom: 20}}>
        <Text style={{fontSize: 15, paddingRight: 30}}>Вітаємо у нашому Маркетплейсі!</Text>
      </View>
      <CustomInput
        textStyle={styles.label}
        directionRow
        label='email/телефон'
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
        errors={{isError: true, errorMessage: "Password in incorrect"}}
        passwordInput
        passwordIconBaseStyle={{width: 25}}
        customStyle={styles.input}
      />
      {/** Awaiting the functionality of login from backend when done, change false with the conditional variable */}
      {true && <Text style={{color: "#D30004", textAlign: "right", paddingTop: 10}}>Пароль не співпадає!</Text>}
      <CustomButton title="Увійти" onPress={handleLogin} customStyles={{marginTop: 70}} />
      {/* <AntIcons name={"google"} size={30} /> */}

      <Text style={styles.socialmediatextloginstyle}>або увійдіть за допомогою</Text>

      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: 20, paddingTop: 50}}>
        <SvgIcons name={CUSTOM_ICON_REF.Google} baseStyle={styles.socialMediaiconStyle} />
        <SvgIcons name={CUSTOM_ICON_REF.Facebook} baseStyle={styles.socialMediaiconStyle} />
        <SvgIcons name={CUSTOM_ICON_REF.Apple} baseStyle={styles.socialMediaiconStyle} />
      </View>

      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: 30 }}>
        <Text style={styles.ifsignedin}>Ще не маєте акаунт?</Text>
        <Text style={{ color: "#8E6CEF", paddingLeft: 10 }}>Зареєструйтесь!</Text>
      </View>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", padding: 20 },
  heading: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  label: {color: "#999999", paddingBottom: 10},
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999999",
    marginBottom: 15,
    padding: 12,
  },
  socialmediatextloginstyle: {
    fontSize: 14, 
    textAlign: "center", 
    paddingTop: 30,
    color: "#999999"
  },
  ifsignedin: {
    color: "#999999"
  },
  socialMediaiconStyle: {
    width: 35, 
    height: 35
  }
});
