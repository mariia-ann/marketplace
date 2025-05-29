import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/home_page/header_image/search.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Search for item"
        placeholderTextColor="#aaa"
        autoCorrect={false}
      />
      <Image source={require('@/assets/images/home_page/header_image/camera.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
  },

  input: {
    width: 180,
    fontFamily: 'SFProText-Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: -0.13,
    color: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});