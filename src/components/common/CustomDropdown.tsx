import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';

export interface DropdownOption {
  label: string;
  value: string;
  color?: string; // Optional color property for color-coded options
  size?: number; // Optional size property for displaying size information
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selectedValue?: string | number | null;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  labelStyle?: TextStyle;
  optionStyle?: ViewStyle;
  optionLabelStyle?: TextStyle;
  ifColorCode?: boolean;
  dropdownArrowIconStyle?: ViewStyle;
  maxHeight?: number;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  dropdownButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  iconStyle: {
    marginLeft: 10,
    color: Colors.blackMain,
    width: 18,
    height: 18,
  },
  dropdown: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    maxHeight: '40%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 8,
    marginTop: 5,
    zIndex: 2000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
  },
  optionItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: Colors.blackMain,
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  checkmarkIcon: {
    marginLeft: 10,
    width: 18,
    height: 18,
    color: Colors.green,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select an option',
  containerStyle,
  dropdownStyle,
  labelStyle,
  optionStyle,
  optionLabelStyle,
  ifColorCode,
  dropdownArrowIconStyle,
  maxHeight = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    options.find((opt) => opt.value === selectedValue) || options[0];
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownButtonTextStyle = {
    color: selectedOption ? Colors.blackMain : Colors.grey500,
  };

  const iconRotation = {
    transform: [{ rotate: isOpen ? '-90deg' : '90deg' }],
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.dropdownButton, dropdownStyle]}
        onPress={() => setIsOpen(!isOpen)}
      >
        {ifColorCode && (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: selectedOption?.color,
              borderRadius: '100%',
            }}
          />
        )}
        <Text
          style={[
            styles.dropdownButtonText,
            dropdownButtonTextStyle,
            labelStyle,
          ]}
        >
          {displayText}
          {selectedOption?.size ? ` /${selectedOption.size}` : ''}
        </Text>
        <SvgIcons
          name={CUSTOM_ICON_REF.Arrowright}
          baseStyle={{
            ...styles.iconStyle,
            ...iconRotation,
            ...dropdownArrowIconStyle,
          }}
        />
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modal}
            onPress={() => setIsOpen(false)}
            activeOpacity={1}
          >
            <View style={styles.dropdown}>
              <ScrollView nestedScrollEnabled>
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={`${option.value}-${index}`}
                    style={[
                      styles.optionItem,
                      {
                        borderBottomWidth: index === options.length - 1 ? 0 : 1,
                      },
                      optionStyle,
                    ]}
                    onPress={() => handleSelect(option)}
                  >
                    {ifColorCode && (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: option.color,
                          borderRadius: '100%',
                          marginRight: 30,
                        }}
                      />
                    )}
                    <Text
                      style={[
                        styles.optionText,
                        selectedValue === option.value &&
                          styles.selectedOptionText,
                        optionLabelStyle,
                      ]}
                    >
                      {option.label} {option.size && `(/${option.size})`}
                    </Text>
                    {selectedValue === option.value && (
                      <SvgIcons
                        name={CUSTOM_ICON_REF.CheckCirleIcon}
                        baseStyle={styles.checkmarkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default CustomDropdown;
