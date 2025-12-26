import Colors from "@/constants/Colors";
import CustomButton from "@/src/components/common/CustomButton";
import { NavigationHeader } from "@/src/components/common/NavigationHeader";
import CustomInput from "@/src/components/common/customInput/Input";
import { RequireGuest } from "@/src/features/auth/guards";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function VerificationPage() {
  return (
    <RequireGuest to="/(tabs)">
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <NavigationHeader title="Створити акаунт" showBack={false} />

          <View>
            <Text style={styles.verificationCommonTextStyle}>
              Ми відправили вам код на ваш номер телефону
            </Text>
            {/* <Link href={"htt"}+></Link> */}
            <Text style={styles.verificationCommonTextStyle}>
              (+38)099-876-5432
            </Text>
            <Text style={styles.verificationCommonTextStyle}>
              Цей код є активним протягом 10 хвилин після отримання
            </Text>
            <Text style={styles.verificationCommonTextStyle}>
              Введіть отриманий код
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <CustomInput
              textStyle={styles.verificationInputLabelStyle}
              label="Введіть код"
              placeholder=""
              keyboardType="number-pad"
              value={{}}
              onChangeText={() => {}}
              customStyle={styles.verificationInputTextBox}
            />

            <CustomButton
              onPress={() => {}}
              title="Відправити знов"
              customStyles={{ padding: 10 }}
              customTextStyles={{ margin: 0, padding: 0, textAlign: "center" }}
              whiteTheme
            ></CustomButton>
          </View>
          <CustomButton
            title="Підтвердити"
            onPress={() => {}}
            customStyles={{ marginTop: 20, justifyContent: "center" }}
            customTextStyles={{ paddingBottom: 4 }}
          />
          <Text
            style={{
              textAlign: "center",
              paddingTop: 20,
              textDecorationLine: "underline",
              color: "#8E6CEF",
            }}
          >
            Помилка в номері телефону?
          </Text>
        </ScrollView>
      </SafeAreaView>
    </RequireGuest>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  scroll: { flex: 1 },
  container: {
    paddingHorizontal: 20,
  },
  verificationCommonTextStyle: {
    paddingBottom: 10,
    color: "#170F2B",
  },
  verificationInputTextBox: {
    borderColor: "#999999",
    borderWidth: 1,
    borderRadius: 10,
    // width: 90
  },
  verificationInputLabelStyle: {
    paddingBottom: 5,
    color: "#999999",
  },
});

export default VerificationPage;
