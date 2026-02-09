import Colors from '@/constants/Colors';
import { CaretDown, CaretUp } from 'phosphor-react-native';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Keyboard } from 'react-native';

export type DropDownOption<T extends string = string> = {
  value: T;
  label: string;
};

export interface BasicDropDownProps<T extends string = string> {
  title: string;
  label: string;
  options: readonly DropDownOption<T>[];
  chosenOption?: DropDownOption<T> | null;
  onSelect: (value: DropDownOption<T>) => void;
}

const BasicDropDown = <T extends string = string>(
  props: BasicDropDownProps<T>,
) => {
  const [openStatus, setOpenStatus] = useState(false);
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <Pressable
        style={
          !openStatus
            ? styles.container
            : [styles.container, styles.containerOpened]
        }
        onPress={() => {
          Keyboard.dismiss();
          setOpenStatus(!openStatus);
        }}
      >
        <Text style={styles.optionText}>
          {props.chosenOption?.label && !openStatus
            ? props.chosenOption.label
            : props.title}
        </Text>
        {openStatus ? (
          <CaretDown
            size={22}
            color={Colors.blackMain}
            weight='bold'
            style={{ flexShrink: 0 }}
          />
        ) : (
          <CaretUp
            size={22}
            color={Colors.blackMain}
            weight='bold'
            style={{ flexShrink: 0 }}
          />
        )}
      </Pressable>
      {openStatus && (
        <View style={styles.dropContainer}>
          {props.options.map((option) => (
            <Pressable
              style={({ pressed }) => [
                styles.optionRow,
                pressed && styles.rowPressed,
              ]}
              key={option.value}
              onPress={() => {
                props.onSelect(option);
                setOpenStatus(false);
              }}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    styles.optionText,
                    { fontWeight: pressed ? '600' : '400' },
                  ]}
                >
                  {option.label}
                </Text>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default BasicDropDown;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.grey400,
    marginBottom: 8,
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.grey400,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  containerOpened: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderTopWidth: 0,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  rowPressed: {
    backgroundColor: Colors.purple200,
  },
  optionText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.blackMain,
    minWidth: 0,
    flex: 1,
    flexShrink: 1,
  },
});
