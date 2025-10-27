import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    </SafeAreaProvider>
  );
}
