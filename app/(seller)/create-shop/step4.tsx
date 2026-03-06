import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { PlusCircle } from 'phosphor-react-native';
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

interface Address {
  city?: string;
  street?: string;
  building?: string;
  zip?: string;
}

type shopDetailsStep4 = {
  phone: string;
  workingHours: string;
  address: Address;
};

const ShopContactDetails = () => {
  const initialValues: shopDetailsStep4 = {
    phone: '',
    workingHours: '',
    address: {
      city: '',
      street: '',
      building: '',
      zip: '',
    },
  };

  const shopDetailsStep4Schema = Yup.object({
    phone: Yup.string().trim().required('Phone number is required'),
  });

  const handleDataSave = (values: shopDetailsStep4) => {
    console.warn(`proceed to step4 with ${JSON.stringify(values)}`);
    router.push(`/(seller)/create-shop/step5`);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={shopDetailsStep4Schema}
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
              <View style={{ marginTop: 35 }}>
                <BasicFormInput
                  label='Телефон'
                  placeholder='+38(0XX)-XXX-XXXX'
                  onChangeText={(text) => setFieldValue('phone', text)}
                  onBlur={handleBlur('phone')}
                  noTextError={true}
                  errorMessage={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
                />
                <Text style={styles.inputHintText}>
                  для зв’язку з адміністратором застосунку
                </Text>
                <Text
                  style={[
                    styles.secondaryText,
                    { marginTop: 24, marginBottom: 16 },
                  ]}
                >
                  Робочі години
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <BasicFormInput
                      label='Дні'
                      placeholder='пн - пт'
                      onChangeText={(text) =>
                        setFieldValue('workingHours', text)
                      }
                      onBlur={handleBlur('workingHours')}
                      noTextError={true}
                      errorMessage={
                        touched.workingHours && errors.workingHours
                          ? errors.workingHours
                          : undefined
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <BasicFormInput
                      label='години'
                      placeholder='9:00 - 19:00'
                      onChangeText={(text) =>
                        setFieldValue('workingHours', text)
                      }
                      onBlur={handleBlur('workingHours')}
                      noTextError={true}
                      errorMessage={
                        touched.workingHours && errors.workingHours
                          ? errors.workingHours
                          : undefined
                      }
                    />
                  </View>
                </View>
                <Pressable style={[styles.uploadButtonBox, { marginTop: 16 }]}>
                  <PlusCircle
                    size={26}
                    color={Colors.softPurple}
                    weight='fill'
                  />
                  <Text style={styles.uploadButtonText}>Додати дні</Text>
                </Pressable>
                <View
                  style={{ marginTop: 24, flexDirection: 'column', gap: 16 }}
                >
                  <Text style={styles.secondaryText}>Адреса магазину</Text>
                  <BasicFormInput
                    label='Місто'
                    placeholder='Назва'
                    onChangeText={(text) => setFieldValue('address.city', text)}
                    onBlur={handleBlur('address.city')}
                    noTextError={true}
                    errorMessage={
                      touched.address?.city && errors.address?.city
                        ? errors.address?.city
                        : undefined
                    }
                  />
                  <BasicFormInput
                    label='Вулиця'
                    placeholder='Назва'
                    onChangeText={(text) =>
                      setFieldValue('address.street', text)
                    }
                    onBlur={handleBlur('address.street')}
                    noTextError={true}
                    errorMessage={
                      touched.address?.street && errors.address?.street
                        ? errors.address?.street
                        : undefined
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 20,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <BasicFormInput
                        label='Будинок'
                        placeholder='Назва'
                        onChangeText={(text) =>
                          setFieldValue('address.building', text)
                        }
                        onBlur={handleBlur('address.building')}
                        noTextError={true}
                        errorMessage={
                          touched.address?.building && errors.address?.building
                            ? errors.address?.building
                            : undefined
                        }
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <BasicFormInput
                        label='Індекс'
                        placeholder='12345'
                        onChangeText={(text) =>
                          setFieldValue('address.zip', text)
                        }
                        onBlur={handleBlur('address.zip')}
                        noTextError={true}
                        errorMessage={
                          touched.address?.zip && errors.address?.zip
                            ? errors.address?.zip
                            : undefined
                        }
                      />
                    </View>
                  </View>
                  <Pressable style={styles.uploadButtonBox}>
                    <PlusCircle
                      size={26}
                      color={Colors.softPurple}
                      weight='fill'
                    />
                    <Text style={styles.uploadButtonText}>
                      Додати адресу магазину (або складу)
                    </Text>
                  </Pressable>
                  <Text style={[styles.inputHintText, { textAlign: 'left' }]}>
                    Ви можете додати адресу магазину або складу за необхідності.
                  </Text>
                </View>

                <PrimaryButton
                  style={{ marginTop: 23 }}
                  size='L'
                  title='Продовжити'
                  onPress={() => handleSubmit()}
                  active={isFormValid}
                />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopContactDetails;

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
