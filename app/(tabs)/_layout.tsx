import { Tabs } from "expo-router";

import {
  Handbag,
  Heart,
  House,
  MagnifyingGlass,
  User,
} from "phosphor-react-native";
import { Text, View } from "react-native";

function renderLabel(title: string, focused: boolean) {
  return (
    <Text
      style={{
        fontSize: 12,
        fontFamily: focused ? "ManropeBold" : "Manrope",
        color: focused ? "#8E6CEF" : "#170F2B",
        marginTop: 3,
      }}
    >
      {title}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AC94E8",
        headerShown: false,
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Manrope",
        },
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: "#00000040",
          shadowOpacity: 0.6,
          shadowRadius: 15,
          elevation: 10,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Головна",
          tabBarLabel: ({ focused }) => renderLabel("Головна", focused),
          tabBarIcon: ({ focused }) => (
            <House
              color={focused ? "#8E6CEF" : "#170F2B"}
              size={32}
              weight={focused ? "regular" : "thin"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Пошук",
          tabBarLabel: ({ focused }) => renderLabel("Пошук", focused),
          tabBarIcon: ({ focused }) => (
            <MagnifyingGlass
              color={focused ? "#8E6CEF" : "#170F2B"}
              size={32}
              weight={focused ? "regular" : "thin"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                top: -30,
                backgroundColor: "#fff",
                borderRadius: 35,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25,
                shadowRadius: 4.65,
                elevation: 4,
              }}
            >
              <Handbag
                size={32}
                color={focused ? "#8E6CEF" : "#170F2B"}
                weight={focused ? "regular" : "thin"}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="favorite"
        options={{
          title: "Обрані",
          tabBarLabel: ({ focused }) => renderLabel("Обрані", focused),
          tabBarIcon: ({ focused }) => (
            <Heart
              color={focused ? "#8E6CEF" : "#170F2B"}
              size={32}
              weight={focused ? "regular" : "thin"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarLabel: ({ focused }) => renderLabel("Профіль", focused),
          tabBarIcon: ({ focused }) => (
            <User
              color={focused ? "#8E6CEF" : "#170F2B"}
              size={32}
              weight={focused ? "regular" : "thin"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
