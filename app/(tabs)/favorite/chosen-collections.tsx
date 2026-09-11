import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Colors from '@/constants/Colors';
import { NavigationHeader } from '@/src/components/common/NavigationHeader';
import {
  CollectionsSegmentedSwitch,
  CollectionsTabType,
} from '@/src/features/collections/components/CollectionsSegmentedSwitch';
import { CollectionsGrid } from '@/src/features/collections/components/CollectionsGrid';
import { CreateCollectionModal } from '@/src/features/collections/components/CreateCollectionModal';
import { CollectionActionModal } from '@/src/features/collections/components/CollectionActionModal';
import FavoritesGoodsMain from '@/src/components/ui/favorites_page/favoritesGoods/FavoritesGoodsMain';
import { useCollectionsStore } from '@/src/state/useCollectionsStore';
import { useFavoritesStore } from '@/src/state/useFavoritesStore';
import { Collection, CollectionIconType } from '@/src/types/Collection';

export default function ChosenCollectionsScreen() {
  const router = useRouter();
  const { collections, addCollection, removeCollection } =
    useCollectionsStore();
  const favoriteItems = useFavoritesStore((s) => s.items);

  const [activeTab, setActiveTab] = useState<CollectionsTabType>('collections');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedActionCollection, setSelectedActionCollection] =
    useState<Collection | null>(null);

  // Fallback to 13 as shown in design mockup if favorites list is empty
  const goodsCount = favoriteItems.length > 0 ? favoriteItems.length : 13;

  const handleCollectionPress = (collection: Collection) => {
    if (collection.routePath) {
      router.push(collection.routePath as any);
    } else {
      router.push('/favorite/collections/for-home');
    }
  };

  const handleCollectionDotsPress = (collection: Collection) => {
    setSelectedActionCollection(collection);
  };

  const handleCreateCollection = (title: string, icon: CollectionIconType) => {
    addCollection(title, icon);
    Toast.show({
      type: 'success',
      text1: 'Колекцію створено',
      text2: `Колекцію "${title}" успішно додано`,
      position: 'bottom',
      bottomOffset: 80,
    });
  };

  const handleOpenCollection = (collection: Collection) => {
    handleCollectionPress(collection);
  };

  const handleShareCollection = async (collection: Collection) => {
    try {
      await Share.share({
        message: `Перегляньте мою колекцію "${collection.title}" у додатку Marketplace!`,
      });
    } catch {
      // Ignored
    }
  };

  const handleDeleteCollection = (collection: Collection) => {
    Alert.alert(
      'Видалити колекцію',
      `Ви впевнені, що хочете видалити колекцію "${collection.title}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            removeCollection(collection.id);
            Toast.show({
              type: 'info',
              text1: 'Колекцію видалено',
              position: 'bottom',
              bottomOffset: 80,
            });
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      {/* Header with back button and "Обрані" title */}
      <NavigationHeader
        title='Обрані'
        showBack={true}
        onBack={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push('/(tabs)');
          }
        }}
        customStyles={styles.header}
      />

      {/* Segmented Control: "Товари (13)" / "Колекції" */}
      <View style={styles.segmentedContainer}>
        <CollectionsSegmentedSwitch
          activeTab={activeTab}
          onTabChange={setActiveTab}
          productsCount={goodsCount}
          collectionsCount={collections.length}
        />
      </View>

      {/* Main Content Area */}
      {activeTab === 'collections' ? (
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <CollectionsGrid
              collections={collections}
              onCollectionPress={handleCollectionPress}
              onCollectionDotsPress={handleCollectionDotsPress}
            />
          </ScrollView>

          {/* Bottom Action Button: "Створити нову колекцію" */}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.createButton}
              activeOpacity={0.85}
              onPress={() => setIsCreateModalOpen(true)}
            >
              <Text style={styles.createButtonText}>
                Створити нову колекцію
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <FavoritesGoodsMain />
        </View>
      )}

      {/* Modals */}
      <CreateCollectionModal
        visible={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateCollection}
      />

      <CollectionActionModal
        visible={!!selectedActionCollection}
        collection={selectedActionCollection}
        onClose={() => setSelectedActionCollection(null)}
        onOpen={handleOpenCollection}
        onShare={handleShareCollection}
        onDelete={handleDeleteCollection}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  segmentedContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F8',
  },
  createButton: {
    height: 52,
    backgroundColor: Colors.softPurple,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.softPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'ManropeBold',
  },
});
