import {
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
type ProfileHeaderProps = NativeStackHeaderProps;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ route, options }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {route.name !== "index" && (
        <Pressable onPress={() => router.back()} style={styles.headerLeft}>
          <View style={styles.backButton}>
            <CaretLeft size={18} color="#FFFFFF" weight="bold" />
          </View>
        </Pressable>
      )}
      <Text style={styles.title}>{options.title ?? route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight || 54,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 18,
    backgroundColor: "#fff",
    // position: "relative",
  },
  headerLeft: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    // zIndex: 10,
  },
  backButton: {
    backgroundColor: "#AC94E8",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    // textAlign: "center",
    fontSize: 22,
    fontFamily: "Manrope",
    color: "#170F2B",
  },
});