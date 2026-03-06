import { Link, router } from 'expo-router';
import {
  Bell,
  Cardholder,
  Chat,
  ChatsCircle,
  Gear,
  MapPin,
  Package,
  Question,
  SignOut,
  UserSwitch,
} from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogout } from '@/src/features/auth/hooks';

export default function DashBoard() {
  const { mutate: doLogout, isPending } = useLogout();

  const handleLogout = () => {
    doLogout(undefined, {
      onSuccess: () => {
        router.replace('/(main)/welcome');
      },
    });
  };

  return (
    <View style={styles.dashboardBlock}>
      <View style={styles.dashboardList}>
        <Link href='/profile/cards' asChild>
          <Pressable style={styles.dashboard}>
            <Cardholder size={32} weight='thin' />
            <Text style={styles.text}>Мої картки</Text>
          </Pressable>
        </Link>
        <Link href='/profile/addresses' asChild>
          <Pressable style={styles.dashboard}>
            <MapPin size={32} weight='thin' />
            <Text style={styles.text}>Мої адреси</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.dashboardList}>
        <Link href='/profile/orderHistory' asChild>
          <Pressable style={styles.dashboard}>
            <Package size={32} weight='thin' />
            <Text style={styles.text}>Історія замовлень</Text>
          </Pressable>
        </Link>

        <Link href='/profile/reviews' asChild>
          <Pressable style={styles.dashboard}>
            <Chat size={32} weight='thin' />
            <Text style={styles.text}>Мої відгуки</Text>
          </Pressable>
        </Link>

        <Link href='/profile/sellerMessages' asChild>
          <Pressable style={styles.dashboard}>
            <ChatsCircle size={32} weight='thin' />
            <Text style={styles.text}>Переписки з продавцями</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.dashboardList}>
        <Link href='/profile/notification/offersNotifications' asChild>
          <Pressable style={styles.dashboard}>
            <Bell size={32} weight='thin' />
            <Text style={styles.text}>Пропозиції та сповіщення</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.dashboardList}>
        <Link href='/profile/support' asChild>
          <Pressable style={styles.dashboard}>
            <Question size={32} weight='thin' />
            <Text style={styles.text}>Служба підтримки</Text>
          </Pressable>
        </Link>

        <Link href='/profile/settings' asChild>
          <Pressable style={styles.dashboard}>
            <Gear size={32} weight='thin' />
            <Text style={styles.text}>Налаштування</Text>
          </Pressable>
        </Link>
        <Link href='/(seller)' asChild>
          <Pressable style={styles.dashboard}>
            <UserSwitch size={32} weight='thin' />
            <Text style={styles.text}>Увійти в кабінет продавця</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.dashboardList}>
        <View style={styles.line}></View>
      </View>

      <View style={styles.dashboardList}>
        <Pressable
          style={styles.dashboard}
          onPress={handleLogout}
          disabled={isPending}
        >
          <SignOut size={32} weight='thin' />
          <Text style={styles.text}>
            {isPending ? 'Вихід...' : 'Вийти з профілю'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardBlock: {
    paddingVertical: 16,
    rowGap: 24,
  },
  dashboardList: {
    rowGap: 8,
  },
  dashboard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#8E6CEF',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Manrope',
  },
});
