import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import BasicDropDown, {
  DropDownOption,
} from '@/src/components/common/dropdown/BasicDropDown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

//TODO: /by Demidas/ ADD API fecth for recurrence and paymentDay lists and remove decraled types to dedicated file.
type Recurrence = (typeof recurrenceOptions)[number]['value'];

const recurrenceOptions = [
  { value: 'weekly', label: 'Щотижня' },
  { value: 'monthly', label: 'Щомісяця' },
  { value: 'quarterly', label: 'Щокварталу' },
] as const;

type DayOfPayment = (typeof paymentDayOptions)[number]['value'];

const paymentDayOptions = [
  { value: 'monday', label: 'Понеділок' },
  { value: 'tuesday', label: 'Вівторок' },
  { value: 'wednesday', label: 'Середа' },
  { value: 'thursday', label: 'Четвер' },
  { value: 'friday', label: "П'ятниця" },
  { value: 'saturday', label: 'Субота' },
  { value: 'sunday', label: 'Неділя' },
];
type shopDetailsStep5 = {
  recurrence: Recurrence | '';
  paymentDay: DayOfPayment | '';
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
    console.warn(`proceed to step7 with ${values}`);
    //TODO: /by Demidas/ update the link according with updated user flow.
    router.push(`/seller_profile`);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
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
          const selectedRecurrenceOption: DropDownOption<Recurrence> | null =
            recurrenceOptions.find(
              (option) => option.value === values.recurrence,
            ) ?? null;
          const selectedPaymentDayOptions: DropDownOption<DayOfPayment> | null =
            paymentDayOptions.find(
              (option) => option.value === values.paymentDay,
            ) ?? null;

          return (
            <View style={{ flex: 1 }}>
              <Text style={[styles.mainText, { marginTop: 16 }]}>
                Налаштування виплат
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='on-drag'
              >
                <View style={{ marginTop: 16, gap: 16 }}>
                  {/* TODO: These two below should be a dropdown */}
                  <BasicDropDown<Recurrence>
                    options={recurrenceOptions}
                    chosenOption={selectedRecurrenceOption}
                    onSelect={(option) =>
                      setFieldValue('recurrence', option.value)
                    }
                    title='Оберіть варіант'
                    label='Періодичність'
                  />
                  <BasicDropDown<DayOfPayment>
                    options={paymentDayOptions}
                    chosenOption={selectedPaymentDayOptions}
                    onSelect={(option) =>
                      setFieldValue('paymentDay', option.value)
                    }
                    title='Оберіть день'
                    label='День виплат'
                  />

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                    }}
                  >
                    <Text style={[styles.inputHintText, { flexShrink: 0 }]}>
                      Мінімальна сума
                    </Text>
                    <View style={{ minWidth: 110 }}>
                      <BasicFormInput
                        placeholder='500'
                        style={{ flexShrink: 0 }}
                        onChangeText={(text) =>
                          setFieldValue('minimumSumm', text)
                        }
                        onBlur={handleBlur('minimumSumm')}
                        noTextError={true}
                        errorMessage={
                          touched.minimumSumm && errors.minimumSumm
                            ? errors.minimumSumm
                            : undefined
                        }
                      />
                    </View>
                    <View style={styles.currencyBox}>
                      <MaterialCommunityIcons
                        name='currency-uah'
                        size={20}
                        color='black'
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 33, gap: 12 }}>
                  <Text style={styles.mainText}>Умови</Text>

                  <View style={{ gap: 8 }}>
                    <Text style={styles.termText}>
                      Комісія: 5% з кожного продажу
                    </Text>
                    <Text style={styles.termText}>
                      Резерв на повернення: 10%
                    </Text>
                    <Text style={styles.termText}>
                      Термін утримання резерву: 30 днів
                    </Text>
                  </View>
                  <CheckBox
                    title='Даю згоду з фінансовими умовами'
                    titleStyle={styles.mainText}
                    isChecked={values.termsAccepted}
                    onPress={() => {
                      setFieldValue('termsAccepted', !values.termsAccepted);
                    }}
                  />
                </View>
              </ScrollView>
              <PrimaryButton
                style={{ marginTop: 24, alignSelf: 'flex-end' }}
                size='L'
                title='Завершити реєстрацію'
                onPress={() => handleSubmit()}
                active={isFormValid}
              />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default FinancialSettings;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.blackMain,
  },
  inputHintText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.grey400,
  },
  currencyBox: {
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 7.5,
    width: 48,
    alignItems: 'center',
  },
  termText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.blackMain,
  },
});
