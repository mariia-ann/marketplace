import SelectOrder from "@/app-example/components/ui/profile/support/SelectOrder";
import { SafeAreaView, StyleSheet } from 'react-native';
export default function selectOrder() {
   return (
      <SafeAreaView style={{ flex: 1 }}>
        <SelectOrder />
      </SafeAreaView >
  
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});