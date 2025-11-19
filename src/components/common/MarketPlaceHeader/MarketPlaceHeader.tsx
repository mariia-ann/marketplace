import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import SvgIcons from '../SvgIcons/SvgIcons';
import { CUSTOM_ICON_REF } from '../SvgIcons/IconRef';
import SearchBar from './SearchBar';

interface MarketPlaceHeaderProps {
  showSearchBar?: boolean;
  baseStyle?: any;
}

function MarketPlaceHeader(props: MarketPlaceHeaderProps) {
  const { showSearchBar, baseStyle } = props;

  const styles = StyleSheet.create({
    headerTitleBoookmarkContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    titleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    bookmarkIcon: { width: 30, height: 30 },
    titleText: {
      fontFamily: "Namu",
    }
  });

  const handleSearch = (event: any) => {
    console.log("Search Input: ", event);
  }

  return (
    <View style={baseStyle}>
      <View style={styles.headerTitleBoookmarkContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ ...styles.titleText, fontSize: 25 }}>MARKET</Text>
          <Text style={{ ...styles.titleText, paddingBottom: 1.6 }}>HUB</Text>
        </View>
        <SvgIcons name={CUSTOM_ICON_REF.BookmarksIcon} baseStyle={styles.bookmarkIcon} />
      </View>

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 15 }}>
        {showSearchBar && <SearchBar handleSearch={handleSearch} svgIconCommonStyles={styles.bookmarkIcon} baseStyle={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5, borderWidth: 1, borderColor: "#999999", borderRadius: 12 }} />}
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <SvgIcons name={CUSTOM_ICON_REF.ChatsCircleIcon} baseStyle={styles.bookmarkIcon} />
          <SvgIcons name={CUSTOM_ICON_REF.BellIcon} baseStyle={styles.bookmarkIcon} />
        </View>
      </View>
    </View>
  )
}

export default MarketPlaceHeader