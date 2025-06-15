import TwoTabsSwitch from "@/app-example/components/ui/twoTabsSwitch";
import dummyImage from "@/assets/images/dummy_image_delete_onprod.png";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const offers = [
  {
    id: "1",
    image: dummyImage,
    title: "MyBeauty",
    description: "Жіночі плаття зі знижкою до -80%",
    date: "17.04.2025",
    time: "16:03",
  },
  {
    id: "2",
    image: dummyImage,
    title: "LookStyle",
    description: "Нові аксесуари вже доступні — знижки до 60%",
    date: "10.03.2025",
    time: "14:42",
  },
  {
    id: "6",
    image: dummyImage,
    title: "Знижка на улюблені товари",
    description: "Сьогодні у вас є знижка 20% на вибрані позиції",
    date: "30.01.2025",
    time: "18:17",
  },
  {
    id: "4",
    image: dummyImage,
    title: "Вас може зацікавити",
    description:
      "Купуйте зі знижкою 1850 ₴ Жіночі кросівки Skechers 149491 світло сірі",
    date: "13.02.2025",
    time: "10:26",
  },
  {
    id: "5",
    image: dummyImage,
    title: "Нові надходження",
    description: "Спробуйте нову колекцію весна-літо 2025",
    date: "05.02.2025",
    time: "09:45",
  },
  {
    id: "3",
    image: dummyImage,
    title: "FashionZone",
    description: "Бонуси за покупки діють лише до кінця тижня",
    date: "28.02.2025",
    time: "11:10",
  },
  {
    id: "7",
    image: dummyImage,
    title: "BeautyBox",
    description: "Отримайте подарунок за замовлення понад 1000 ₴",
    date: "15.01.2025",
    time: "08:59",
  },
];

const notifications = [
  {
    id: "4",
    image: dummyImage,
    title: "Вас може зацікавити",
    description:
      "Купуйте зі знижкою 1850 ₴ Жіночі кросівки Skechers 149491 світло сірі",
    date: "13.02.2025",
    time: "10:26",
  },
  {
    id: "2",
    image: dummyImage,
    title: "До -50% на преміумаксесуари",
    description: "Calvin Klein, Michael Kors, Coach, Guess та інші",
    date: "01.05.2025",
    time: "12:47",
  },
  {
    id: "3",
    image: dummyImage,
    title: "MyBeauty",
    description: "Жіночі плаття зі знижкою до -80%",
    date: "17.04.2025",
    time: "16:03",
  },
  {
    id: "1",
    image: dummyImage,
    title:
      "MudraCollection lorerm ipsum dolor sit amet, consectetur adipiscing elit",
    description:
      "lorerm ipsum dolor sit amet, consectetur adipiscing elit  lorerm ipsum dolor sit amet, consectetur adipiscing elit lorerm ipsum dolor sit amet, consectetur adipiscing elit",
    date: "05.05.2025",
    time: "09:19",
  },
];

export default function OffersAndNotificationsList() {
  const [activeTab, setActiveTab] = useState<"option1" | "option2">("option1");

  const data = activeTab === "option1" ? offers : notifications;

  return (
    <SafeAreaView style={styles.container}>
      <TwoTabsSwitch
        option1='Пропозиції'
        option2='Сповіщення'
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image
                style={styles.image}
                source={item.image}
                // Placeholder image
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
            {/*TODO: Separate Date and time according to object received /Demidas/ */}
            <Text style={styles.datetime}>
              {item.date} {item.time}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 20 },
  list: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 16,
  },
  card: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
    display: "flex",
    flexDirection: "column",
    minHeight: 108,
  },
  image: {
    width: 53,
    height: 53,
    borderRadius: 53,
    marginRight: 20,
    backgroundColor: Colors.grey200,
  },
  title: {
    fontFamily: "Outfit",
    marginBottom: 8,
    color: Colors.blackMain,
  },
  description: {
    fontSize: 14,
    color: Colors.grey500,
    marginBottom: 4,
  },
  datetime: {
    color: Colors.grey500,
    textAlign: "right",
  },
});
