import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import Colors from '@/constants/Colors';
import ItemCard from '@/src/components/ui/home_page/ItemCard';
import SearchBar from '@/src/components/ui/home_page/header/SearchBar';

import {
  ShareNetwork,
  Funnel,
  SlidersHorizontal,
  Check,
  Trash,
  FolderSimplePlus,
} from 'phosphor-react-native';
import { useFavoritesStore } from '@/src/state/useFavoritesStore';
import FavoritesEmptyPage from '../FavoritesEmptyPage';
import { useMe } from '@/src/features/auth/hooks';
import { api } from '@/src/lib/api';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - 20) / 2; // 2 картки в ряд + невеликий проміжок

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  image: any;
  isFavorite: boolean;
  selected?: boolean;
}

const FavoritesGoodsMain = () => {
  /*const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5,
            image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 2,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,
            image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
        { id: 3,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5,
            image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 4,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,
            image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 5,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5, image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 6,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,
            image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 7,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5,
            image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },{
            id: 8,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,
            image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 9,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5,
            image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 10,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 11,
            title: "Жіночі черевики на підборах з натураль…",
            price: 3600,
            oldPrice: 4200,
            rating: 4.5,
            image: require("@/assets/images/emoji1.png"),
            isFavorite: false,
            selected: false,
        },
        {
            id: 12,
            title: "Чоботи Марсала жіночі осінні",
            price: 4199,
            rating: 4.5,
            image: require("@/assets/images/emoji2.png"),
            isFavorite: false,
            selected: false,
        },
]);*/
  const { items, removeMany } = useFavoritesStore();
  const { data: me, isLoading: isUserLoading, isError: isUserError } = useMe();

  const [isChoosing, setIsChoosing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectedCount = selectedIds.length;

  const totalCount = items.length;

  const handleChoosePress = () => {
    setIsChoosing((prev) => !prev);
    if (isChoosing) {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const counter = items.length;

  const allSelected = useMemo(
    () => items.length > 0 && selectedIds.length === items.length,
    [items, selectedIds],
  );

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((p) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    removeMany(selectedIds);
    setSelectedIds([]);
  };

  const showFilters = counter > 10;

  if (isUserLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.white }} />;
  }

  if (!items || items.length === 0) {
    return (
      <FavoritesEmptyPage
        title='Ваші обрані товари'
        subtitle='Додавайте сюди речі, які вам сподобалися, за допомогою сердечка. Впорядковуйте їх у тематичні колекції та створюйте вішлісти для близьких.'
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <Text style={styles.counterText}>
            {isChoosing
              ? `Обрано ${selectedCount}/${totalCount} товарів`
              : `Усього ${totalCount} товарів`}
          </Text>

          <ShareNetwork size={32} color='#170f2b' weight='thin' />
        </View>

        {/* ===== Select row ===== */}
        <View style={styles.selectRow}>
          <TouchableOpacity
            style={styles.selectAllContainer}
            onPress={handleSelectAll}
          >
            <View
              style={[styles.checkbox, allSelected && styles.checkboxActive]}
            >
              {allSelected && <Check size={16} color='#fff' />}
            </View>

            <Text style={styles.selectAllText}>Усі</Text>
          </TouchableOpacity>

          {/* Іконки показуються тільки коли є режим вибору */}
          {isChoosing && (
            <View style={styles.actionsIcons}>
              <TouchableOpacity onPress={handleDeleteSelected}>
                <Trash size={24} color='#d30004' />
              </TouchableOpacity>
              <View style={{ width: 24 }} />
              <FolderSimplePlus size={24} color='#170f2b' />
            </View>
          )}

          <TouchableOpacity
            style={styles.chooseBtn}
            onPress={handleChoosePress}
          >
            <Text style={styles.chooseText}>
              {isChoosing ? 'Скасувати' : 'Вибрати'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ===== Search ===== */}
        {showFilters && (
          <View style={styles.searchWrapper}>
            <SearchBar />
          </View>
        )}

        {/* ===== Filters & Sorting ===== */}
        {showFilters && (
          <View style={styles.filtersRow}>
            <View style={styles.filterItem}>
              <Funnel size={32} color='#170f2b' weight='thin' />
              <View style={styles.filterTextBlock}>
                <Text style={styles.filterTitle}>Фільтр</Text>
                <Text style={styles.filterSubtitle}>не обраний</Text>
              </View>
            </View>

            <View style={styles.filterItem}>
              <SlidersHorizontal size={32} color='#170f2b' weight='thin' />
              <View style={styles.filterTextBlock}>
                <Text style={styles.filterTitle}>Сортування</Text>
                <Text style={styles.filterSubtitle}>спочатку нові</Text>
              </View>
            </View>
          </View>
        )}

        {/* ===== Products ===== */}
        <View style={styles.cardsWrapper}>
          {/* {products.map((item) => ( */}
          {items.map((item) => (
            <View key={item.id} style={{ position: 'relative' }}>
              {isChoosing && (
                <TouchableOpacity
                  style={[
                    styles.cardCheckbox,
                    // item.selected && styles.checkboxActive
                    selectedIds.includes(item.id) && styles.checkboxActive,
                  ]}
                  onPress={() => handleSelectItem(item.id)}
                >
                  {selectedIds.includes(item.id) && (
                    <Check size={14} color='#fff' />
                  )}
                </TouchableOpacity>
              )}

              <ItemCard
                itemName={item.title}
                addedTowishlist={true}
                rating={item.rating}
                imageSrc={item.image}
                discountedPrice={item.price}
                mrpPrice={item.oldPrice}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 24,
  },

  container: {
    flex: 1,
  },

  header: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  counterText: {
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    color: Colors.blackMain,
  },
  selectRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Colors.blackMain,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: Colors.softPurple,
    borderColor: Colors.softPurple,
  },

  selectAllText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    color: Colors.grey500,
  },

  chooseBtn: {
    marginLeft: 'auto',
  },

  chooseText: {
    fontSize: 14,
    fontFamily: 'RobotoBold',
    color: Colors.softPurple,
  },

  searchWrapper: {
    marginTop: 16,
  },

  filtersRow: {
    marginTop: 16,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  filterTextBlock: {
    marginLeft: 20,
  },

  filterTitle: {
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    color: Colors.blackMain,
  },

  filterSubtitle: {
    fontSize: 14,
    fontFamily: 'RobotoRegular',
    color: Colors.grey500,
  },

  cardsWrapper: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  actionsIcons: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardCheckbox: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FavoritesGoodsMain;
