import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import { RequireVerificationAccess } from '@/src/features/auth/guards';
import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import LinkButton from '@/src/components/common/buttons/LinkButton';
import {
  hasPendingVerification,
  hydrateVerificationContext,
  markVerificationMethodComplete,
  type VerificationMethod,
} from '@/src/features/auth/verification';
import {
  useSendEmailOtp,
  useSendPhoneOtp,
  useVerifyEmailOtp,
  useVerifyPhoneOtp,
} from '@/src/features/auth/hooks/useSendOtp';
import { Loader } from '@/src/components/common/Loader';
import { ShieldCheck } from 'phosphor-react-native';
import { useAuthStore } from '@/src/state/useAuthStore';

export default function OtpCodeVerification() {
  const { method, phone, email } = useLocalSearchParams<{
    method?: 'sms' | 'email';
    email?: string;
    phone?: string;
  }>();
  const verification = useAuthStore((s) => s.verification);
  const resolvedMethod = method ?? 'sms';
  const resolvedPhone =
    (typeof phone === 'string' ? phone : verification?.phone) ?? null;
  const resolvedEmail =
    (typeof email === 'string' ? email : verification?.email) ?? null;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [verificationError, setVerificationError] = React.useState<
    string | null
  >(null);
  const didNavigateAfterSuccessRef = React.useRef(false);
  const nextRouteRef = React.useRef<
    '/auth/login' | '/auth/signup-otp' | '/(tabs)'
  >('/auth/login');

  const { mutate: verifyPhoneCode, isPending: isVerifyingPhone } =
    useVerifyPhoneOtp();
  const { mutate: verifyEmailCode, isPending: isVerifyingEmail } =
    useVerifyEmailOtp();
  const { mutate: resendPhoneCode, isPending: isSendingPhone } =
    useSendPhoneOtp();
  const { mutate: resendEmailCode, isPending: isSendingEmail } =
    useSendEmailOtp();
  const isPending =
    isVerifyingPhone || isVerifyingEmail || isSendingPhone || isSendingEmail;

  const redirectAfterSuccess = React.useCallback(() => {
    // Prevent duplicate navigation from multiple modal close events.
    if (didNavigateAfterSuccessRef.current) return;
    didNavigateAfterSuccessRef.current = true;
    setModalVisible(false);
    router.replace(nextRouteRef.current);
  }, []);

  const updateVerificationState = React.useCallback(
    async (verifiedMethod: VerificationMethod) => {
      const auth = useAuthStore.getState();
      const currentContext =
        auth.verification ??
        ({
          email: resolvedEmail,
          phone: resolvedPhone,
          isEmailValidated: false,
          isPhoneValidated: false,
          source: auth.access_token ? 'login' : 'signup',
        } as const);

      const nextContext = await hydrateVerificationContext(
        markVerificationMethodComplete(currentContext, verifiedMethod),
        auth.userId,
      );

      if (hasPendingVerification(nextContext)) {
        auth.setVerification(nextContext);
        nextRouteRef.current = '/auth/signup-otp';
        return;
      }

      auth.clearVerification();
      nextRouteRef.current = auth.access_token ? '/(tabs)' : '/auth/login';
    },
    [resolvedEmail, resolvedPhone],
  );

  const handleVerifyResponse = React.useCallback(
    async (
      verifiedMethod: VerificationMethod,
      ok: boolean,
      reason?: string,
    ) => {
      if (!ok) {
        setVerificationError(reason ?? 'Невірний код. Спробуйте ще раз.');
        return;
      }

      setVerificationError(null);
      didNavigateAfterSuccessRef.current = false;
      await updateVerificationState(verifiedMethod);
      setModalVisible(true);
    },
    [updateVerificationState],
  );

  const handleSend = () => {
    if (code.length !== 6 || isPending) return;
    setVerificationError(null);

    if (resolvedMethod === 'email' && resolvedEmail) {
      verifyEmailCode(
        { email: resolvedEmail, code },
        {
          onSuccess: async (response) => {
            await handleVerifyResponse('email', response.ok, response.reason);
          },
        },
      );
      return;
    }

    if (!resolvedPhone) return;

    verifyPhoneCode(
      { phone: resolvedPhone, code },
      {
        onSuccess: async (response) => {
          await handleVerifyResponse('sms', response.ok, response.reason);
        },
      },
    );
  };

  const handleResend = () => {
    setVerificationError(null);

    if (resolvedMethod === 'email' && resolvedEmail) {
      resendEmailCode(
        { email: resolvedEmail },
        {
          onSuccess: (response) => {
            if (!response.ok) {
              setVerificationError(
                response.message ??
                  'Не вдалося повторно надіслати код. Спробуйте ще раз.',
              );
            }
          },
        },
      );
      return;
    }

    if (!resolvedPhone) return;
    resendPhoneCode(
      { phone: resolvedPhone },
      {
        onSuccess: (response) => {
          if (!response.ok) {
            setVerificationError(
              response.message ??
                'Не вдалося повторно надіслати код. Спробуйте ще раз.',
            );
          }
        },
      },
    );
  };

  const deliveryMethod =
    resolvedMethod === 'email' ? 'вашу електронну пошту' : 'ваш номер телефону';

  const displayValue =
    resolvedMethod === 'email' ? resolvedEmail : resolvedPhone;
  const helpLabel =
    resolvedMethod === 'email'
      ? 'Помилка в email?'
      : 'Помилка в номері телефону?';
  const [code, setCode] = React.useState('');

  return (
    <RequireVerificationAccess to='/(tabs)'>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
        >
          <NavigationHeader title='Верифікація' showBack={true} />

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
            <View style={{ flexDirection: 'column', gap: 6 }}>
              <Text style={styles.inputLabel}>Введіть код</Text>
              <TextInput
                keyboardType='number-pad'
                inputMode='numeric'
                maxLength={6}
                style={styles.inputStyle}
                placeholder=''
                value={code}
                onChangeText={(text) => {
                  setVerificationError(null);
                  setCode(text.replace(/\D/g, ''));
                }}
              />
            </View>

            <SecondaryButton
              title='Відправити знов'
              size='S'
              onPress={handleResend}
            />
          </View>
          {verificationError && (
            <Text style={styles.errorText}>{verificationError}</Text>
          )}
          <PrimaryButton
            active={code.length === 6 && !!displayValue && !isPending}
            style={{ marginTop: 24 }}
            title='Підтвердити'
            size='L'
            onPress={handleSend}
          />
          <LinkButton
            style={{ marginTop: 24, alignSelf: 'center' }}
            title={helpLabel}
            underline={true}
          />
        </ScrollView>
      </SafeAreaView>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={redirectAfterSuccess}
      >
        <Pressable style={styles.backdrop} onPress={redirectAfterSuccess}>
          <Pressable
            style={styles.card}
            onPress={(event) => event.stopPropagation()}
          >
            {isPending ? (
              <Loader size='large' color={Colors.softPurple} />
            ) : (
              <View style={styles.modalCardContent}>
                <ShieldCheck
                  size={45}
                  weight='bold'
                  color={Colors.softPurple}
                  style={{ marginBottom: 27, alignSelf: 'center' }}
                />
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>Верифікація</Text>
                  <Text style={styles.modalText}>пройшла успішно</Text>
                </View>
                <Pressable onPress={redirectAfterSuccess}>
                  <Text style={styles.closeModalText}>Закрити</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </RequireVerificationAccess>
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
    fontFamily: 'Manrope',
    fontWeight: '400',
  },
  verificationCommonTextStyleBold: {
    fontWeight: '700',
  },
  formGroup: {
    paddingTop: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  inputLabel: {
    fontFamily: 'Manrope',
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
    fontFamily: 'Manrope',
    fontWeight: '700',
    color: Colors.blackMain,
  },
  errorText: {
    marginTop: 12,
    color: Colors.red,
    fontSize: 12,
    fontFamily: 'Manrope',
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
  },
  modalCardContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 48,
    paddingVertical: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalTextContainer: {
    marginBottom: 24,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 22,
  },
  closeModalText: {
    textAlign: 'right',
    color: Colors.softPurple,
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: '700',
  },
});
