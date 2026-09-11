import React, { ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { X } from 'phosphor-react-native';
import Colors from '@/constants/Colors';

export interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  customContentStyle?: StyleProp<ViewStyle>;
  customOverlayStyle?: StyleProp<ViewStyle>;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  animationType = 'fade',
  customContentStyle,
  customOverlayStyle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.modalOverlay, customOverlayStyle]}
        onPress={onClose}
      >
        <Pressable
          style={[styles.modalContent, customContentStyle]}
          onPress={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <View style={styles.modalHeader}>
              {title ? (
                <Text style={styles.modalTitle}>{title}</Text>
              ) : (
                <View />
              )}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={22} color={Colors.blackMain} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'ManropeBold',
    fontWeight: '700',
    color: Colors.blackMain,
  },
});
