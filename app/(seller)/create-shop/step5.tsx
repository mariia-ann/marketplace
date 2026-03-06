import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import { RadioButtonGroup } from '@/src/components/common/RadioButtonGroup';
import {
  DeliveryFormState,
  DeliveryMethodKey,
} from '@/src/features/sellers_profile/create_shop/types';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { CaretDown, CaretUp, PlusCircle } from 'phosphor-react-native';
import { useState } from 'react';
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
//TODO: This should be fetched from api
const DELIVERY_METHODS_ORDER: DeliveryMethodKey[] = [
  'SELF_PICKUP',
  'NP_BRANCH',
  'NP_LOCKER',
  'NP_COURIER',
  'UP_BRANCH',
  'MEEST',
];
//TODO: This should be fetched from api
const UA_REGIONS = [
  {
    code: 'UA-05',
    shortCode: 'VI',
    nameUk: 'Вінницька область',
    available: false,
  },
  {
    code: 'UA-07',
    shortCode: 'VO',
    nameUk: 'Волинська область',
    available: false,
  },
  {
    code: 'UA-12',
    shortCode: 'DP',
    nameUk: 'Дніпропетровська область',
    available: false,
  },
  {
    code: 'UA-14',
    shortCode: 'DO',
    nameUk: 'Донецька область',
    available: false,
  },
  {
    code: 'UA-18',
    shortCode: 'ZH',
    nameUk: 'Житомирська область',
    available: false,
  },
  {
    code: 'UA-21',
    shortCode: 'ZA',
    nameUk: 'Закарпатська область',
    available: false,
  },
  {
    code: 'UA-23',
    shortCode: 'ZP',
    nameUk: 'Запорізька область',
    available: false,
  },
  {
    code: 'UA-26',
    shortCode: 'IF',
    nameUk: 'Івано-Франківська область',
    available: false,
  },
  { code: 'UA-30', shortCode: 'KC', nameUk: 'Місто Київ', available: false },
  {
    code: 'UA-32',
    shortCode: 'KO',
    nameUk: 'Київська область',
    available: false,
  },
  {
    code: 'UA-35',
    shortCode: 'KR',
    nameUk: 'Кіровоградська область',
    available: false,
  },
  {
    code: 'UA-09',
    shortCode: 'LU',
    nameUk: 'Луганська область',
    available: false,
  },
  {
    code: 'UA-46',
    shortCode: 'LV',
    nameUk: 'Львівська область',
    available: false,
  },
  {
    code: 'UA-48',
    shortCode: 'MY',
    nameUk: 'Миколаївська область',
    available: false,
  },
  {
    code: 'UA-51',
    shortCode: 'OD',
    nameUk: 'Одеська область',
    available: false,
  },
  {
    code: 'UA-53',
    shortCode: 'PL',
    nameUk: 'Полтавська область',
    available: false,
  },
  {
    code: 'UA-56',
    shortCode: 'RV',
    nameUk: 'Рівненська область',
    available: false,
  },
  {
    code: 'UA-59',
    shortCode: 'SU',
    nameUk: 'Сумська область',
    available: false,
  },
  {
    code: 'UA-61',
    shortCode: 'TE',
    nameUk: 'Тернопільська область',
    available: false,
  },
  {
    code: 'UA-63',
    shortCode: 'KH',
    nameUk: 'Харківська область',
    available: false,
  },
  {
    code: 'UA-65',
    shortCode: 'HE',
    nameUk: 'Херсонська область',
    available: false,
  },
  {
    code: 'UA-68',
    shortCode: 'HM',
    nameUk: 'Хмельницька область',
    available: false,
  },
  {
    code: 'UA-71',
    shortCode: 'CK',
    nameUk: 'Черкаська область',
    available: false,
  },
  {
    code: 'UA-74',
    shortCode: 'CH',
    nameUk: 'Чернігівська область',
    available: false,
  },
  {
    code: 'UA-77',
    shortCode: 'CV',
    nameUk: 'Чернівецька область',
    available: false,
  },
  {
    code: 'UA-40',
    shortCode: 'SV',
    nameUk: 'Місто Севастополь',
    available: false,
  },
  {
    code: 'UA-43',
    shortCode: 'CR',
    nameUk: 'Автономна Республіка Крим',
    available: false,
  },
] as const;
//TODO: This should be fetched from api

const COUNTRIES_OF_DELIVERY = [
  { code: 'DE', name: 'Федеративна Республіка Німеччина', available: false },
  {
    code: 'GB',
    name: 'Сполучене Королівство Великої Британії і Північної Ірландії',
    available: false,
  },
  { code: 'PL', name: 'Республіка Польща', available: false },
  { code: 'RO', name: 'Румунія', available: false },
  { code: 'SK', name: 'Словацька Республіка', available: false },
  { code: 'CZ', name: 'Чеська Республіка', available: false },
] as const;

