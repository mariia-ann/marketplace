import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Collection } from '@/src/types/Collection';
import { CollectionCard } from './CollectionCard';

type CollectionsGridProps = {
  collections: Collection[];
  onCollectionPress: (collection: Collection) => void;
  onCollectionDotsPress: (collection: Collection) => void;
};

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  collections,
  onCollectionPress,
  onCollectionDotsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {collections.map((collection) => (
          <View key={collection.id} style={styles.gridItem}>
            <CollectionCard
              collection={collection}
              onPress={onCollectionPress}
              onDotsPress={onCollectionDotsPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
});
