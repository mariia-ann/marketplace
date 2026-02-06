import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import FilterChip from '@/src/components/common/buttons/FilterChip';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import BasicFormInput from '@/src/components/common/customInput/BasicFormInput';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { Image as ImageIcon } from 'phosphor-react-native';

type shopDetailsStep2 = {
  name: string;
  categoryIds: string[];
  description?: string;
  logo?: string;
};

const ChooseCategory = () => {
  const shopSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('Shop name is required')
      .max(30, 'Shop name must be at most 30 characters'),

    categoryIds: Yup.array()
      .of(Yup.string().required())
      .min(1, 'Select at least one category')
      .required('Select at least one category'),

    description: Yup.string()
      .trim()
      .max(500, 'Description must be at most 500 characters'),

    logo: Yup.string().trim().optional(),
  });

  const initialValues: shopDetailsStep2 = {
    name: '',
    categoryIds: [],
    description: '',
    logo: '',
  };

  const listOfCategories = [
    'Одяг',
    'Взуття',
    'Електроніка',
    'Домашній декор',
    'Сумки',
    "Краса та здоров'я",
    'Спорт та відпочинок',
    'Іграшки та ігри',
    'Послуги',
  ];

  const [addCustomCategory, setAddCustomCategory] = useState(false);
  const [addLogo, setAddLogo] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  //  This function is used on "Завантажити" button in case user wants to upload logo for the shop.
  // TODO: refactor to separate component
  const handleChooseFromLibrary = async (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const mediaLibraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryStatus.status !== 'granted') {
      Alert.alert('Дозвіл відхилено', 'Потрібен дозвіл на галерею');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setFieldValue('logo', result.assets[0].uri);
    }
  };

  const handleDataSave = (values: shopDetailsStep2) => {
    console.warn(`proceed to step3 with ${JSON.stringify(values)}`);
    router.push(`/seller_profile/create-shop/step3`);
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.mainText}>
          Ви зможете додати інші магазини пізніше
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={shopSchema}
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
            const handleCategoryPress = (category: string) => {
              const current = values.categoryIds;
              setFieldValue(
                'categoryIds',
                current.includes(category)
                  ? current.filter((c) => c !== category)
                  : [...current, category],
              );
            };
            return (
              <>
                <Text style={styles.secondaryText}>Введіть дані магазину</Text>
                <BasicFormInput
                  label='Назва магазину'
                  placeholder='Назва'
                  onChangeText={(text) => setFieldValue('name', text)}
                  onBlur={handleBlur('name')}
                  errorMessage={
                    touched.name && errors.name ? errors.name : undefined
                  }
                />
                <Text style={styles.secondaryText}>Оберіть категорії</Text>
                <View style={styles.categoryBox}>
                  {listOfCategories ? (
                    listOfCategories.map((category) => (
                      <FilterChip
                        key={category}
                        title={category}
                        isSelected={values.categoryIds.includes(category)}
                        onPress={() => handleCategoryPress(category)}
                      />
                    ))
                  ) : (
                    <Text>No categories available</Text>
                  )}
                  <CheckBox
                    title='Додати свою категорію'
                    titleStyle={styles.secondaryText}
                    isChecked={addCustomCategory}
                    onPress={() => setAddCustomCategory(!addCustomCategory)}
                  />
                  {addCustomCategory && (
                    <BasicFormInput placeholder='Категорія' />
                  )}
                </View>
                <TextArea3Rows
                  label='Опис діяльності'
                  placeholder='Опис'
                  value={values.description || ''}
                  onChangeText={(text) => setFieldValue('description', text)}
                  maxLength={500}
                />
                <CheckBox
                  title='Додати логотип магазину'
                  titleStyle={styles.secondaryText}
                  isChecked={addLogo}
                  onPress={() => setAddLogo(!addLogo)}
                />
                {addLogo && (
                  <Pressable
                    onPress={() => handleChooseFromLibrary(setFieldValue)}
                  >
                    {photoUri ? (
                      <Image
                        style={styles.uploadLogoBox}
                        source={{ uri: photoUri }}
                      />
                    ) : (
                      <View style={styles.uploadLogoBox}>
                        <ImageIcon
                          size={32}
                          color={Colors.softPurple}
                          weight='thin'
                        />
                        <Text style={styles.uploadText}>Завантажити</Text>
                      </View>
                    )}
                  </Pressable>
                )}
                <PrimaryButton
                  style={{ marginTop: 45 }}
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

export default ChooseCategory;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 24,
  },
  secondaryText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
  },
  categoryBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 16,
    rowGap: 16,
    marginBottom: 16,
  },
  descriptionContainer: { gap: 6 },
  descriptionTextarea: {
    minHeight: 3 * 22 + 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey400,
  },
  descriptionCounter: { fontSize: 12, opacity: 0.6, alignSelf: 'flex-end' },
  uploadLogoBox: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.blackMain,
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: '600',
    color: Colors.softPurple,
  },
});

// TextArea3Rows Component
//TODO: move to common components
type Props = {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (t: string) => void;
  maxLength?: number;
};

function TextArea3Rows({
  label,
  placeholder,
  value,
  onChangeText,
  maxLength = 500,
}: Props) {
  return (
    <View style={styles.descriptionContainer}>
      {label && <Text style={styles.secondaryText}>{label}</Text>}

      <TextInput
        style={styles.descriptionTextarea}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={3}
        maxLength={maxLength}
        textAlignVertical='top' // Android: start from top-left
        placeholder={placeholder}
      />

      <Text style={styles.descriptionCounter}>
        {value.length}/{maxLength}
      </Text>
    </View>
  );
}
