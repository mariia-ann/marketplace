import CustomButton from "@/src/components/common/CustomButton";
import AddCommentInputs from "@/src/components/ui/profile/reviews/AddCommentInputs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function AddComment() {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      // відправка коментаря на сервер
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AddCommentInputs />
        <CustomButton
          title='Опублікувати коментар'
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 56,
  },
});
