import React, { ReactNode } from 'react';
import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: ReactNode;
}

export default function KeyboardAwareLayout({ children }: Props) {
  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
});
