import emptyFavorites from '@/assets/images/favorites_page/emptyFavorites.png';
import Colors from '@/constants/Colors';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
};

const FavoritesEmptyPage = ({ title, subtitle }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={emptyFavorites}
          style={styles.mainPhoto}
          resizeMode='contain'
        />

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  mainPhoto: {
    width: 142.5,
    height: 177.47,
  },

  title: {
    marginTop: 24,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: Colors.blackMain,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 24,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.blackMain,
  },
});

export default FavoritesEmptyPage;
