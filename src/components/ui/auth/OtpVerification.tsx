import OptionToggle from '@/src/components/common/OptionToggle/OptionToggle';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import {
  getAvailableVerificationMethods,
  getDefaultVerificationMethod,
} from '@/src/features/auth/verification';
import { useAuthStore } from '@/src/state/useAuthStore';
import {
  useSendEmailOtp,
  useSendPhoneOtp,
} from '@/src/features/auth/hooks/useSendOtp';

export default function OtpVerification() {
  const { email, phone } = useLocalSearchParams<{
    email?: string;
    phone?: string;
  }>();
  const verification = useAuthStore((s) => s.verification);
  const resolvedEmail =
    (typeof email === 'string' ? email : verification?.email) ?? null;
  const resolvedPhone =
    (typeof phone === 'string' ? phone : verification?.phone) ?? null;
  const context = verification ?? {
    email: resolvedEmail,
    phone: resolvedPhone,
    isEmailValidated: false,
    isPhoneValidated: false,
    source: 'signup' as const,
  };
  const availableMethods = getAvailableVerificationMethods(context);
  const defaultMethod = getDefaultVerificationMethod(context) ?? 'sms';
  const [method, setMethod] = React.useState<'sms' | 'email'>(defaultMethod);
  const [requestError, setRequestError] = React.useState<string | null>(null);

  const { mutate: sendPhoneCode, isPending: isSendingPhoneOtp } =
    useSendPhoneOtp();
  const { mutate: sendEmailCode, isPending: isSendingEmailOtp } =
    useSendEmailOtp();

  React.useEffect(() => {
    if (availableMethods.includes(method)) return;
    setMethod(defaultMethod);
  }, [availableMethods, defaultMethod, method]);

  const handleSend = () => {
    setRequestError(null);

    if (method === 'sms' && resolvedPhone) {
      sendPhoneCode(
        { phone: resolvedPhone },
        {
          onSuccess: (response) => {
            if (!response.ok) {
              setRequestError(
                response.message ??
                  'Не вдалося надіслати код. Спробуйте ще раз.',
              );
              return;
            }

            router.push({
              pathname: '/auth/otp-code-verification',
              params: { method, phone: resolvedPhone },
            });
          },
        },
      );
      return;
    }

    if (method === 'email' && resolvedEmail) {
      sendEmailCode(
        { email: resolvedEmail },
        {
          onSuccess: (response) => {
            if (!response.ok) {
              setRequestError(
                response.message ??
                  'Не вдалося надіслати код. Спробуйте ще раз.',
              );
              return;
            }

            router.push({
              pathname: '/auth/otp-code-verification',
              params: { method, email: resolvedEmail },
            });
          },
        },
      );
    }
  };

  const canSend =
    availableMethods.includes(method) &&
    (method === 'sms' ? !!resolvedPhone : !!resolvedEmail) &&
    !isSendingPhoneOtp &&
    !isSendingEmailOtp;

  const selectedContact = method === 'sms' ? resolvedPhone : resolvedEmail;

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
      {availableMethods.length > 0 && (
        <View style={[styles.row, styles.optionWrapper]}>
          {availableMethods.includes('sms') && (
            <OptionToggle
              title='SMS'
              pressed={method === 'sms'}
              handleClick={() => {
                setRequestError(null);
                setMethod('sms');
              }}
            />
          )}
          {availableMethods.includes('email') && (
            <OptionToggle
              title='Email'
              pressed={method === 'email'}
              handleClick={() => {
                setRequestError(null);
                setMethod('email');
              }}
            />
          )}
        </View>
      )}

      {/* Info */}
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>Код буде надіслано на:</Text>
        <Text style={styles.infoEmail}>{selectedContact}</Text>
        {requestError && <Text style={styles.errorText}>{requestError}</Text>}
        {!availableMethods.length && (
          <Text style={styles.errorText}>
            Немає доступного email або телефону для верифікації.
          </Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <PrimaryButton
          title='Відправити код'
          size='L'
          onPress={handleSend}
          active={canSend}
        />
        <SecondaryButton
          title='Відміна'
          size='L'
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centeredColumn: {
    paddingTop: 32,
    flexDirection: 'column',
    alignItems: 'center',
  },

  illustration: {
    marginBottom: 32,
    width: 220,
    height: 220,
  },

  subtitle: {
    fontFamily: 'Manrope',
    textAlign: 'center',
    fontSize: 18,
  },

  optionWrapper: {
    paddingVertical: 32,
    justifyContent: 'space-between',
  },

  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 32,
  },

  infoText: {
    fontFamily: 'Manrope',
    textAlign: 'center',
    fontSize: 16,
  },

  infoEmail: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Manrope',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
    fontFamily: 'Manrope',
  },

  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
