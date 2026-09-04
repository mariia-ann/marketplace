import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FolderSimple,
  Gift,
  Heart,
  Handbag,
  Sparkle,
  Star,
  X,
} from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import { CollectionIconType } from '@/src/types/Collection';

type CreateCollectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (title: string, icon: CollectionIconType) => void;
};

const AVAILABLE_ICONS: { type: CollectionIconType; label: string }[] = [
  { type: 'folder', label: 'Папка' },
  { type: 'gift', label: 'Подарунок' },
  { type: 'heart', label: 'Серце' },
  { type: 'bag', label: 'Сумка' },
  { type: 'sparkle', label: 'Особливе' },
  { type: 'star', label: 'Зірка' },
];

function renderModalIcon(icon: CollectionIconType, isSelected: boolean) {
  const color = isSelected ? Colors.white : Colors.softPurple;
  const size = 24;
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

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] =
    useState<CollectionIconType>('folder');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Будь ласка, введіть назву колекції');
      return;
    }
    setError(null);
    onCreate(trimmed, selectedIcon);
    setTitle('');
    setSelectedIcon('folder');
    onClose();
  };

  const handleCancel = () => {
    setError(null);
    setTitle('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={handleCancel}
    >
      <Pressable style={styles.overlay} onPress={handleCancel}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Створити нову колекцію</Text>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <X size={20} color={Colors.blackMain} />
            </TouchableOpacity>
          </View>

          {/* Input field */}
          <Text style={styles.inputLabel}>Назва колекції</Text>
          <TextInput
            style={[styles.input, !!error && styles.inputError]}
            placeholder='Наприклад: Осінній стиль, Подарунки...'
            placeholderTextColor={Colors.grey400}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError(null);
            }}
            autoFocus
            maxLength={40}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Icon Selector */}
          <Text style={styles.inputLabel}>Оберіть іконку</Text>
          <View style={styles.iconsGrid}>
            {AVAILABLE_ICONS.map((item) => {
              const isSelected = selectedIcon === item.type;
              return (
                <TouchableOpacity
                  key={item.type}
                  style={[styles.iconBox, isSelected && styles.iconBoxSelected]}
                  onPress={() => setSelectedIcon(item.type)}
                >
                  {renderModalIcon(item.type, isSelected)}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Скасувати</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleSubmit}
            >
              <Text style={styles.createButtonText}>Створити</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(23, 15, 43, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'ManropeBold',
    color: Colors.blackMain,
  },
  closeButton: {
    padding: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'ManropeSemiBold',
    color: Colors.blackMain,
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ECE9F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: 'Manrope',
    color: Colors.blackMain,
    backgroundColor: '#FAFAFC',
    marginBottom: 6,
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: 'Manrope',
    marginBottom: 8,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 24,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.purple50,
    borderWidth: 1,
    borderColor: '#E4DEF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxSelected: {
    backgroundColor: Colors.softPurple,
    borderColor: Colors.softPurple,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECE9F6',
    backgroundColor: '#FAFAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: 'ManropeSemiBold',
    color: Colors.grey500,
  },
  createButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.softPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 15,
    fontFamily: 'ManropeBold',
    color: Colors.white,
  },
});
