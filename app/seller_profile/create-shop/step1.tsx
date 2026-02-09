import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import RadioButton from '@/src/components/common/buttons/RadioButton';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import { Formik } from 'formik';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const ChooseSellerType = () => {
  const validationSchema = Yup.object().shape({
    sellerType: Yup.string().required('Оберіть тип продавця'),
  });
  const initialValues = { sellerType: '' };

  return (
    <SafeAreaView
      edges={['bottom', 'top']}
      style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}
    >
      <Text style={styles.title}>Оберіть тип продавця</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.warn(`proceed to step2 with ${values.sellerType}`);

          router.push(`/seller_profile/create-shop/step2`);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          setFieldValue,
          handleSubmit,
        }) => {
          const isFormValid = isValid && dirty;
          return (
            <>
              <View style={{ flex: 1, gap: 15 }}>
                <RadioButton
                  onPress={() => setFieldValue('sellerType', 'private')}
                  selected={values.sellerType === 'private'}
                  active={true}
                  size='L'
                  title='Фізична особа'
                  textStyle={{ color: Colors.softPurple }}
                />

                <RadioButton
                  onPress={() => setFieldValue('sellerType', 'self_employed')}
                  selected={values.sellerType === 'self_employed'}
                  active={true}
                  size='L'
                  title='Фізична особа-підприємець'
                  textStyle={{ color: Colors.softPurple }}
                />
                <RadioButton
                  onPress={() => setFieldValue('sellerType', 'company')}
                  selected={values.sellerType === 'company'}
                  active={true}
                  size='L'
                  title='Юридична особа (ТОВ)'
                  textStyle={{ color: Colors.softPurple }}
                />
              </View>
              <View style={{ flexDirection: 'column', gap: 15 }}>
                <PrimaryButton
                  size='L'
                  title='Продовжити'
                  onPress={() => handleSubmit()}
                  active={isFormValid}
                />
                <SecondaryButton
                  size='L'
                  title='Допомога адміністратора'
                  onPress={() => {}}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default ChooseSellerType;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 37,
  },
});
