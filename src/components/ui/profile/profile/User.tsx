import { Link } from "expo-router"
import { PencilSimple } from "phosphor-react-native"
import { Pressable, StyleSheet, Text, View } from "react-native"

// заглушка
const firstName = "Катерина";
const lastName = "Ковальчук";

export default function User() {

  const fullName = `${firstName} ${lastName}`
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

    return (
        <View style={styles.user}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.nameUser}>{fullName}</Text>
          </View>
          <Link href="/profile/edit" asChild>
            <Pressable>
              <PencilSimple size={24} />
            </Pressable>
          </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      },
      text: {
        fontSize: 20,
        color: "blue",
      },
      avatar: {
        borderRadius: 50,
        height: 80,
        width: 80,
        backgroundColor: "#8E6CEF",
      },
      avatarText: {
        color: "#170F2B",
        margin: "auto",
        fontSize: 22,
        fontFamily: "ManropeBold",
      },
      nameUser: {
        fontSize: 22,
        fontFamily: "Manrope",
      },
})