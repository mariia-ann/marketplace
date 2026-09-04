import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { Stack } from 'expo-router';
import React from 'react';
// import Colors from '../../../constants/Colors';

export default function FavoriteStackLayout() {
  const favoriteScreens = [{ name: 'collections/for-home', title: 'Для дому' }];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <NavigationHeader {...props} />,
        headerStyle: {
          // backgroundColor: Colors.light.background,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Обрані',
        }}
      />
      <Stack.Screen
        name='chosen-collections'
        options={{
          headerShown: false,
          title: 'Обрані',
        }}
      />
      {favoriteScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
          }}
        />
      ))}
    </Stack>
  );
}
