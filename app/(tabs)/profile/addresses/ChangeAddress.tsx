import ChangeAddress from '@/app-example/components/ui/profile/address/ChangeAddress';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function ChangeAddresses() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ChangeAddress />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
})  