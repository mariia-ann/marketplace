import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';

type Category = {
  id: string;
  title: string;
  icon: any;
};

const categories = [
  { id: '1', title: 'Clothes', icon: require('@/assets/images/home_page/categories/clothes-hanger.png') },
  { id: '2', title: 'Shoes', icon: require('@/assets/images/home_page/categories/sneaker.png') },
  { id: '3', title: 'Bags', icon: require('@/assets/images/home_page/categories/bags.png') },
  { id: '4', title: 'Accessories', icon: require('@/assets/images/home_page/categories/earrings.png') },
  { id: '5', title: 'Cosmetics', icon: require('@/assets/images/home_page/categories/beauty.png') },
  { id: '6', title: 'Home', icon: require('@/assets/images/home_page/categories/house.png') },
  { id: '7', title: 'Electronics', icon: require('@/assets/images/home_page/categories/laptop.png') },
  { id: '8', title: 'Services', icon: require('@/assets/images/home_page/categories/people.png') },
];

export default function CategoryGrid() {
  const handleCategoryPress = (categoryName: string) => {
    Alert.alert('Category Selected', `You selected ${categoryName}`);
  };

  const handleSeeAllPress = () => {
    Alert.alert('See All Categories', 'Redirecting to all categories...');
  };

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleCategoryPress(item.title)}
    >
      <View style={styles.iconWrapper}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.label}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.headerContainer}>
        <Text>Categories</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 24,
    paddingBottom: 16,
  },
  seeAllText: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
    color: '#000',
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    marginHorizontal: 15,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: -0.13,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },
});
