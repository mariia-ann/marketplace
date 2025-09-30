import Colors from "@/constants/Colors";
import CustomButton from "@/src/components/common/CustomButton";
import AddAnswerInputs from "@/src/components/ui/profile/reviews/AddAnswerInputs";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function AddAnswer() {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      // відправка відповіді на коментар на сервер
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AddAnswerInputs />
        <CustomButton
          title='Опублікувати відповідь'
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
