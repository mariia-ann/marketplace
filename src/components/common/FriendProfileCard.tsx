import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BookmarkSimple, ShareNetwork } from 'phosphor-react-native';
import Colors from '@/constants/Colors';

export interface FriendProfileCardProps {
  friendName: string;
  friendProfileImage: string;
  totalProducts: number;
  productsReserved: number;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
  saveButtonText?: string;
  savedButtonText?: string;
  customStyles?: StyleProp<ViewStyle>;
}

export const FriendProfileCard: React.FC<FriendProfileCardProps> = ({
  friendName,
  friendProfileImage,
  totalProducts,
  productsReserved,
  isSaved = false,
  onToggleSave,
  onShare,
  saveButtonText = 'Зберегти',
  savedButtonText = 'Збережено',
  customStyles,
}) => {
  return (
    <View style={[styles.friendCard, customStyles]}>
      <View style={styles.friendCardTop}>
        <View style={styles.friendInfoWrapper}>
          <Image source={{ uri: friendProfileImage }} style={styles.avatar} />
          <View style={styles.friendTextWrapper}>
            <Text style={styles.friendFromText}>
              Від: <Text style={styles.friendNameText}>{friendName}</Text>
            </Text>
            <Text style={styles.friendCountText}>
              Товарів {totalProducts}, зарезервовано {productsReserved}
            </Text>
          </View>
        </View>

        {onShare && (
          <TouchableOpacity
            onPress={onShare}
            style={styles.shareButton}
            activeOpacity={0.7}
          >
            <ShareNetwork size={26} color={Colors.blackMain} weight='thin' />
          </TouchableOpacity>
        )}
      </View>

      {/* Save Wishlist Button */}
      {onToggleSave && (
        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
          onPress={onToggleSave}
          activeOpacity={0.8}
        >
          <BookmarkSimple
            size={22}
            color={isSaved ? Colors.white : Colors.softPurple}
            weight={isSaved ? 'fill' : 'regular'}
          />
          <Text
            style={[
              styles.saveButtonText,
              isSaved && styles.saveButtonTextActive,
            ]}
          >
            {isSaved ? savedButtonText : saveButtonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FriendProfileCard;

const styles = StyleSheet.create({
  friendCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0EFF9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  friendCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.purple100,
  },
  friendTextWrapper: {
    marginLeft: 14,
    flex: 1,
  },
  friendFromText: {
    fontSize: 16,
    fontFamily: 'Manrope',
    color: Colors.blackMain,
  },
  friendNameText: {
    fontFamily: 'ManropeBold',
    fontWeight: '700',
    color: Colors.blackMain,
  },
  friendCountText: {
    fontSize: 13,
    fontFamily: 'Manrope',
    color: Colors.grey500,
    marginTop: 4,
  },
  shareButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 16,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.softPurple,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonActive: {
    backgroundColor: Colors.softPurple,
    borderColor: Colors.softPurple,
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: 'ManropeSemiBold',
    fontWeight: '600',
    color: Colors.softPurple,
  },
  saveButtonTextActive: {
    color: Colors.white,
  },
});
