import Colors from '@/constants/Colors';
import { tableData } from '@/constants/product-review';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: Colors.softPurple,
    fontWeight: 'bold',
  },
  tableWrapper: {
    paddingTop: 20,
    borderRadius: 10,
  },
  tableHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    width: '30%',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  tableCell: {
    width: '30%',
  },
});

function TableOfSizes() {
  const iconFootSize = 30;

  const renderTableSize = (item: any, index: number) => {
    const isSelected = item.manuFacturerSize === 38; // Приклад вибору розміру 38
    return (
      <View
        key={index}
        style={[
          styles.tableRow,
          {
            backgroundColor: isSelected
              ? Colors.softPurple
              : index % 2 === 0
                ? Colors.white
                : Colors.purple50,
          },
        ]}
      >
        <Text
          style={[
            styles.tableCell,
            { color: isSelected ? Colors.white : Colors.blackMain },
          ]}
        >
          {item.manuFacturerSize}
        </Text>
        <Text
          style={[
            styles.tableCell,
            { color: isSelected ? Colors.white : Colors.blackMain },
          ]}
        >
          {item.inSoleLength}
        </Text>
        <Text
          style={[
            styles.tableCell,
            { color: isSelected ? Colors.white : Colors.blackMain },
          ]}
        >
          {item.footLength}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Як правильно зняти мірки?</Text>
        <SvgIcons
          name={CUSTOM_ICON_REF.Footprints}
          baseStyle={{ width: iconFootSize, height: iconFootSize }}
        />
      </View>
      <View style={styles.tableWrapper}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderText}>Розмір виробника</Text>
          <Text style={styles.tableHeaderText}>Довжина устілки (см)</Text>
          <Text style={styles.tableHeaderText}>Довжина стопи (см)</Text>
        </View>
        {tableData.map(renderTableSize)}
      </View>
    </ScrollView>
  );
}

export default TableOfSizes;
