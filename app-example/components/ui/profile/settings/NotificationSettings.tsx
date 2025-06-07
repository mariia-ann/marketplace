
import CustomSwitch from "@/app-example/components/CustomSwitch";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationList() {
  const [isMyOrderEnabled, setIsMyOrderEnabled] = useState(true);
  const [isPersonalOffersEnabled, setIsPersonalOffersEnabled] = useState(true);
  const [isMessagesEnabled, setIsMessagesEnabled] = useState(true);
  const [isPricesEnabled, setIsPricesEnabled] = useState(true);

  const [isMyOrderLetterEnabled, setIsMyOrderLetterEnabled] = useState(true);
  const [isPersonalOffersLetterEnabled, setIsPersonalOffersLetterEnabled] =
    useState(false);
  const [isDiscountsEnabled, setIsDiscountsEnabled] = useState(false);

    const toggleMyOrderSwitch = () => setIsMyOrderEnabled((previousState) => !previousState);

  return (
    <View style={styles.block}>
      <View style={styles.blockList}>
        <Text style={styles.subtitle}>Push-сповіщення</Text>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Мої замовлення</Text>
            <Text style={styles.textTr}>Статус ваших замовлень</Text>
          </View>
          <CustomSwitch
            value={isMyOrderEnabled}
            onToggle={() => setIsMyOrderEnabled(!isMyOrderEnabled)}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Персональні пропозиції</Text>
            <Text style={styles.textTr}>
              Персональні рекомендації, знижки та купони
            </Text>
          </View>
          <CustomSwitch
            value={isPersonalOffersEnabled}
            onToggle={() =>
              setIsPersonalOffersEnabled(!isPersonalOffersEnabled)
            }
          />
        </View>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Повідомлення</Text>
            <Text style={styles.textTr}>
              Повідомлення від продавців та інших користувачів Маркетплейсу
            </Text>
          </View>
          <CustomSwitch
            value={isMessagesEnabled}
            onToggle={() => setIsMessagesEnabled(!isMessagesEnabled)}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Ціни</Text>
            <Text style={styles.textTr}>
              Інформація, що товари, якими ви цікавились, стали дешевше{" "}
            </Text>
          </View>
          <CustomSwitch
            value={isPricesEnabled}
            onToggle={() => setIsPricesEnabled(!isPricesEnabled)}
          />
        </View>
      </View>

      <View style={styles.blockList}>
        <Text style={styles.subtitle}>Листи</Text>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Мої замовлення</Text>
            <Text style={styles.textTr}>Статус ваших замовлень</Text>
          </View>
          <CustomSwitch
            value={isMyOrderLetterEnabled}
            onToggle={() => setIsMyOrderLetterEnabled(!isMyOrderLetterEnabled)}
          />
        </View>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Персональні пропозиції</Text>
            <Text style={styles.textTr}>
              Персональні рекомендації, знижки та купони
            </Text>
          </View>
          <CustomSwitch
            value={isPersonalOffersLetterEnabled}
            onToggle={() =>
              setIsPersonalOffersLetterEnabled(!isPersonalOffersLetterEnabled)
            }
          />
        </View>

        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.text}>Знижки та акції</Text>
            <Text style={styles.textTr}>Сезонні знижки та розпродажі</Text>
          </View>
          <CustomSwitch
            value={isDiscountsEnabled}
            onToggle={() => setIsDiscountsEnabled(!isDiscountsEnabled)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 20,
  },
  blockList: {
    width: "100%",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15, // приблизно відповідає #00000026
    shadowRadius: 15,
    elevation: 5,
  },
  subtitle: {
    fontFamily: "Manrope",
    fontSize: 18,
  },
  item: {
    gap: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  text: {
    fontFamily: "Manrope",
    fontSize: 16,
  },
  textTr: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: "#999999",
  },
});
