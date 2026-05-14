import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CartItemTile from '@/src/components/ui/seller/CartitemTile';
// import { bag, shoe } from '@/assets/images/write_to_the_seller';
import CustomButton from '@/src/components/common/CustomButton';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import Colors from '@/constants/Colors';

export type CartItem = {
  id: string;
  title: string;
  brand: string;
  image: any;
  price: number;
  currency: string;
  quantity: number;
  variant: {
    color: string;
    size?: string | number;
    hex: string;
  };
};

function WriteToSeller() {
  const cartData: CartItem[] = [
    {
      id: '9000000076512',
      title: 'Жіноча сумка Верде зелена',
      brand: 'MALETSKIY',
      image:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=400&fit=crop',
      price: 1000,
      currency: '₴',
      quantity: 1,
      variant: {
        color: 'Green',
        hex: '#4C6357',
      },
    },
    {
      id: '9000000076543',
      title: 'Жіночі черевики на підборах',
      brand: 'MALETSKIY',
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
      price: 3600,
      currency: '₴',
      quantity: 1,
      variant: {
        color: 'Brown',
        size: 38,
        hex: '#2B221B',
      },
    },
  ];

  const [descriptionWordsCount, setDescriptionWordsCount] = useState<number>(0);
  const [selectedPhotosCount, setSelectedPhotosCount] = useState<number>(0);
  const [imagesUploaded, setImagesUploaded] = useState<string[]>([
    'https://placehold.co/600x400.png',
    'https://placehold.co/600x400.png',
  ]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  const iconStyle = {
    width: 24,
    height: 24,
    color: '#8E6CEF',
  };

  const renderCartItemTile = (item: CartItem, index: number) => {
    return <CartItemTile key={item.title + index} {...item} />;
  };

  const renderUploadedImages = (item: any, index: number) => {
    return (
      <Image
        key={index}
        source={{ uri: item }}
        style={{
          width: 100,
          height: 100,
          marginRight: 10,
          borderRadius: 8,
          backgroundColor: '#f0f0f0',
        }}
      />
    );
  };

  const handleClickCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Camera Permission',
          'You need to allow camera access to take photos.',
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newImage = result.assets[0].uri;
        if (imagesUploaded.length < 4) {
          setImagesUploaded([...imagesUploaded, newImage]);
          setSelectedPhotosCount(imagesUploaded.length + 1);
        } else {
          Alert.alert('Limit Reached', 'You can upload maximum 4 photos.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera.');
      console.error(error);
    }
  };

  const handleClickGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Gallery Permission',
          'You need to allow gallery access to select photos.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newImage = result.assets[0].uri;
        if (imagesUploaded.length < 4) {
          setImagesUploaded([...imagesUploaded, newImage]);
          setSelectedPhotosCount(imagesUploaded.length + 1);
        } else {
          Alert.alert('Limit Reached', 'You can upload maximum 4 photos.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open gallery.');
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={{}}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 20,
        backgroundColor: Colors.white,
      }}
    >
      {cartData.map(renderCartItemTile)}

      <View
        style={{ paddingTop: 20, borderTopWidth: 1, borderTopColor: '#CCCCCC' }}
      >
        <Text style={{ color: '#999999', paddingBottom: 8 }}>
          Запитайте про товар
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 10,
            padding: 10,
            height: 140,
            textAlignVertical: 'top',
          }}
          onChangeText={(event) => {
            setDescriptionWordsCount(event.length);
          }}
          placeholder='Enter your description here...'
          multiline={true} // Enable multiline input
          numberOfLines={12} // Set the initial number of visible lines (Android only)
        />
        <Text style={{ color: descriptionWordsCount > 2000 ? 'red' : 'black' }}>
          {descriptionWordsCount > 2000
            ? '2000/2000'
            : `${descriptionWordsCount}/2000`}
        </Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#999999' }}>Додати фото або відео</Text>
          <Text style={{ color: '#999999' }}>{selectedPhotosCount}/4</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <CustomButton
            title='Камера'
            onPress={handleClickCamera}
            customStyles={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              width: 170,
            }}
            customTextStyles={{ color: '#8E6CEF', paddingLeft: 6 }}
          >
            <SvgIcons name={CUSTOM_ICON_REF.CameraIcon} baseStyle={iconStyle} />
          </CustomButton>

          <CustomButton
            title='Галерея'
            onPress={handleClickGallery}
            customStyles={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              width: 170,
            }}
            customTextStyles={{ color: '#8E6CEF', paddingLeft: 6 }}
          >
            <SvgIcons name={CUSTOM_ICON_REF.ImageIcon} baseStyle={iconStyle} />
          </CustomButton>
        </View>
        {/**If needed uncomment this linke, if API is integrated */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {imagesUploaded.map(renderUploadedImages)}
        </View>
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Text style={{ paddingBottom: 8, color: '#999999' }}>Ваше ім’я</Text>
        <Text style={{ paddingTop: 10, fontSize: 16 }}>
          Катерина Коновалова
        </Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ paddingBottom: 8, color: '#999999' }}>email/mobile</Text>
        <TextInput
          placeholder='konnovalova@gmail.com'
          style={{
            borderWidth: 1,
            borderColor: '#999999',
            borderRadius: 10,
            padding: 12,
          }}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <CheckBox
          checkboxStyle={{ color: '#8E6CEF' }}
          containerStyle={{ alignSelf: 'flex-start' }}
          isChecked={isChecked}
          onPress={handleChecked}
        />
        <Text style={{ paddingTop: 5, paddingLeft: 5 }}>
          Повідомляти про відповіді
        </Text>
      </View>

      <CustomButton
        title='Надіслати'
        onPress={() => {}}
        customStyles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </ScrollView>
  );
}

export default WriteToSeller;
