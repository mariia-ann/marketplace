import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useSyncQueriesExternal } from "react-query-external-sync";
// Import Platform for React Native or use other platform detection for web/desktop
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoDevice from "expo-device";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient } from "@/src/lib/queryClient";
import { asyncStoragePersister } from "@/src/lib/persistor";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Manrope: require("../assets/fonts/Manrope-Regular.ttf"),
    ManropeBold: require("../assets/fonts/Manrope-Bold.ttf"),
    ManropeSemiBold: require("../assets/fonts/Manrope-SemiBold.ttf"),
    Namu: require("../assets/fonts/NAMU-1400.ttf"),
    // Outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    // OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn("Помилка при виклику preventAutoHideAsync:", e);
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
        <AppContent />
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  // Set up the sync hook - automatically disabled in production!
  useSyncQueriesExternal({
    queryClient,
    socketURL: "http://localhost:42831", // Default port for React Native DevTools
    deviceName: Platform?.OS || "web", // Platform detection
    platform: Platform?.OS || "web", // Use appropriate platform identifier
    deviceId: Platform?.OS || "web", // Use a PERSISTENT identifier (see note below)
    isDevice: ExpoDevice.isDevice, // Automatically detects real devices vs emulators
    extraDeviceInfo: {
      // Optional additional info about your device
      appVersion: "1.0.0",
      // Add any relevant platform info
    },
    enableLogs: false,
    envVariables: {
      NODE_ENV: process.env.NODE_ENV,
      // Add any private environment variables you want to monitor
      // Public environment variables are automatically loaded
    },
    // Storage monitoring with CRUD operations
    asyncStorage: AsyncStorage, // AsyncStorage for ['#storage', 'async', 'key'] queries + monitoring
    secureStorageKeys: [
      "userToken",
      "refreshToken",
      "biometricKey",
      "deviceId",
    ], // SecureStore keys to monitor
  });

  // Your app content
  return (
    <>
      <Stack>
        {/* Welcome page screens */}
        <Stack.Screen
          name='(main)'
          options={{ headerShown: false }}
        />
        {/* Auth screens */}
        <Stack.Screen
          name='auth/login'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='auth/signup'
          options={{ headerShown: false }}
        />
        {/* Main app after login */}
        <Stack.Screen
          name='(tabs)'
          options={{ headerShown: false }}
        />
        {/* 404 page */}
        <Stack.Screen
          name='+not-found'
          options={{}}
        />
      </Stack>
    </>
  );
}
