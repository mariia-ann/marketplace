import React from 'react'
import { TextInput, TextInputChangeEvent, View } from 'react-native'
import SvgIcons from '../SvgIcons/SvgIcons'
import { CUSTOM_ICON_REF } from '../SvgIcons/IconRef'

interface SearchBarProps {
  svgIconCommonStyles?: any;
  baseStyle?: any;
  handleSearch?: (event: TextInputChangeEvent) => void;
}

function SearchBar(props: SearchBarProps) {
  const { svgIconCommonStyles, baseStyle, handleSearch } =  props;
  return (
    <View style={baseStyle}>
      <SvgIcons name={CUSTOM_ICON_REF.SearchSquareIcon} baseStyle={{...svgIconCommonStyles, marginLeft: 6}} />
      <TextInput onChange={handleSearch} style={{ width: 200, marginLeft: 10 }} placeholder='Пошук товару...' />
      <SvgIcons name={CUSTOM_ICON_REF.CameraIcon} baseStyle={{...svgIconCommonStyles, marginRight: 6}} />
    </View>
  )
}

export default SearchBar;