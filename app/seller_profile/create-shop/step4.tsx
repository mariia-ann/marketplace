import Colors from '@/constants/Colors';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopContactDetails = () => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 20 }}
    >
      <Text>Shop Contact Details Step</Text>
    </SafeAreaView>
  );
};

export default ShopContactDetails;
