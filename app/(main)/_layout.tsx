// app/(main)/_layout.tsx
import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='choose-language' options={{ headerShown: false }} />
      <Stack.Screen name='choose-country' options={{ headerShown: false }} />
    </Stack>
  );
}
