// app/auth/_layout.tsx
import { ProfileHeader } from "@/src/components/ProfileHeader";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      {/* login screen with header and "back" button */}
      <Stack.Screen
        name='login'
        options={{
          title: "З поверненням",
          header: (props) => <ProfileHeader {...props} />,
        }}
      />

      {/* signup screen without header */}
      <Stack.Screen
        name='signup'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
