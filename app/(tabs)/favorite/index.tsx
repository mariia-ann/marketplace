import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мої вподобання</Text>
      <Text style={styles.subtitle}>Ваші улюблені товари зберігаються тут</Text>

      <Link href="/favorite/collections/for-home" style={styles.collectionCard}>
        <View style={styles.cardContent}>
          <Text style={styles.collectionTitle}>Для дому</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#170F2B',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    fontFamily: 'ManropeBold',
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Manrope',
    textAlign: 'center',
  },
  collectionCard: {
    marginTop: 32,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E4F8',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionTitle: {
    color: '#170F2B',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ManropeBold',
  },
  arrow: {
    color: '#8E6CEF',
    fontSize: 18,
    fontWeight: '600',
  },
});
