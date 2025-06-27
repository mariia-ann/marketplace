import CustomButton from "@/app-example/components/CustomButton";
import AddAnswerInputs from "@/app-example/components/ui/profile/reviews/AddAnswerInputs";
import Colors from "@/constants/Colors";
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
        <CustomButton title="Опублікувати відповідь" onPress={handleSubmit} />
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
