import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { Stack } from 'expo-router';
import React from 'react';

export default function CreateShopLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        header: (props) => (
          <NavigationHeader
            {...props}
            customStyles={{
              paddingHorizontal: 20,
              backgroundColor: Colors.white,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name='step1'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='step2'
        options={{
          title: 'Створіть свій перший магазин',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='step3'
        options={{
          title: 'Реквізити та документи ФОП',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='step4'
        options={{
          title: 'Контактна інформація',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='step5'
        options={{
          title: 'Доставка',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='step6'
        options={{
          title: 'Фінансові налаштування',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
