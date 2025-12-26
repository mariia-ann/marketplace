import BranchFields from '@/src/components/ui/profile/address/searchFields/BranchFields';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function parcelFields() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <BranchFields />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
});









