import { Link } from 'expo-router';
import { PencilSimple } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useMe } from '@/src/features/auth/hooks';

export default function User() {
  const { data: currentUser, isLoading, isFetching, error, status } = useMe();
  console.warn('inside User component, User is: ', currentUser);

  if (isLoading || isFetching) {
    return (
      <View style={styles.user}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>...</Text>
        </View>
        <View>
          <Text style={styles.nameUser}>Завантаження...</Text>
        </View>
      </View>
    );
  }

  const first = currentUser?.firstName ?? '';
  const last = currentUser?.lastName ?? '';

  const fullName = `${first} ${last}`.trim();
  const initials = `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();

  return (
    <View style={styles.user}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <View>
        <Text style={styles.nameUser}>{fullName}</Text>
      </View>
      <Link href='/profile/edit' asChild>
        <Pressable>
          <PencilSimple size={24} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    borderRadius: 50,
    height: 80,
    width: 80,
    backgroundColor: '#8E6CEF',
  },
  avatarText: {
    color: '#170F2B',
    margin: 'auto',
    fontSize: 22,
    fontFamily: 'ManropeBold',
  },
  nameUser: {
    fontSize: 22,
    fontFamily: 'Manrope',
  },
});
