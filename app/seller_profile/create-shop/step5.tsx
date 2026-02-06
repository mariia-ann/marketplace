import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import {
  DeliveryFormState,
  DeliveryMethodKey,
} from '@/src/features/sellers_profile/create_shop/types';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

const DELIVERY_METHOD_LABELS: Record<DeliveryMethodKey, string> = {
  SELF_PICKUP: 'Самовивіз',
  NP_BRANCH: 'Відділення Нова Пошта',
  NP_LOCKER: 'Поштомат Нова Пошта',
  NP_COURIER: 'Кур’єр Нова Пошта',
  UP_BRANCH: 'Відділення УкрПошта',
  MEEST: 'Meest',
} as const;

const DELIVERY_METHODS_ORDER: DeliveryMethodKey[] = [
  'SELF_PICKUP',
  'NP_BRANCH',
  'NP_LOCKER',
  'NP_COURIER',
  'UP_BRANCH',
  'MEEST',
];

const FinancialSettings = () => {
  const initialValues: DeliveryFormState = {
    methods: {
      SELF_PICKUP: false,
      NP_BRANCH: false,
      NP_LOCKER: false,
      NP_COURIER: false,
      UP_BRANCH: false,
      MEEST: false,
    },
    costMode: 'CARRIER_TARIFF',
    shipmentTimeText: '',
    uaOblasts: [],
    countries: [],
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

  const handleDataSave = (values: DeliveryFormState) => {
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
            values,
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
                  Оберіть доступні способи доставки
                </Text>
                {/* This should render a list of delivery methods check boxes */}
                {DELIVERY_METHODS_ORDER.map((k) => (
                  <CheckBox
                    key={k}
                    title={DELIVERY_METHOD_LABELS[k]}
                    titleStyle={styles.secondaryText}
                    isChecked={values.methods[k]}
                    onPress={() =>
                      setFieldValue(`methods.${k}`, !values.methods[k])
                    }
                  />
                ))}
                <Text style={styles.secondaryText}>Вартість доставки</Text>
                {/* TODO: These two below should be a dropdown */}
                <Text style={styles.secondaryText}>
                  Орієнтовні терміни відправки
                </Text>
                <BasicFormInput
                  label=''
                  placeholder='1-3 дні'
                  onChangeText={(text) =>
                    setFieldValue('shipmentTimeText', text)
                  }
                  onBlur={handleBlur('shipmentTimeText')}
                  noTextError={true}
                  errorMessage={
                    touched.shipmentTimeText && errors.shipmentTimeText
                      ? errors.shipmentTimeText
                      : undefined
                  }
                />
                <Text style={styles.inputHintText}>
                  графік відправки або терміни
                </Text>

                <Text style={styles.secondaryText}>
                  Географічні зони доставки по Україні
                </Text>
                <Text style={styles.secondaryText}>
                  Географічні зони доставки за кордон
                </Text>

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
