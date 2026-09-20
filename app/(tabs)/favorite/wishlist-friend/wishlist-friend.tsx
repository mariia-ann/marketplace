import React, { useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Check, Funnel, SlidersHorizontal } from 'phosphor-react-native';

import Colors from '@/constants/Colors';
import { BottomSheetModal } from '@/src/components/common/BottomSheetModal';
import { FriendProfileCard } from '@/src/components/common/FriendProfileCard';
import ItemCard from '@/src/components/ui/home_page/ItemCard';
import { getWishlistFriendData } from '@/src/features/wishlist/data/mockWishlistFriend';
import { WishlistFriendProduct } from '@/src/types/WishlistFriend';
import {
  SORT_LABEL_MAP,
  SORT_OPTIONS,
  SortOption,
} from '@/src/utils/sortOptions';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

export default function WishlistFriendScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Initialize wishlist data based on ID (defaults to mock object for any ID)
  const initialData = useMemo(() => getWishlistFriendData(id), [id]);

  const [friendName] = useState<string>(initialData.friendName);
  const [friendProfileImage] = useState<string>(initialData.friendProfileImage);
  const [title] = useState<string>(initialData.title);
  const [isSaved, setIsSaved] = useState<boolean>(initialData.isSaved || false);
  const [products, setProducts] = useState<WishlistFriendProduct[]>(
    initialData.productList,
  );
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false);

  // Calculate dynamic reserved count
  const reservedCount = useMemo(() => {
    return products.filter((p) => p.isReserved).length;
  }, [products]);

  const totalProductsCount = initialData.totalProducts || products.length;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Перегляньте вішліст "${title}" від ${friendName} у додатку Marketplace!`,
      });
    } catch {
      // Ignored
    }
  };

  const handleToggleSave = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);
    Toast.show({
      type: 'success',
      text1: nextState ? 'Вішліст збережено' : 'Вішліст видалено зі збережених',
      text2: nextState
        ? `Вішліст "${title}" додано до ваших збережених`
        : undefined,
      position: 'bottom',
      bottomOffset: 80,
    });
  };

  const handleToggleReserve = (product: WishlistFriendProduct) => {
    const nextReservedState = !product.isReserved;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, isReserved: nextReservedState } : p,
      ),
    );

    Toast.show({
      type: nextReservedState ? 'success' : 'info',
      text1: nextReservedState ? 'Товар зарезервовано' : 'Резервацію скасовано',
      text2: nextReservedState
        ? `Ви зарезервували "${product.title}"`
        : `Резервацію для "${product.title}" знято`,
      position: 'bottom',
      bottomOffset: 80,
    });
  };

  const handleToggleFavorite = (product: WishlistFriendProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  };

  // Sorted product list
  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortOption) {
      case 'rating':
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price_asc':
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_desc':
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
      default:
        return list;
    }
  }, [products, sortOption]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContentStyle}
      showsVerticalScrollIndicator={false}
    >
      {/* Friend Profile Card using standalone FriendProfileCard component */}
      <FriendProfileCard
        friendName={friendName}
        friendProfileImage={friendProfileImage}
        totalProducts={totalProductsCount}
        productsReserved={reservedCount}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={handleShare}
      />

      {/* Filter & Sort Bar */}
      <View style={styles.filterSortRow}>
        <TouchableOpacity
          style={styles.filterSortItem}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Фільтри',
              'Фільтрація товарів вішліста за категорією та ціною.',
            )
          }
        >
          <Funnel size={30} color={Colors.blackMain} weight='thin' />
          <View style={styles.filterSortTexts}>
            <Text style={styles.filterSortTitle}>Фільтр</Text>
            <Text style={styles.filterSortSubtitle}>не обраний</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterSortItem}
          activeOpacity={0.7}
          onPress={() => setIsSortModalVisible(true)}
        >
          <SlidersHorizontal size={30} color={Colors.blackMain} weight='thin' />
          <View style={styles.filterSortTexts}>
            <Text style={styles.filterSortTitle}>Сортування</Text>
            <Text style={styles.filterSortSubtitle}>
              {SORT_LABEL_MAP[sortOption]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <View style={styles.productsGrid}>
        {sortedProducts.map((product) => (
          <ItemCard
            key={product.id}
            cardWidth={CARD_WIDTH}
            imageSrc={{ uri: product.image }}
            itemName={product.title}
            discountedPrice={product.price}
            mrpPrice={product.oldPrice}
            rating={product.rating}
            addedTowishlist={product.isFavorite}
            handleSetWishlist={() => handleToggleFavorite(product)}
            actionButtonText={
              product.isReserved ? 'Заброньовано' : 'Забронювати'
            }
            isActionActive={product.isReserved}
            onActionButtonPress={() => handleToggleReserve(product)}
          />
        ))}
      </View>

      {/* Sorting Selection Modal using common BottomSheetModal */}
      <BottomSheetModal
        visible={isSortModalVisible}
        onClose={() => setIsSortModalVisible(false)}
        title='Сортування'
      >
        {SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.modalOption}
            onPress={() => {
              setSortOption(option.id);
              setIsSortModalVisible(false);
            }}
          >
            <Text
              style={[
                styles.modalOptionText,
                sortOption === option.id && styles.modalOptionTextActive,
              ]}
            >
              {option.label}
            </Text>
            {sortOption === option.id && (
              <Check size={20} color={Colors.softPurple} weight='bold' />
            )}
          </TouchableOpacity>
        ))}
      </BottomSheetModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
  },
  containerContentStyle: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 40,
  },
  filterSortRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  filterSortItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  filterSortTexts: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  filterSortTitle: {
    fontSize: 15,
    fontFamily: 'ManropeSemiBold',
    fontWeight: '600',
    color: Colors.blackMain,
  },
  filterSortSubtitle: {
    fontSize: 13,
    fontFamily: 'Manrope',
    color: Colors.grey500,
    marginTop: 2,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F8',
  },
  modalOptionText: {
    fontSize: 15,
    fontFamily: 'Manrope',
    color: Colors.blackMain,
  },
  modalOptionTextActive: {
    fontFamily: 'ManropeSemiBold',
    fontWeight: '600',
    color: Colors.softPurple,
  },
});
