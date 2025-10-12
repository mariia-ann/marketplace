import AddNewAddress from '@/src/components/ui/profile/address/AddNewAddress';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function addNewAddress() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <AddNewAddress />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
}) 
