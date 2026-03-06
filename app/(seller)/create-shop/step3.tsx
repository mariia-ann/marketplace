import * as Yup from 'yup';
import Colors from '@/constants/Colors';
import { Formik } from 'formik';
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import { CloudArrowDown, PlusCircle, Swap, Trash } from 'phosphor-react-native';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import { pickPdfOrJpeg, type UploadFile } from '@/src/utils/documentUpload';

interface Address {
  city: string;
  street: string;
  building: string;
  zip: string;
}

type shopDetailsStep3 = {
  taxNumber: string;
  dateOfTaxNumber: string;
  IBAN: string;
  bankName: string;
  ownerName: string;
  bankConfirmation: UploadFile | null;
  fopCertificate: UploadFile | null;
  legalAddress: Address;
};

const LegalDetails = () => {
  const initialValues: shopDetailsStep3 = {
    taxNumber: '',
    dateOfTaxNumber: '',
    IBAN: '',
    bankName: '',
    ownerName: '',
    bankConfirmation: null,
    fopCertificate: null,
    legalAddress: {
      city: '',
      street: '',
      building: '',
      zip: '',
    },
  };

  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
  const ALLOWED_MIME = new Set(['application/pdf', 'image/jpeg']);
  const MAX_BYTES = 10 * 1024 * 1024; // 10MB
  const fileSchema = Yup.mixed<UploadFile>()
    .nullable()
    .required('Document is required')
    .test('file-required', 'Document is required', (value) => !!value)
    .test('file-type', 'Only PDF or JPEG is allowed', (value) => {
      if (!value) return false;
      return ALLOWED_MIME.has(value.mimeType);
    })
    .test('file-size', 'File is too large', (value) => {
      if (!value) return false;
      if (typeof value.size !== 'number') return true; // size can be missing on Android
      return value.size <= MAX_BYTES;
    });

  const shopDetailsStep3Schema = Yup.object({
    taxNumber: Yup.string().trim().required('Tax number is required'),
    dateOfTaxNumber: Yup.date()
      .typeError('Date is required')
      .required('Date is required'),
    IBAN: Yup.string()
      .transform((v) => (v ? v.replace(/\s+/g, '').toUpperCase() : v))
      .matches(ibanRegex, 'Invalid IBAN format')
      .required('IBAN is required'),
    bankName: Yup.string().trim().required('Bank name is required'),
    ownerName: Yup.string().trim().required('Owner name is required'),

    bankConfirmation: fileSchema,
    fopCertificate: fileSchema,

    legalAddress: Yup.object({
      city: Yup.string().trim().required('City is required'),
      street: Yup.string().trim().required('Street is required'),
      building: Yup.string().trim().required('Building is required'),
      zip: Yup.string().trim().required('ZIP code is required'),
    }),
  });

  // TODO: refactor both handlers to separate component to avoid code duplication
  // documet upload handlers for bank confirmation and FOP certificate, they use the same file picker but different field in formik values:
  const onPickBankConfirmation = async (
    setFieldValue: (field: string, value: UploadFile) => void,
  ) => {
    try {
      const file = await pickPdfOrJpeg();
      if (!file) return;
      setFieldValue('bankConfirmation', file);
    } catch (e: any) {
      Alert.alert('Upload error', e?.message ?? 'Failed to pick file');
    }
  };
  const onPickFopCertificate = async (
    setFieldValue: (field: string, value: UploadFile) => void,
  ) => {
    try {
      const file = await pickPdfOrJpeg();
      if (!file) return;
      setFieldValue('fopCertificate', file);
    } catch (e: any) {
      Alert.alert('Upload error', e?.message ?? 'Failed to pick file');
    }
  };

  const handleDataSave = (values: shopDetailsStep3) => {
    console.warn(`proceed to step3 with ${JSON.stringify(values)}`);
    router.push(`/(seller)/create-shop/step4`);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={shopDetailsStep3Schema}
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
                <View style={{ flexDirection: 'column', gap: 16 }}>
                  <Text style={[styles.secondaryText, { marginTop: 37 }]}>
                    Введіть реквізити
                  </Text>
                  <View>
                    <BasicFormInput
                      label='Номер запису в ЄДРПОУ'
                      placeholder='12345678'
                      onChangeText={(text) => setFieldValue('taxNumber', text)}
                      onBlur={handleBlur('taxNumber')}
                      noTextError={true}
                      errorMessage={
                        touched.taxNumber && errors.taxNumber
                          ? errors.taxNumber
                          : undefined
                      }
                    />
                    <Text style={styles.inputHintText}>
                       8 цифр без будь-яких роздільників
                    </Text>
                  </View>
                  <BasicFormInput
                    label='дата запису в ЄДРПОУ'
                    placeholder='мм.дд.рік'
                    onChangeText={(text) =>
                      setFieldValue('dateOfTaxNumber', text)
                    }
                    onBlur={handleBlur('dateOfTaxNumber')}
                    noTextError={true}
                    errorMessage={
                      touched.dateOfTaxNumber && errors.dateOfTaxNumber
                        ? errors.dateOfTaxNumber
                        : undefined
                    }
                  />
                  <View>
                    <BasicFormInput
                      label='Номер рахунку в форматі IBAN'
                      placeholder='UA123456789012345678901234567'
                      onChangeText={(text) => setFieldValue('IBAN', text)}
                      onBlur={handleBlur('IBAN')}
                      noTextError={true}
                      errorMessage={
                        touched.IBAN && errors.IBAN ? errors.IBAN : undefined
                      }
                    />
                    <Text style={styles.inputHintText}>
                       містить 29 символів
                    </Text>
                  </View>
                  <BasicFormInput
                    label='Назва банку'
                    placeholder='Виберіть банк'
                    onChangeText={(text) => setFieldValue('bankName', text)}
                    onBlur={handleBlur('bankName')}
                    noTextError={true}
                    errorMessage={
                      touched.bankName && errors.bankName
                        ? errors.bankName
                        : undefined
                    }
                  />
                  <BasicFormInput
                    label='ПІБ власника рахунку'
                    placeholder='Іванов Іван Іванович'
                    onChangeText={(text) => setFieldValue('ownerName', text)}
                    onBlur={handleBlur('ownerName')}
                    noTextError={true}
                    errorMessage={
                      touched.ownerName && errors.ownerName
                        ? errors.ownerName
                        : undefined
                    }
                  />
                </View>
                <Text style={[styles.secondaryText, { marginTop: 24 }]}>
                  Довідка з банку про відкриття розрахункового рахунку
                </Text>
                <Text style={[styles.inputHintText, { textAlign: 'left' }]}>
                  має бути кольорова скан/фото копія з оригіналу документа
                </Text>
                {values.bankConfirmation ? (
                  <View style={styles.uploadButtonBox}>
                    <Pressable
                      style={styles.uploadButtonMain}
                      onPress={() => onPickBankConfirmation(setFieldValue)}
                    >
                      <Swap size={32} color={Colors.softPurple} />
                      <Text style={styles.uploadButtonText}>
                        {values.bankConfirmation.name.length > 30
                          ? `${values.bankConfirmation.name.slice(0, 20)}…`
                          : values.bankConfirmation.name}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.uploadButtonAdditionalIcon}
                      onPress={() => setFieldValue('bankConfirmation', null)}
                    >
                      <Trash size={28} color={Colors.red} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => onPickBankConfirmation(setFieldValue)}
                    style={styles.uploadButtonBox}
                  >
                    <CloudArrowDown size={32} color={Colors.softPurple} />
                    <Text style={styles.uploadButtonText}>Завантажити</Text>
                  </Pressable>
                )}
                <Text style={[styles.secondaryText, { marginTop: 24 }]}>
                  Довідка ФОП
                </Text>
                <Text style={[styles.inputHintText, { textAlign: 'left' }]}>
                  має бути кольорова скан/фото копія з оригіналу документа
                </Text>
                {values.fopCertificate ? (
                  <View style={styles.uploadButtonBox}>
                    <Pressable
                      style={styles.uploadButtonMain}
                      onPress={() => onPickFopCertificate(setFieldValue)}
                    >
                      <Swap size={32} color={Colors.softPurple} />
                      <Text style={styles.uploadButtonText}>
                        {values.fopCertificate.name.length > 30
                          ? `${values.fopCertificate.name.slice(0, 20)}…`
                          : values.fopCertificate.name}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.uploadButtonAdditionalIcon}
                      onPress={() => setFieldValue('fopCertificate', null)}
                    >
                      <Trash size={28} color={Colors.red} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => onPickFopCertificate(setFieldValue)}
                    style={styles.uploadButtonBox}
                  >
                    <CloudArrowDown size={32} color={Colors.softPurple} />
                    <Text style={styles.uploadButtonText}>Завантажити</Text>
                  </Pressable>
                )}

                <Pressable style={styles.uploadButtonBox}>
                  <PlusCircle
                    size={26}
                    color={Colors.softPurple}
                    weight='fill'
                  />
                  <Text style={styles.uploadButtonText}>
                    Додати резервний рахунок (?)
                  </Text>
                </Pressable>
                <View
                  style={{ marginTop: 24, flexDirection: 'column', gap: 16 }}
                >
                  <Text style={styles.secondaryText}>Юридична адреса</Text>
                  <BasicFormInput
                    label='Місто'
                    placeholder='Назва'
                    onChangeText={(text) =>
                      setFieldValue('legalAddress.city', text)
                    }
                    onBlur={handleBlur('legalAddress.city')}
                    noTextError={true}
                    errorMessage={
                      touched.legalAddress?.city && errors.legalAddress?.city
                        ? errors.legalAddress?.city
                        : undefined
                    }
                  />
                  <BasicFormInput
                    label='Вулиця'
                    placeholder='Назва'
                    onChangeText={(text) =>
                      setFieldValue('legalAddress.street', text)
                    }
                    onBlur={handleBlur('legalAddress.street')}
                    noTextError={true}
                    errorMessage={
                      touched.legalAddress?.street &&
                      errors.legalAddress?.street
                        ? errors.legalAddress?.street
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
                          setFieldValue('legalAddress.building', text)
                        }
                        onBlur={handleBlur('legalAddress.building')}
                        noTextError={true}
                        errorMessage={
                          touched.legalAddress?.building &&
                          errors.legalAddress?.building
                            ? errors.legalAddress?.building
                            : undefined
                        }
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <BasicFormInput
                        label='Індекс'
                        placeholder='12345'
                        onChangeText={(text) =>
                          setFieldValue('legalAddress.zip', text)
                        }
                        onBlur={handleBlur('legalAddress.zip')}
                        noTextError={true}
                        errorMessage={
                          touched.legalAddress?.zip && errors.legalAddress?.zip
                            ? errors.legalAddress?.zip
                            : undefined
                        }
                      />
                    </View>
                  </View>
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

export default LegalDetails;

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
  uploadButtonMain: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonAdditionalIcon: {
    flexShrink: 0,
  },
});
