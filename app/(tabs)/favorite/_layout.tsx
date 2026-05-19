import { Stack } from 'expo-router';
import React from 'react';
import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';

export default function FavoriteStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <NavigationHeader
            {...props}
            title='Обрані'
            // показуємо стрілку "назад" тільки якщо є куди повертатися у стеку
            showBack={props.navigation?.canGoBack?.() === true}
            customStyles={{
              paddingHorizontal: 20,
              backgroundColor: Colors.white,
            }}
          />
        ),
      }}
    >
      {/* <Stack.Screen
        name='index'
        options={{
          // головний екран "Обрані" використовує заголовок зі стеку
        }}
      /> */}
    </Stack>
  );
}
