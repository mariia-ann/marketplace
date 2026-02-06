import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

type shopDetailsStep5 = {
  recurrence: string;
  paymentDay: string;
  minimumSumm: number;
  termsAccepted: boolean;
};

const FinancialSettings = () => {
  const initialValues: shopDetailsStep5 = {
    recurrence: '',
    paymentDay: '',
    minimumSumm: 0,
    termsAccepted: false,
  };

  const shopDetailsStep5Schema = Yup.object({
    recurrence: Yup.string().trim().required('Recurrence is required'),
    paymentDay: Yup.string().trim().required('Payment day is required'),
    minimumSumm: Yup.number()
      .typeError('Minimum sum must be a number')
      .positive('Minimum sum must be positive')
      .required('Minimum sum is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('Terms acceptance is required'),
  });

  const handleDataSave = (values: shopDetailsStep5) => {
    console.warn(`proceed to step4 with ${values}`);
    router.push(`/seller_profile/create-shop/step2`);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={shopDetailsStep5Schema}
          onSubmit={handleDataSave}
        >
          {({
            errors,
            touched,
            isValid,
            dirty,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => {
            const isFormValid = isValid && dirty;
            return (
              <>
                <Text style={[styles.secondaryText, { marginTop: 16 }]}>
                  Налаштування виплат
                </Text>
                {/* TODO: These two below should be a dropdown */}
                <BasicFormInput
                  label='Періодичність'
                  placeholder='Щотижня'
                  onChangeText={(text) => setFieldValue('recurrence', text)}
                  onBlur={handleBlur('recurrence')}
                  noTextError={true}
                  errorMessage={
                    touched.recurrence && errors.recurrence
                      ? errors.recurrence
                      : undefined
                  }
                />
                <BasicFormInput
                  label='День виплат'
                  placeholder='П’ятниця'
                  onChangeText={(text) => setFieldValue('paymentDay', text)}
                  onBlur={handleBlur('paymentDay')}
                  noTextError={true}
                  errorMessage={
                    touched.paymentDay && errors.paymentDay
                      ? errors.paymentDay
                      : undefined
                  }
                />

                <PrimaryButton
                  style={{ marginTop: 23 }}
                  size='L'
                  title='Продовжити'
                  onPress={() => handleSubmit()}
                  active={isFormValid}
                />
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinancialSettings;

const styles = StyleSheet.create({
  secondaryText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
  },
  inputHintText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.grey400,
    textAlign: 'right',
    marginTop: 8,
  },
  uploadButtonBox: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.softPurple,
  },
});