const DeliverySettings = () => {
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
    methods: Yup.object({
      SELF_PICKUP: Yup.boolean().required(),
      NP_BRANCH: Yup.boolean().required(),
      NP_LOCKER: Yup.boolean().required(),
      NP_COURIER: Yup.boolean().required(),
      UP_BRANCH: Yup.boolean().required(),
      MEEST: Yup.boolean().required(),
    })
      .test(
        'at-least-one',
        'Select at least one delivery method',
        (m) => !!m && Object.values(m).some(Boolean),
      )
      .required('Delivery methods are required'),
    costMode: Yup.string().trim().required('Cost mode is required'),
    shipmentTimeText: Yup.string().trim().required().optional(),
    uaOblasts: Yup.array()
      .of(Yup.string().required())
      .min(1, 'Select at least one UA oblast')
      .required('UA oblasts are required'),
    countries: Yup.array().of(Yup.string().required()).optional(),
  });

  const [regionList, setRegionList] = useState(false);
  const [countryList, setCountryList] = useState(false);

  const handleDataSave = (values: DeliveryFormState) => {
    console.warn(`proceed to step6 with ${values}`);
    router.push(`/(seller)/create-shop/step6`);
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
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
            const toggleDelvieryRegion = (code: string) => {
              const exists = values.uaOblasts.includes(code);
              setFieldValue(
                'uaOblasts',
                exists
                  ? values.uaOblasts.filter((c) => c !== code)
                  : [...values.uaOblasts, code],
              );
            };
            const toggleCountries = (code: string) => {
              const exists = values.countries.includes(code);
              setFieldValue(
                'countries',
                exists
                  ? values.countries.filter((c) => c !== code)
                  : [...values.countries, code],
              );
            };
            return (
              <>
                <Text
                  style={[styles.mainText, { marginTop: 24, marginBottom: 9 }]}
                >
                  Оберіть доступні способи доставки
                </Text>
                {/* This should render a list of delivery methods check boxes */}
                <View style={{ gap: 9, marginBottom: 24 }}>
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
                </View>

                {/* Shipping tariff block */}
                <Text style={[styles.mainText, { marginBottom: 9 }]}>
                  Вартість доставки
                </Text>
                <RadioButtonGroup
                  value={values.costMode}
                  options={[
                    { label: 'Безкоштовно', value: 'FREE' },
                    {
                      label: 'Вартість доставки за тарифами перевізника',
                      value: 'CARRIER_TARIFF',
                    },
                  ]}
                  onChange={(value) => {
                    console.warn(value);
                    setFieldValue('costMode', value);
                  }}
                />
                {/* TODO: Add the onPress action for below button which
                    will add a custom shipping cost term */}
                <Pressable style={styles.addOptionBox}>
                  <PlusCircle
                    size={32}
                    color={Colors.softPurple}
                    weight='fill'
                  />
                  <Text style={styles.addOptionBoxText}>
                    Додати свій варіант
                  </Text>
                </Pressable>

                {/* Shipping terms block */}
                <Text
                  style={[styles.mainText, { marginTop: 24, marginBottom: 8 }]}
                >
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

                {/* This should render a list of regions of delivery check boxes */}
                <View style={{ gap: 9, marginVertical: 24 }}>
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      paddingRight: 8,
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    onPress={() => setRegionList(!regionList)}
                  >
                    <Text
                      style={[
                        styles.mainText,
                        { minWidth: 0, flex: 1, flexShrink: 1 },
                      ]}
                    >
                      Географічні зони доставки по Україні
                    </Text>
                    {regionList ? (
                      <CaretUp
                        size={22}
                        color={Colors.blackMain}
                        weight='bold'
                        style={{ flexShrink: 0 }}
                      />
                    ) : (
                      <CaretDown
                        size={22}
                        color={Colors.blackMain}
                        weight='bold'
                        style={{ flexShrink: 0 }}
                      />
                    )}
                  </Pressable>
                  {regionList &&
                    UA_REGIONS.map((k) => (
                      <CheckBox
                        key={k.code}
                        title={k.nameUk}
                        isChecked={values.uaOblasts.includes(k.code)}
                        onPress={() => toggleDelvieryRegion(k.code)}
                        titleStyle={styles.secondaryText}
                      />
                    ))}
                </View>

                {/* This should render a list of countries of delivery check boxes */}
                <View style={{ gap: 9 }}>
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: 8,
                    }}
                    onPress={() => setCountryList(!countryList)}
                  >
                    <Text
                      style={[
                        styles.mainText,
                        { minWidth: 0, flex: 1, flexShrink: 1 },
                      ]}
                    >
                      Географічні зони доставки за кордон
                    </Text>
                    {countryList ? (
                      <CaretUp
                        size={22}
                        color={Colors.blackMain}
                        weight='bold'
                        style={{ flexShrink: 0 }}
                      />
                    ) : (
                      <CaretDown
                        size={22}
                        color={Colors.blackMain}
                        weight='bold'
                        style={{ flexShrink: 0 }}
                      />
                    )}
                  </Pressable>
                  {countryList &&
                    COUNTRIES_OF_DELIVERY.map((k) => (
                      <CheckBox
                        key={k.code}
                        title={k.name}
                        isChecked={values.countries.includes(k.code)}
                        onPress={() => toggleCountries(k.code)}
                        titleStyle={styles.secondaryText}
                      />
                    ))}
                </View>

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

export default DeliverySettings;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 16,
    color: Colors.blackMain,
  },
  secondaryText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.blackMain,
  },
  inputHintText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.grey400,
    textAlign: 'right',
    marginTop: 8,
  },
  addOptionBox: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addOptionBoxText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.softPurple,
  },
});
