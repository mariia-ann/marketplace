import React from 'react';
import { StyleSheet, Text, View, Pressable, ViewStyle } from 'react-native';
import { Heart as HeartIcon } from 'phosphor-react-native';
import Colors from '@/constants/Colors';

type PopUpFavoritesProps = {
  /** Показувати / ховати попап */
  visible: boolean;
  /** Основний текст, наприклад: "Товар додано в обрані" */
  titlePopUp: string;
  /** Текст на кнопці */
  titleButton: string;
  /** Обробник натискання на кнопку */
  onPressButton: () => void;
  /** Додаткові стилі контейнера (наприклад, для зміни відступу від таббару) */
  containerStyle?: ViewStyle;
};

const PopUpFavorites: React.FC<PopUpFavoritesProps> = ({
  visible,
  titlePopUp,
  titleButton,
  onPressButton,
  containerStyle,
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.content}>
        <View style={styles.leftBlock}>
          <HeartIcon size={32} color='#ffffff' weight='thin' />
          <Text style={styles.title} numberOfLines={2}>
            {titlePopUp}
          </Text>
        </View>

        <Pressable style={styles.button} onPress={onPressButton}>
          <Text style={styles.buttonText}>{titleButton}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 24,
  },
  content: {
    height: 67,
    borderRadius: 10,
    backgroundColor: '#48238F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  title: {
    marginLeft: 8,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'RobotoBold',
  },
  button: {
    width: 107,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#48238F',
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'RobotoBold',
  },
});

export default PopUpFavorites;
