import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Manrope: require("../assets/fonts/Manrope-Regular.ttf"),
    ManropeBold: require("../assets/fonts/Manrope-Bold.ttf"),
    Outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
  });

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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
  );
}
