import { RequireSeller } from '@/src/features/auth/guards';
import { Stack } from 'expo-router';
import React from 'react';

export default function SellerProfilelayout() {
  return (
    <RequireSeller>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='create-shop' options={{ headerShown: false }} />
      </Stack>
    </RequireSeller>
  );
}
