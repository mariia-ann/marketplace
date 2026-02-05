import Colors from '@/constants/Colors';
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export interface FilterChipProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip = (props: FilterChipProps) => {
  return (
    <Pressable
      key={props.title}
      style={[styles.chipContainer, props.isSelected && styles.chipSelected]}
      onPress={props.onPress}
    >
      <Text
        style={[styles.chipText, props.isSelected && styles.chipTextSelected]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
};

export default FilterChip;

const styles = StyleSheet.create({
  chipContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.softPurple,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  chipSelected: {
    backgroundColor: Colors.activePurple,
    borderColor: Colors.activePurple,
  },
  chipText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.softPurple,
  },
  chipTextSelected: {
    color: Colors.white,
  },
});
