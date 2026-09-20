import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import { Stack } from 'expo-router';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

export default function FavoriteStackLayout() {
  const favoriteScreens = [
    { name: 'collections/for-home', title: 'Для дому' },
    {
      name: 'wishlist-friend/wishlist-friend',
      title: 'Для дому',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Сканер QR-коду',
              'Функція сканування QR-коду вішліста незабаром буде доступна.',
            );
          }}
          activeOpacity={0.7}
          style={{ padding: 4 }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.SearchSquareIcon}
            baseStyle={{ width: 28, height: 28, color: Colors.blackMain }}
          />
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <NavigationHeader
            customStyles={{
              paddingHorizontal: 16,
              backgroundColor: Colors.white,
            }}
            {...props}
          />
        ),
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Обрані',
        }}
      />
      <Stack.Screen
        name='chosen-collections'
        options={{
          title: 'Обрані',
        }}
      />
      {favoriteScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            ...(screen.headerRight ? { headerRight: screen.headerRight } : {}),
          }}
        />
      ))}
    </Stack>
  );
}
