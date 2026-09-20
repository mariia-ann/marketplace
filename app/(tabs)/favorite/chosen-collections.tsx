import React, { useState } from 'react';
import { Alert, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import Colors from '@/constants/Colors';
import CustomButton from '@/src/components/common/CustomButton';
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
    <ScrollView
      contentContainerStyle={{ minHeight: '75%', paddingTop: 30 }}
      style={styles.container}
    >
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
            <CustomButton
              title='Створити нову колекцію'
              onPress={() => setIsCreateModalOpen(true)}
              customStyles={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
});
