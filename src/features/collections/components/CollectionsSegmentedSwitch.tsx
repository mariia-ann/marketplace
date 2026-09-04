import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Colors from '@/constants/Colors';

export type CollectionsTabType = 'products' | 'collections';

type CollectionsSegmentedSwitchProps = {
  activeTab: CollectionsTabType;
  onTabChange: (tab: CollectionsTabType) => void;
  productsCount?: number;
  collectionsCount?: number;
  style?: StyleProp<ViewStyle>;
};

export const CollectionsSegmentedSwitch: React.FC<
  CollectionsSegmentedSwitchProps
> = ({
  activeTab,
  onTabChange,
  productsCount = 13,
  collectionsCount,
  style,
}) => {
  const isProducts = activeTab === 'products';
  const isCollections = activeTab === 'collections';

  const productsLabel = `Товари (${productsCount})`;
  const collectionsLabel =
    collectionsCount !== undefined && collectionsCount > 0
      ? `Колекції (${collectionsCount})`
      : 'Колекції';

  return (
    <View style={[styles.container, style]}>
      {/* Left Pill: Products */}
      <Pressable
        style={[
          styles.tabButton,
          styles.leftTab,
          isProducts ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => onTabChange('products')}
      >
        <Text
          style={[
            styles.tabText,
            isProducts ? styles.activeText : styles.inactiveText,
          ]}
        >
          {productsLabel}
        </Text>
      </Pressable>

      {/* Right Pill: Collections */}
      <Pressable
        style={[
          styles.tabButton,
          styles.rightTab,
          isCollections ? styles.activeTab : styles.inactiveTab,
        ]}
        onPress={() => onTabChange('collections')}
      >
        <Text
          style={[
            styles.tabText,
            isCollections ? styles.activeText : styles.inactiveText,
          ]}
        >
          {collectionsLabel}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AC94E8',
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  leftTab: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightTab: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.softPurple,
  },
  inactiveTab: {
    backgroundColor: Colors.white,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'ManropeBold',
  },
  activeText: {
    color: Colors.white,
  },
  inactiveText: {
    color: Colors.blackMain,
  },
});
