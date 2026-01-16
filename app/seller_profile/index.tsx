import Colors from '@/constants/Colors';
import PrimaryButton from '@/src/components/common/buttons/PrimaryButton';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import SellerDashBoard from '@/src/components/ui/seller/SellerDashboard';
import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SellerProfile() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <NavigationHeader
        customStyles={{ marginBottom: 32 }}
        title='Кабінет продавця'
      />
      <ScrollView>
        <SellerDashBoard />
      </ScrollView>
      <PrimaryButton
        onPress={() => router.push('/seller_profile/create-shop')}
        title='Новий магазин'
        style={{ marginBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
});
