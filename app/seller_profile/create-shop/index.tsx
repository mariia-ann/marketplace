import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import SecondaryButton from '@/src/components/common/buttons/SecondaryButton';
import WelcomeBackground from '@/src/components/ui/welcome_page/WelcomeBackground';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateShop = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <WelcomeBackground
        style={{ alignSelf: 'center' }}
        width={350}
        height={350}
      />
      <Text style={styles.title}>створіть свій магазин</Text>
      <View style={styles.buttonBlock}>
        <PrimaryButton
          title='Почати'
          onPress={() => router.push('/seller_profile/create-shop/step6')}
          size='L'
        />
        <SecondaryButton
          title='Відмовитись'
          active={true}
          size='L'
          onPress={() => router.push('/seller_profile')}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateShop;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 51,
  },
  buttonBlock: {
    marginTop: 48,
    flexDirection: 'column',
    gap: 16,
    alignSelf: 'center',
  },
});
