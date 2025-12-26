// this is a OTP component which gives user ability to verify
// either email or phone number via otp
// presently only Phone verification is functional in dummy way
import OptionToggle from "@/src/components/common/OptionToggle/OptionToggle";
import { CUSTOM_ICON_REF } from "@/src/components/common/SvgIcons/IconRef";
import SvgIcons from "@/src/components/common/SvgIcons/SvgIcons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SignupDto } from "@/src/features/auth/api";
import PrimaryButton from "@/src/components/common/buttons/PrimaryButton";
import { router } from "expo-router";
import SecondaryButton from "@/src/components/common/buttons/SecondaryButton";
import { useSendOtp } from "@/src/features/auth/hooks/useSendOtp";

export default function OtpVerification() {
  const [method, setMethod] = useState<"sms" | "email">("sms");

  const qc = useQueryClient();
  const { data: signupDto } = useQuery({
    queryKey: ["signupDto"],
    queryFn: async () => qc.getQueryData<SignupDto>(["signupDto"]),
    enabled: false,
    initialData: () => qc.getQueryData<SignupDto>(["signupDto"]),
  });
  const { mutate: sendOtp, isPending } = useSendOtp();

  const handleSend = () => {
    if (signupDto?.phone) {
      sendOtp(
        { phone: signupDto.phone },
        { onSuccess: () => router.push("/auth/verification") },
      );
    }
  };

  return (
    <>
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
          title="SMS"
          pressed={method === "sms"}
          handleClick={() => setMethod("sms")}
        />
        <OptionToggle
          title="Email"
          pressed={method === "email"}
          handleClick={() => setMethod("email")}
        />
      </View>

      {/* Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>Код буде надіслано на:</Text>
        <Text style={styles.infoEmail}>
          {method === "sms" ? signupDto?.phone : signupDto?.email}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <PrimaryButton title="Відправити код" size="L" onPress={handleSend} />
        <SecondaryButton
          title="Відміна"
          size="L"
          onPress={() => {
            router.back();
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  centeredColumn: {
    paddingTop: 32,
    flexDirection: "column",
    alignItems: "center",
  },

  illustration: {
    marginBottom: 32,
    width: 220,
    height: 220,
  },

  subtitle: {
    fontFamily: "Manrope",
    textAlign: "center",
    fontSize: 18,
  },

  optionWrapper: {
    paddingVertical: 32,
    justifyContent: "space-between",
  },

  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingBottom: 32,
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
    gap: 16,
  },
});
