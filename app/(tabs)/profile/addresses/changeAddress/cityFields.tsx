import CityFields from "@/src/components/ui/profile/address/searchFields/CityFields";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function cityFields() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <CityFields />
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
});
