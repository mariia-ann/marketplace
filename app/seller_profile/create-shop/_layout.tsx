import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { Stack } from 'expo-router';
import React from 'react';

export default function CreateShopLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ChooseSellerType'
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
