import DeliveryMethodPost from '@/app-example/components/ui/profile/address/DeliveryMethodPost';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function DeliveryMethod() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <DeliveryMethodPost />
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
})  