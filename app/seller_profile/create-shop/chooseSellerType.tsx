import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import RadioButton from '@/src/components/common/buttons/RadioButton';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import { Formik } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import * as Yup from 'yup';

const ChooseSellerType = () => {
  const validationSchema = Yup.object().shape({
    sellerType: Yup.string().required('Оберіть тип продавця'),
  });
  const initialValues = { sellerType: '' };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <Text>Оберіть тип продавця</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // next step
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
            <View style={{ flex: 1, gap: 15 }}>
              <RadioButton
                onPress={() => setFieldValue('sellerType', 'self_employed')}
                size='L'
                title='Самозайнятий'
              />
              <RadioButton
                onPress={() => setFieldValue('sellerType', 'private')}
                size='L'
                title='Фізична особа-підприємець'
              />
              <RadioButton
                onPress={() => setFieldValue('sellerType', 'company')}
                size='L'
                title='Юридична особа (ТОВ)'
              />
              <PrimaryButton
                size='L'
                title='Продовжити'
                onPress={() => handleSubmit()}
                active={isFormValid}
              />
            </View>
          );
        }}
      </Formik>
      <SecondaryButton
        size='L'
        title='Допомога адміністратора'
        onPress={() => {}}
      />
    </View>
  );
};

export default ChooseSellerType;
