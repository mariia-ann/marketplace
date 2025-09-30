import { ProfileHeader } from "@/src/components/common/ProfileHeader";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileStackLayout() {
  const profileScreens = [
    { name: "edit", title: "Мої дані" },
    { name: "cards/index", title: "Мої картки" },
    { name: "cards/addCards", title: "Додати картку" },
    { name: "addresses/index", title: "Мої адреси" },
    { name: "addresses/changeAddress", title: "Редагування адреси" },
    {
      name: "addresses/changeAddress/deliveryMethod",
      title: "Спосіб доставки",
    },
    {
      name: "notification/offersNotifications",
      title: "Пропозиції та сповіщення",
    },
    { name: "orderHistory", title: "Історія замовлень" },
    { name: "sellerMessages/index", title: "Переписки з продавцями" },
    { name: "sellerMessages/chatMessages", title: "Переписки з продавцями" },
    { name: "reviews/index", title: "Мої відгуки" },
    { name: "reviews/addComment", title: "Додати коментар" },
    { name: "reviews/addAnswer", title: "Додати відповідь" },
    { name: "reviews/addReply", title: "Додати відповідь" },
    { name: "sellerMessages", title: "Переписки з продавцями" },
    { name: "settings/index", title: "Налаштування" },
    { name: "settings/notificationSettings", title: "Налаштування сповіщень" },
    { name: "settings/changePassword", title: "Змінити пароль" },
    { name: "support/index", title: "Служба підтримки" },
    { name: "support/chat", title: "Чат-підтримки" },
    { name: "support/chat/selectOrder", title: "Оберіть замовлення" },
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
        name='index'
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
