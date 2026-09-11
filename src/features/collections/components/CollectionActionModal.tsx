import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowSquareOut, ShareNetwork, Trash, X } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import { Collection } from '@/src/types/Collection';

type CollectionActionModalProps = {
  visible: boolean;
  collection: Collection | null;
  onClose: () => void;
  onOpen: (collection: Collection) => void;
  onShare: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
};

export const CollectionActionModal: React.FC<CollectionActionModalProps> = ({
  visible,
  collection,
  onClose,
  onOpen,
  onShare,
  onDelete,
}) => {
  if (!collection) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.sheetContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.collectionTitle} numberOfLines={1}>
              {collection.title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={Colors.blackMain} />
            </TouchableOpacity>
          </View>

          {/* Action 1: Open */}
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              onClose();
              onOpen(collection);
            }}
          >
            <ArrowSquareOut size={22} color={Colors.blackMain} />
            <Text style={styles.actionText}>Переглянути колекцію</Text>
          </TouchableOpacity>

          {/* Action 2: Share */}
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => {
              onClose();
              onShare(collection);
            }}
          >
            <ShareNetwork size={22} color={Colors.blackMain} />
            <Text style={styles.actionText}>Поділитися колекцією</Text>
          </TouchableOpacity>

          {/* Action 3: Delete */}
          <TouchableOpacity
            style={[styles.actionItem, styles.deleteItem]}
            onPress={() => {
              onClose();
              onDelete(collection);
            }}
          >
            <Trash size={22} color={Colors.red} />
            <Text style={[styles.actionText, styles.deleteText]}>
              Видалити колекцію
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(23, 15, 43, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFF5',
    marginBottom: 8,
  },
  collectionTitle: {
    fontSize: 17,
    fontFamily: 'ManropeBold',
    color: Colors.blackMain,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  actionText: {
    fontSize: 15,
    fontFamily: 'ManropeSemiBold',
    color: Colors.blackMain,
  },
  deleteItem: {
    borderTopWidth: 1,
    borderTopColor: '#F5F4F8',
    marginTop: 4,
  },
  deleteText: {
    color: Colors.red,
  },
});
