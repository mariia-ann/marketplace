import SupportScreen from '@/app-example/components/ui/profile/support/SupportScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
export default function Support() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SupportScreen />
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});