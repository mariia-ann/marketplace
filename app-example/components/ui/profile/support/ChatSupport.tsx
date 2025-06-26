import { SafeAreaView, StyleSheet, Text } from 'react-native';
export default function ChatSupport() {
   return (
      <SafeAreaView style={styles.container}>
        <Text>ChatSupport</Text>
      </SafeAreaView >
  
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});