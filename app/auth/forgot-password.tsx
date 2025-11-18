import CustomButton from '@/src/components/common/CustomButton'
import BackArrow from "@/src/components/common/buttons/BackButton";
import OptionToggle from "@/src/components/common/OptionToggle/OptionToggle";
import { CUSTOM_ICON_REF } from "@/src/components/common/SvgIcons/IconRef";
import SvgIcons from "@/src/components/common/SvgIcons/SvgIcons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function ForgotPassword() {
  const [toggleSMS, setToggleSMS] = useState<boolean>(false);

  const handleToggleSMS = () => {
    setToggleSMS((prev) => !prev);
  };

  const handleToggleEmail = () => {
    setToggleSMS((prev) => !prev);
  };

  const backarrowStyles = {
    backArrowWrapper: styles.backArrowWrapper,
    backIconCircle: styles.backIconCircle,
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <BackArrow style={backarrowStyles} />
        <Text style={styles.headerTitle}>Забули пароль?</Text>
        <Text />
      </View>

      {/* Illustration + Title */}
      <View style={styles.centeredColumn}>
        <SvgIcons
          name={CUSTOM_ICON_REF.ForgotPasswordIllustrations}
          baseStyle={styles.illustration}
        />
        <Text style={styles.subtitle}>Як ви хочете отримати код?</Text>
      </View>

      {/* Options */}
      <View style={[styles.row, styles.optionWrapper]}>
        <OptionToggle
          toggled={toggleSMS}
          title='SMS'
          baseStyle={{
            ...styles.optionBox,
            ...styles.shadow,
            marginRight: 15,
            maxWidth: 300,
          }}
          textStyle={styles.optionToggleText}
          handleClick={handleToggleSMS}
        />
        <OptionToggle
          toggled={!toggleSMS}
          title='Email'
          baseStyle={{
            ...styles.optionBox,
            ...styles.shadow,
            marginLeft: 15,
            maxWidth: 300,
          }}
          textStyle={styles.optionToggleText}
          handleClick={handleToggleEmail}
        />
      </View>

      {/* Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>Код буде надіслано на:</Text>
        <Text style={styles.infoEmail}>konnovalova@gmail.com</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <CustomButton
          customStyles={{
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 400,
            minWidth: 350,
          }}
          title='Відправити код'
          onPress={() => {}}
        />
        <CustomButton
          title='Відміна'
          customStyles={styles.cancelButton}
          customTextStyles={styles.cancelButtonText}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  centeredColumn: {
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    paddingLeft: 12,
  },

  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
  },

  backArrowWrapper: {
    // Uncomment if needed:
    // position: 'absolute',
    // left: 20,
    // top: 70,
    // zIndex: 1,
  },

  backIconCircle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
  },

  illustration: {
    width: 300,
    height: 300,
  },

  subtitle: {
    fontFamily: "Manrope",
    textAlign: "center",
    fontSize: 18,
  },

  optionWrapper: {
    justifyContent: "center",
    padding: 30,
  },

  optionBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    width: "50%",
    padding: 20,
  },

  optionToggleText: {
    fontFamily: "Manrope",
    color: "#8E6CEF",
    fontWeight: "bold",
  },

  shadow: {
    boxShadow: "0 0 10px #00000020",
  },

  infoWrapper: {
    paddingTop: 30,
    paddingBottom: 30,
  },

  infoText: {
    fontFamily: "Manrope",
    textAlign: "center",
    fontSize: 16,
  },

  infoEmail: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Manrope",
  },

  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
    paddingTop: 20,
  },

  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    maxWidth: 400,
    minWidth: 350,
    borderColor: "#8E6CEF",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#170F2B",
  },
});
