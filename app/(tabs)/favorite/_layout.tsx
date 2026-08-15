import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { Stack } from 'expo-router';
import React from 'react';
// import Colors from '../../../constants/Colors';

export default function FavoriteStackLayout() {
  const favoriteScreens = [
    { name: 'collections/for-home', title: 'Для дому' },
  ];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => (
          <NavigationHeader {...props} />
        ),
        headerStyle: {
          // backgroundColor: Colors.light.background,
        },
      }}
    >
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
