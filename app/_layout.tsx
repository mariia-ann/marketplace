import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RestoreGate } from '@/src/features/auth/guards';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient } from '@/src/lib/queryClient';
import { asyncStoragePersister } from '@/src/lib/persistor';
import { View, StyleSheet } from 'react-native';
import { useAuthStore } from '@/src/state/useAuthStore';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Manrope: require('../assets/fonts/Manrope-Regular.ttf'),
    ManropeBold: require('../assets/fonts/Manrope-Bold.ttf'),
    ManropeSemiBold: require('../assets/fonts/Manrope-SemiBold.ttf'),
    Namu: require('../assets/fonts/NAMU-1400.ttf'),
    // Outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    // OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const token = useAuthStore((s) => s.token);
  console.warn(token);
  const isLoggedIn = !!token;

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn('Помилка при виклику preventAutoHideAsync:', e);
      }
    };
    prepare();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <RestoreGate>
          <View style={styles.appShell}>
            <View style={styles.appContent}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    flex: 1,
                  },
                }}
              >
                {/* Welcome page screens */}
                <Stack.Screen name='(main)' options={{ headerShown: false }} />
                {/* Auth screens */}
                <Stack.Screen
                  name='auth/login'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='auth/signup'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='auth/signup-otp'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='auth/otp-code-verification'
                  options={{ headerShown: false }}
                />
                {/* Main app after login */}
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                {/* Seller profile screen */}
                <Stack.Protected guard={isLoggedIn}>
                  <Stack.Screen
                    name='(seller)'
                    options={{ headerShown: false }}
                  />
                </Stack.Protected>
                {/* 404 page */}
                <Stack.Screen name='+not-found' options={{}} />
              </Stack>
            </View>
          </View>
        </RestoreGate>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
  },
  appContent: {
    flex: 1,
    width: '100%',
    maxWidth: 390,
    alignSelf: 'center',
  },
});
