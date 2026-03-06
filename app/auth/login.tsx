import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { router } from 'expo-router';
import { useLogin } from '@/src/features/auth/hooks';
import { isAxiosError } from 'axios';
import { RequireGuest } from '@/src/features/auth/guards';
import { Formik } from 'formik';
import {
  LoginFormValues,
  loginSchema,
  normalizeIdentifier,
} from '@/src/features/auth/schemas/login.schema';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import LinkButton from '@/src/components/common/buttons/LinkButton';
import PasswordInput from '@/src/components/common/customInput/PasswordInput';

const Login = () => {
  const { mutate: doLogin, isPending, error, isSuccess, reset } = useLogin();
  const initialValues: LoginFormValues = {
    identifier: '',
    password: '',
  };

  const loginErrorMsg = (() => {
    if (!error) return undefined;
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400 || status === 401) return 'Невірний email або пароль';
      return 'Помилка входу. Спробуйте ще раз.';
    }
    return 'Сталася несподівана помилка.';
  })();

  useEffect(() => {
    if (isSuccess) {
      router.replace('/(tabs)');
    }
  }, [isSuccess]);

  return (
    <RequireGuest to='/(tabs)'>
      <SafeAreaView edges={['bottom']} style={styles.container}>
        <NavigationHeader
          title='З поверненням!'
          showBack
          onBack={() => router.back()}
        />
        <Text style={{ ...styles.fontTheme, ...styles.heading }}>
          Вітаємо у нашому Маркетплейсі!
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          validateOnMount
          onSubmit={(values) => {
            doLogin({
              identifier: normalizeIdentifier(values.identifier),
              password: values.password.trim(),
            });
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
            setFieldValue,
          }) => {
            const isFormValid = isValid && dirty;

            return (
              <View>
                <BasicFormInput
                  label='email/телефон'
                  placeholder='email@gmail.com'
                  value={values.identifier}
                  onChangeText={(text) => {
                    if (error) reset();
                    setFieldValue('identifier', text);
                  }}
                  onBlur={handleBlur('identifier')}
                  errorMessage={
                    touched.identifier && errors.identifier
                      ? errors.identifier
                      : undefined
                  }
                />

                <PasswordInput
                  label='Введіть пароль'
                  placeholder='Пароль'
                  textContentType='none'
                  onChangeText={(text) => {
                    if (error) reset(); // clear server error when user edits credentials
                    setFieldValue('password', text); // Formik state only
                  }}
                  onBlur={handleBlur('password')}
                  errorMessage={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: loginErrorMsg
                      ? 'space-between'
                      : 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {loginErrorMsg && (
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: 12,
                      }}
                    >
                      {loginErrorMsg ?? ' '}
                    </Text>
                  )}

                  <LinkButton
                    title='Забули пароль?'
                    onPress={() => {
                      router.push('/auth/forgot-password');
                    }}
                    underline={loginErrorMsg ? true : false}
                    color={loginErrorMsg ? Colors.softPurple : Colors.grey400}
                    style={{ alignSelf: 'flex-end', paddingTop: 8 }}
                    textStyle={{ fontWeight: '600' }}
                  />
                </View>
                <PrimaryButton
                  title={isPending ? 'Входимо...' : 'Увійти'}
                  onPress={() => {
                    if (isFormValid) handleSubmit();
                  }}
                  size='L'
                  active={!isPending && isFormValid}
                  disabled={isPending || !isFormValid}
                  style={{ marginTop: 14 }}
                />
              </View>
            );
          }}
        </Formik>
        {/* <AntIcons name={"google"} size={30} /> */}
        <Text style={styles.socialmediatextloginstyle}>
          або увійдіть за допомогою
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 35,
            paddingTop: 24,
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
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 24,
          }}
        >
          <Text style={styles.ifsignedin}>Ще не маєте акаунт?</Text>
          <LinkButton
            title='Зареєструйтесь!'
            onPress={() => {
              router.push('/auth/signup');
            }}
            underline={true}
            style={{ paddingLeft: 8 }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        ></View>
      </SafeAreaView>
    </RequireGuest>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  fontTheme: { color: Colors.blackMain, fontFamily: 'Manrope' },
  heading: {
    fontSize: 16,
    marginTop: 32,
    marginBottom: 18,
    textAlign: 'center',
  },
  socialmediatextloginstyle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Manrope',
    paddingTop: 24,
    color: Colors.grey400,
  },
  ifsignedin: {
    color: Colors.grey400,
    fontFamily: 'Manrope',
  },
  socialMediaiconStyle: {
    width: 48,
    height: 48,
  },
});
