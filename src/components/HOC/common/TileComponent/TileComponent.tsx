import React from 'react';
import Colors from '@/constants/Colors';
import CustomButton from '@/src/components/common/CustomButton';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
  buttonStyles?: any;
}

function TileComponent(props: Props) {
  const { children, onPress, styles, buttonStyles } = props;

  const customStyles: any = {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderColor: 'transparent',
    padding: 20,
    marginBottom: 12,
    height: 'auto',
    shadowColor: '#00000040',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  };

  return (
    <>
      {onPress ? (
        <CustomButton
          onPress={onPress}
          customStyles={{ ...customStyles, ...buttonStyles }}
        >
          {children}
        </CustomButton>
      ) : (
        <View style={[customStyles, styles]}>{children}</View>
      )}
    </>
  );
}

export default TileComponent;
