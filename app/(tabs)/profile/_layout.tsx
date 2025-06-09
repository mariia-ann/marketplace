import { ProfileHeader } from "@/app-example/components/ProfileHeader";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileStackLayout() {
  const profileScreens = [
    { name: "edit", title: "Мої дані" },
    { name: "cards", title: "Мої картки" },
    { name: "addresses/index", title: "Мої адреси" },
    { name: "addresses/changeAddress", title: "Редагування адреси" },
    { name: "addresses/changeAddress/deliveryMethod", title: "Спосіб доставки" },
    { name: "offersNotifications", title: "Пропозиції та сповіщення" },
    { name: "orderHistory", title: "Історія замовлень" },
    { name: "sellerMessages/index", title: "Переписки з продавцями" },
    { name: "sellerMessages/chatMessages", title: "Переписки з продавцями" },
    { name: "reviews/index", title: "Мої відгуки" },
    { name: "sellerMessages", title: "Переписки з продавцями" },
    { name: "settings/index", title: "Налаштування" },
    { name: "settings/notificationSettings", title: "Налаштування сповіщень" },
    { name: "settings/changePassword", title: "Змінити пароль" },
    { name: "support", title: "Служба підтримки" },
  ];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <ProfileHeader {...props} />,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "Manrope",
          color: "#170F2B",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />
      {profileScreens.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            title: title,
            // headerLeft: null,
          }}
        />
        
      ))}
    </Stack>
  );
}
