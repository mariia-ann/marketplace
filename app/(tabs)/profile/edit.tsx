import KeyboardAwareLayout from "@/src/components/common/KeyboardAwareLayout";
import EditPhoto from "@/src/components/ui/profile/edit/EditPhoto";
import FormFields from "@/src/components/ui/profile/edit/formFields/FormFields";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareLayout>
        <EditPhoto />

        <View style={styles.divider} />

        <FormFields />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Зберегти зміни</Text>
        </TouchableOpacity>
      </KeyboardAwareLayout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: "#8E6CEF",
    marginHorizontal: 20,
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: "#8E6CEF",
    height: 52,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    //fontFamily: 'OutfitBold',
    fontWeight: 700,
  },
});
