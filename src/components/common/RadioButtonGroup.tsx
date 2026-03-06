import Colors from '@/constants/Colors';
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export type RadioOption<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  value: T | null | undefined;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  errorText?: string;
};

export function RadioButtonGroup<T extends string>({
  value,
  options,
  onChange,
  errorText,
}: Props<T>) {
  return (
    <View style={styles.wrap}>
      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={styles.row}
          >
            <View style={[styles.outer, selected && styles.outerSelected]} />
            <Text style={styles.label}>{opt.label}</Text>
          </Pressable>
        );
      })}

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 9 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.grey400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerSelected: {
    borderColor: Colors.softPurple,
    backgroundColor: Colors.softPurple,
  },
  label: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.blackMain,
    minWidth: 0,
    flex: 1,
    flexShrink: 1,
  },
  error: { marginTop: 4, fontSize: 12 },
});
