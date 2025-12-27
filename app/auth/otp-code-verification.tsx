import Colors from "@/constants/Colors";
import { NavigationHeader } from "@/src/components/common/NavigationHeader";
import { RequireGuest } from "@/src/features/auth/guards";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import PrimaryButton from "@/src/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/src/components/common/buttons/SecondaryButton";
import LinkButton from "@/src/components/common/buttons/LinkButton";
import { useSendOtp, useVerifyOtp } from "@/src/features/auth/hooks/useSendOtp";
import { Loader } from "@/src/components/common/Loader";
import { ShieldCheck } from "phosphor-react-native";

export default function OtpCodeVerification() {
  const { method, phone, email } = useLocalSearchParams<{
    method?: "sms" | "email";
    email?: string;
    phone?: string;
  }>();
  const [modalVisible, setModalVisible] = React.useState(false);

  console.warn(phone);

  const { mutate: sendCode, isPending } = useVerifyOtp();
  const { mutate: sendOtp, error } = useSendOtp();

  // Function to handle sending the OTP code for verification
  const handleSend = () => {
    if (!phone) return;
    console.warn("Sending OTP verification code", phone, 'code: "000000"');
    sendCode(
      { phone: phone, code: "000000" },
      {
        onSuccess: () => {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            router.push("/(tabs)");
          }, 10000);
        },
      },
    );
  };

  const handleResend = () => {
    if (phone) {
      console.warn("Re-sending OTP verification code", phone);
      sendOtp({ phone: phone }, { onSuccess: () => {} });
    }
  };

  const deliveryMethod =
    method === "email" ? "вашу електронну пошту" : "ващ номер телефону";

  const displayValue = method === "email" ? email : phone;
  console.warn(method);
  const [code, setCode] = React.useState("000000");

  return (
    <RequireGuest to="/(tabs)">
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <NavigationHeader title="Верифікація" showBack={true} />

          <View style={{ marginTop: 26.5 }}>
            <Text style={styles.verificationCommonTextStyle}>
              Ми відправили вам код на {deliveryMethod}
            </Text>
            <Text
              style={[
                styles.verificationCommonTextStyle,
                styles.verificationCommonTextStyleBold,
              ]}
            >
              {displayValue}
            </Text>
            <Text style={styles.verificationCommonTextStyle}>
              Цей код є активним протягом 10 хвилин після отримання
            </Text>
            <Text style={styles.verificationCommonTextStyle}>
              Введіть отриманий код
            </Text>
          </View>

          <View style={styles.formGroup}>
            <View style={{ flexDirection: "column", gap: 6 }}>
              <Text style={styles.inputLabel}>Введіть код</Text>
              <TextInput
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={6}
                style={styles.inputStyle}
                placeholder=""
                value={code}
                onChangeText={(text) => setCode(text.replace(/\D/g, ""))}
              />
            </View>

            <SecondaryButton
              title="Відправити знов"
              size="S"
              onPress={handleResend}
            />
          </View>
          <PrimaryButton
            active={code.length === 6}
            style={{ marginTop: 24 }}
            title="Підтвердити"
            size="L"
            onPress={handleSend}
          />
          <LinkButton
            style={{ marginTop: 24, alignSelf: "center" }}
            title="Помилка в номері телефону?"
            underline={true}
          />
        </ScrollView>
      </SafeAreaView>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.card}>
            {isPending ? (
              <Pressable onPress={() => setModalVisible(false)}>
                <Loader size="large" color={Colors.softPurple} />
              </Pressable>
            ) : (
              <View style={styles.modalCardContent}>
                <ShieldCheck
                  size={45}
                  weight="bold"
                  color={Colors.softPurple}
                  style={{ marginBottom: 27, alignSelf: "center" }}
                />
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>Верифікація</Text>
                  <Text style={styles.modalText}>пройшла успішно</Text>
                </View>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeModalText}>Закрити</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
    paddingBottom: 8,
    color: Colors.blackMain,
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "400",
  },
  verificationCommonTextStyleBold: {
    fontWeight: "700",
  },
  formGroup: {
    paddingTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  inputLabel: {
    fontFamily: "Manrope",
    fontSize: 12,
    color: Colors.grey400,
  },
  inputStyle: {
    height: 48,
    minWidth: 138,
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 13.5,
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "700",
    color: Colors.blackMain,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
  },
  modalCardContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 48,
    paddingVertical: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  modalTextContainer: {
    marginBottom: 24,
  },
  modalText: {
    textAlign: "center",
    fontSize: 22,
  },
  closeModalText: {
    textAlign: "right",
    color: Colors.softPurple,
    fontSize: 16,
    fontFamily: "Manrope",
    fontWeight: "700",
  },
});
