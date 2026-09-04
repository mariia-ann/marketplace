import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import {
  FolderSimple,
  Gift,
  Heart,
  Handbag,
  Sparkle,
  Star,
  DotsThreeVertical,
} from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import { Collection, CollectionIconType } from '@/src/types/Collection';

type CollectionCardProps = {
  collection: Collection;
  onPress: (collection: Collection) => void;
  onDotsPress: (collection: Collection) => void;
};

function formatItemCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return `${count} товарів`;
  }
  if (mod10 === 1) {
    return `${count} товар`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} товари`;
  }
  return `${count} товарів`;
}

function renderCollectionIcon(icon: CollectionIconType, size = 22) {
  const color = Colors.softPurple;
  switch (icon) {
    case 'gift':
      return <Gift size={size} color={color} weight='bold' />;
    case 'heart':
      return <Heart size={size} color={color} weight='bold' />;
    case 'bag':
      return <Handbag size={size} color={color} weight='bold' />;
    case 'sparkle':
      return <Sparkle size={size} color={color} weight='bold' />;
    case 'star':
      return <Star size={size} color={color} weight='bold' />;
    case 'folder':
    default:
      return <FolderSimple size={size} color={color} weight='bold' />;
  }
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onPress,
  onDotsPress,
}) => {
  const { title, itemCount, icon, previewImages } = collection;
  const hasOverflow = itemCount > 5;
  const overflowCount = itemCount - 5;

  // We render a 3x2 grid (6 items)
  const slots = [0, 1, 2, 3, 4, 5];

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(collection)}
    >
      {/* 2x3 Preview Thumbnails */}
      <View style={styles.gridContainer}>
        {slots.map((index) => {
          // Slot 5 (6th position)
          if (index === 5) {
            if (hasOverflow) {
              return (
                <View key={index} style={styles.overflowCell}>
                  <Text style={styles.overflowText}>+ {overflowCount}</Text>
                </View>
              );
            }
            if (previewImages[5]) {
              return (
                <View key={index} style={styles.imageCell}>
                  <Image
                    source={{ uri: previewImages[5] }}
                    style={styles.image}
                    contentFit='cover'
                    transition={200}
                  />
                </View>
              );
            }
            return <View key={index} style={styles.emptyCell} />;
          }

          // Slots 0 to 4
          const imgUrl = previewImages[index];
          if (imgUrl) {
            return (
              <View key={index} style={styles.imageCell}>
                <Image
                  source={{ uri: imgUrl }}
                  style={styles.image}
                  contentFit='cover'
                  transition={200}
                />
              </View>
            );
          }

          return <View key={index} style={styles.emptyCell} />;
        })}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.titleContainer}>
          <View style={styles.iconWrapper}>{renderCollectionIcon(icon)}</View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.dotsButton}
          onPress={() => onDotsPress(collection)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel='Меню колекції'
        >
          <DotsThreeVertical size={20} color={Colors.blackMain} weight='bold' />
        </TouchableOpacity>
      </View>

      {/* Subtitle with Count */}
      <Text style={styles.countText}>{formatItemCount(itemCount)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECE9F6',
    shadowColor: '#170F2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 6,
  },
  imageCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F4F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overflowCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.softPurple,
    backgroundColor: Colors.purple50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    color: Colors.softPurple,
    fontSize: 14,
    fontFamily: 'ManropeBold',
  },
  emptyCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#F8F8FA',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EFF5',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
  iconWrapper: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'ManropeBold',
    color: Colors.blackMain,
    flex: 1,
  },
  dotsButton: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 13,
    fontFamily: 'Manrope',
    color: Colors.grey400,
    marginTop: 4,
    marginLeft: 28,
  },
});
