// this is a signup screen for the app which uses formik for form handling and yup for validation
// it uses a custom hook useSignup to handle the signup process
// upon successful signup, it redirects the user to the main tabs screen
// it also provides options for social media signup (Google, Apple, Facebook) though the functionality is not implemented here
// TODO: /by Demidas/ implement social media signup functionality
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import LinkButton from '@/src/components/common/buttons/LinkButton';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import TwoTabsSwitch from '@/src/components/ui/twoTabsSwitch';
import { RequireGuest } from '@/src/features/auth/guards';
import { useSignup } from '@/src/features/auth/hooks';
import {
  SignupFormValues,
  signUpSchema,
} from '@/src/features/auth/schemas/signup.schema';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignupDto } from '@/src/features/auth/api';
import { isAxiosError } from 'axios';
import PasswordInput from '@/src/components/common/customInput/PasswordInput';

const Signup = () => {
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
  const { mutate: doSignUp, isPending, error, reset } = useSignup();

  const initialValues: SignupFormValues = {
    firstName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    acceptTerms: false,
  };

  const handleSignup = (values: SignupFormValues) => {
    const { acceptTerms, repeatPassword, ...rest } = values;
    // below is just to silent the unused variable warnings
    void acceptTerms;
    void repeatPassword;
    const dto: SignupDto = {
      ...rest,
      isSeller: accountType === 'seller',
    };
    console.log('Signing up with:', dto);
    doSignUp(dto, {
      onSuccess: () => {
        router.replace({
          pathname: '/auth/signup-otp',
          params: { email: dto.email, phone: dto.phone },
        });
      },
    });
  };

  const signUpErrorMsg = (() => {
    if (!error) return undefined;
    if (isAxiosError(error)) {
      console.warn(error.message);
      const status = error.response?.status;
      if (status === 400 || status === 401) return 'Невірний email або пароль';
      return 'Помилка входу. Спробуйте ще раз.';
    }
    return 'Сталася несподівана помилка.';
  })();

  const clearSignupError = () => {
    if (error) reset();
  };

  return (
    <RequireGuest to='/(tabs)'>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <NavigationHeader title='Створити акаунт' showBack={false} />
          <TwoTabsSwitch
            containerStyle={styles.tabswitch}
            activeTab={accountType === 'buyer' ? 'option1' : 'option2'}
            option1='Покупець'
            option2='Продавець'
            onTabChange={(tab) => {
              const nextAccountType = tab === 'option1' ? 'buyer' : 'seller';
              setAccountType(nextAccountType);
              console.warn(nextAccountType);
            }}
          />
          <Text style={[styles.heading, styles.fontTheme]}>
            Заповніть вашу інформацію нижче або зареєструйтесь за допомогою
            свого облікового запису в соціальних мережах
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            validateOnMount
            onSubmit={handleSignup}
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
              const buttonTitle = isPending
                ? 'Реєструємось...'
                : accountType === 'buyer'
                  ? 'Зареєструватись як покупець'
                  : 'Зареєструватись як продавець';
              return (
                <View>
                  <BasicFormInput
                    label='Введіть своє ім’я'
                    placeholder='Ім’я'
                    noTextError={false}
                    textContentType='none'
                    autoComplete='off'
                    importantForAutofill='no'
                    value={values.firstName}
                    onChangeText={(text) => {
                      clearSignupError();
                      if (error) reset();
                      setFieldValue('firstName', text);
                    }}
                    onBlur={handleBlur('firstName')}
                    errorMessage={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : undefined
                    }
                  />
                  <BasicFormInput
                    label='email'
                    placeholder='email@gmail.com'
                    noTextError={false}
                    textContentType='none'
                    autoComplete='off'
                    importantForAutofill='no'
                    value={values.email}
                    onChangeText={(text) => {
                      clearSignupError();
                      if (error) reset();
                      setFieldValue('email', text);
                    }}
                    onBlur={handleBlur('email')}
                    errorMessage={
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />
                  <BasicFormInput
                    label='Телефон'
                    placeholder='+38(0XX)-XXX-XXXX'
                    noTextError={false}
                    textContentType='none'
                    autoComplete='off'
                    importantForAutofill='no'
                    value={values.phone}
                    onChangeText={(text) => {
                      clearSignupError();
                      if (error) reset();
                      setFieldValue('phone', text);
                    }}
                    onBlur={handleBlur('phone')}
                    errorMessage={
                      touched.phone && errors.phone ? errors.phone : undefined
                    }
                  />
                  <PasswordInput
                    label='Введіть пароль'
                    placeholder='Пароль'
                    textContentType='none'
                    autoComplete='off'
                    importantForAutofill='no'
                    value={values.password}
                    onChangeText={(text) => {
                      clearSignupError();
                      if (error) reset();
                      setFieldValue('password', text);
                    }}
                    onBlur={handleBlur('password')}
                    errorMessage={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />

                  <PasswordInput
                    label='Підтвердіть пароль'
                    placeholder='Пароль'
                    textContentType='none'
                    autoComplete='off'
                    importantForAutofill='no'
                    value={values.repeatPassword}
                    onChangeText={(text) => {
                      clearSignupError();
                      if (error) reset();
                      setFieldValue('repeatPassword', text);
                    }}
                    onBlur={handleBlur('repeatPassword')}
                    errorMessage={
                      touched.repeatPassword ? errors.repeatPassword : undefined
                    }
                  />
                  <View style={styles.termsAndConditionsContainer}>
                    <CheckBox
                      title='Я погоджуюсь з'
                      isChecked={values.acceptTerms}
                      onPress={() =>
                        setFieldValue('acceptTerms', !values.acceptTerms)
                      }
                      titleStyle={styles.checkboxTitleStyle}
                    />
                    <LinkButton
                      title='Умовами та положеннями'
                      onPress={() => {
                        router.push('/');
                      }}
                      underline={true}
                      textStyle={styles.linkButtonTextStyle}
                    />
                  </View>

                  <View style={{ minHeight: 10, marginTop: 6 }}></View>
                  {signUpErrorMsg && (
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: 10,
                      }}
                    >
                      {signUpErrorMsg ?? ' '}
                    </Text>
                  )}
                  <PrimaryButton
                    title={buttonTitle}
                    onPress={handleSubmit}
                    size='L'
                    active={!isPending && isFormValid}
                    disabled={isPending || !isFormValid}
                    style={{ marginTop: 14 }}
                  />
                </View>
              );
            }}
          </Formik>

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
              gap: 8,
            }}
          >
            <Text style={styles.ifsignedin}>вже маєте акаунт?</Text>
            <LinkButton
              title='Увійдіть'
              onPress={() => {
                router.push('/auth/login');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </RequireGuest>
  );
};

export default Signup;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  scroll: { flex: 1 },
  container: {
    paddingHorizontal: 20,
  },
  tabswitch: { marginTop: 23, marginBottom: 24 },
  fontTheme: { color: Colors.grey400, fontFamily: 'Manrope' },
  heading: { fontSize: 14, marginBottom: 24, textAlign: 'center' },
  termsAndConditionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxTitleStyle: {
    fontSize: 14,
    color: Colors.blackMain,
    fontFamily: 'Manrope',
  },
  linkButtonTextStyle: {
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  socialmediatextloginstyle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Manrope',
    paddingTop: 30,
    color: '#999999',
  },
  ifsignedin: {
    color: '#999999',
    fontFamily: 'Manrope',
    fontSize: 16,
  },
  socialMediaiconStyle: {
    width: 48,
    height: 48,
  },
});
