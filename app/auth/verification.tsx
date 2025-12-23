import CustomButton from "@/src/components/common/CustomButton";
import BackArrowModified from "@/src/components/common/buttons/BackButton";
import CustomInput from "@/src/components/common/customInput/Input";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function VerificationPage() {
  return (
    <View style={styles.verificationPageContainer}>
      <View style={styles.header}>
        <BackArrowModified
          style={{
            backArrowWrapper: styles.backArrow,
            backIconCircle: styles.backiconCircle,
          }}
        />
        <Text style={{ ...styles.verificationNormalTextSize }}>
          Верифікація
        </Text>
        <View style={{ paddingLeft: 90 }}></View>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  backArrow: {
    display: "flex",
    width: 100,
  },
  backiconCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationNormalTextSize: {
    fontSize: 20,
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
  verificationPageContainer: {
    padding: 20,
  },
});

export default VerificationPage;
