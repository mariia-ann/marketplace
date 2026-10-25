import OptionToggle from '@/src/components/common/OptionToggle/OptionToggle';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import { router, useLocalSearchParams } from 'expo-router';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import {
  getAvailableVerificationMethods,
  getDefaultVerificationMethod,
} from '@/src/features/auth/verification';
import { useAuthStore } from '@/src/state/useAuthStore';
import {
  addRegistrationContact,
  removeRegistrationContact,
} from '@/src/features/auth/api';
import { saveRefreshToken } from '@/src/features/auth/secureTokens';
import {
  useSendEmailOtp,
  useSendPhoneOtp,
} from '@/src/features/auth/hooks/useSendOtp';

/** Uses backend contact requirements to offer OTP, buyer removal, or contact replacement. */
export default function OtpVerification() {
  const { email, phone } = useLocalSearchParams<{
    email?: string;
    phone?: string;
  }>();
  const verification = useAuthStore((s) => s.verification);
  const registrationState = useAuthStore((s) => s.registrationState);
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
  const missingEmailRequired =
    registrationState?.contacts.email === 'MISSING' &&
    registrationState.requiredContactChannels.includes('email');
  const defaultMethod =
    getDefaultVerificationMethod(context) ??
    (missingEmailRequired ? 'email' : 'sms');
  const [method, setMethod] = React.useState<'sms' | 'email'>(defaultMethod);
  const [requestError, setRequestError] = React.useState<string | null>(null);
  const [replacementVisible, setReplacementVisible] = React.useState(false);
  const [replacementValue, setReplacementValue] = React.useState('');
  const [isUpdatingContact, setIsUpdatingContact] = React.useState(false);

  const {
    mutate: sendPhoneCode,
    mutateAsync: sendPhoneCodeAsync,
    isPending: isSendingPhoneOtp,
  } = useSendPhoneOtp();
  const {
    mutate: sendEmailCode,
    mutateAsync: sendEmailCodeAsync,
    isPending: isSendingEmailOtp,
  } = useSendEmailOtp();

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
  const selectedChannel = method === 'sms' ? 'phone' : 'email';
  const selectedContactState = registrationState?.contacts[selectedChannel];
  const canRemoveBuyerContact =
    registrationState?.accountType === 'buyer' &&
    registrationState.requiredContactChannels.length > 1 &&
    (selectedContactState === 'PENDING' || selectedContactState === 'MISSING');

  // Contact changes may activate the account; always route using the returned state.
  const applyRegistrationResponse = async (
    response: Awaited<ReturnType<typeof addRegistrationContact>>,
  ) => {
    const auth = useAuthStore.getState();
    if (response.accessToken) auth.applyAccessToken(response.accessToken);
    if (response.refreshToken) await saveRefreshToken(response.refreshToken);
    auth.setRegistrationState(response.registrationState);
    if (response.registrationState.accountStatus === 'ACTIVE') {
      auth.clearVerification();
      router.replace('/(tabs)');
      return;
    }
    auth.setVerification({
      email: response.registrationState.contactHints.email,
      phone: response.registrationState.contactHints.phone,
      isEmailValidated:
        response.registrationState.contacts.email === 'VERIFIED',
      isPhoneValidated:
        response.registrationState.contacts.phone === 'VERIFIED',
      source: 'signup',
    });
  };

  const handleRemoveContact = async () => {
    try {
      setIsUpdatingContact(true);
      setRequestError(null);
      const response = await removeRegistrationContact(selectedChannel);
      await applyRegistrationResponse(response);
    } catch {
      setRequestError('Не вдалося видалити контакт. Спробуйте ще раз.');
    } finally {
      setIsUpdatingContact(false);
    }
  };

  const handleReplaceContact = async () => {
    const value = replacementValue.trim();
    if (!value) return;
    try {
      setIsUpdatingContact(true);
      setRequestError(null);
      const response = await addRegistrationContact(selectedChannel, value);
      await applyRegistrationResponse(response);
      setReplacementVisible(false);
      setReplacementValue('');
      if (selectedChannel === 'phone') {
        const sent = await sendPhoneCodeAsync({ phone: value });
        if (!sent.ok) throw new Error('Unable to send OTP');
        router.push({
          pathname: '/auth/otp-code-verification',
          params: { method: 'sms', phone: value },
        });
      } else {
        const sent = await sendEmailCodeAsync({ email: value });
        if (!sent.ok) throw new Error('Unable to send OTP');
        router.push({
          pathname: '/auth/otp-code-verification',
          params: { method: 'email', email: value },
        });
      }
    } catch {
      setRequestError(
        'Не вдалося замінити контакт. Перевірте його та спробуйте ще раз.',
      );
    } finally {
      setIsUpdatingContact(false);
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
        {canRemoveBuyerContact && (
          <>
            <Text style={styles.removalNote}>
              Видалений контакт більше не буде прив’язаний до акаунта і його не
              можна буде використовувати для входу.
            </Text>
            <SecondaryButton
              title='Не можу підтвердити цей контакт — видалити'
              size='L'
              onPress={handleRemoveContact}
              active={!isUpdatingContact}
            />
          </>
        )}
        {(registrationState?.accountType === 'seller' ||
          selectedContactState === 'MISSING' ||
          selectedContactState === 'PENDING') && (
          <SecondaryButton
            title={`Замінити ${selectedChannel === 'email' ? 'email' : 'телефон'}`}
            size='L'
            onPress={() => setReplacementVisible(true)}
            active={!isUpdatingContact && selectedContactState !== 'VERIFIED'}
          />
        )}
      </View>

      <Modal
        visible={replacementVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setReplacementVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Вкажіть новий {selectedChannel === 'email' ? 'email' : 'телефон'}
            </Text>
            <TextInput
              value={replacementValue}
              onChangeText={setReplacementValue}
              autoCapitalize='none'
              keyboardType={
                selectedChannel === 'email' ? 'email-address' : 'phone-pad'
              }
              style={styles.replacementInput}
              placeholder={
                selectedChannel === 'email' ? 'name@example.com' : '+380...'
              }
            />
            <PrimaryButton
              title={
                isUpdatingContact
                  ? 'Зберігаємо...'
                  : 'Замінити та надіслати код'
              }
              size='L'
              onPress={handleReplaceContact}
              active={!isUpdatingContact && !!replacementValue.trim()}
            />
            <Pressable onPress={() => setReplacementVisible(false)}>
              <Text style={styles.cancelText}>Скасувати</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  modalTitle: { fontSize: 17, fontWeight: '600', textAlign: 'center' },
  replacementInput: {
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cancelText: { textAlign: 'center', padding: 8 },
  removalNote: { textAlign: 'center', color: '#555', fontSize: 12 },
});
