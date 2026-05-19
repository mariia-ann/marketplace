import { StyleSheet, View } from 'react-native';
import FavoritesMain from '@/src/components/ui/favorites_page/FavoritesMain';

export default function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <FavoritesMain />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
