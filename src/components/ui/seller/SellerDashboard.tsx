import { Link, router } from 'expo-router';
import {
  Bell,
  CaretDown,
  ChartLineUp,
  Gear,
  Question,
  SignOut,
  Storefront,
  UserList,
  UserSwitch,
} from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLogout } from '@/src/features/auth/hooks';
import ShopPickerDropDown from '@/src/components/ui/seller/ShopPickerDropDown';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';

export default function SellerDashBoard() {
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
      <Link href='/profile/cards' asChild>
        <Pressable>
          <ShopPickerDropDown
            backgroundColor={Colors.purple50}
            title='Мої магазини'
            leftIcon={<Storefront size={32} weight='thin' />}
            rightIcon={<Entypo name='chevron-down' size={24} color='black' />}
          />
        </Pressable>
      </Link>
      <View style={styles.dashboardList}>
        <Link href='/profile/addresses' asChild>
          <Pressable style={styles.dashboard}>
            <UserList size={32} weight='thin' />
            <Text style={styles.text}>Мої дані</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.dashboardList}>
        <Link href='/profile/orderHistory' asChild>
          <Pressable style={styles.dashboard}>
            <ChartLineUp size={32} weight='thin' />
            <Text style={styles.text}>Загальна статистика</Text>
          </Pressable>
        </Link>
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
        <Link href='/(tabs)' asChild>
          <Pressable style={styles.dashboard}>
            <UserSwitch size={32} weight='thin' />
            <Text style={styles.text}>Увійти в кабінет покупця</Text>
          </Pressable>
        </Link>
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
    paddingHorizontal: 16,
  },
  dashboard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Manrope',
  },
});
