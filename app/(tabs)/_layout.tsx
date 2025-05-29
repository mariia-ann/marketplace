import { Tabs } from "expo-router";

import { House, User } from "phosphor-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AC94E8",
        headerShown: false,
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Головна",
          tabBarIcon: ({ color, focused }) => <House color={color} size={32} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarIcon: ({ color, focused }) => <User color={color} size={32} />,
        }}
      />
    </Tabs>
  );
}
