import React, { useState } from 'react';
import { View } from 'react-native';
import TwoTabsSwitch from '@/src/components/ui/twoTabsSwitch';
import Colors from '@/constants/Colors';
import FavoritesEmptyPage from './FavoritesEmptyPage';
import FavoritesGoodsMain from './favoritesGoods/FavoritesGoodsMain';

const FavoritesMain = () => {
  // стан активної вкладки
  const [activeTab, setActiveTab] = useState<'option1' | 'option2'>('option1');

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.white }}>
      {/* Виклик компоненту */}
      <TwoTabsSwitch
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        option1='Товари'
        option2='Колекції (0)'
        containerStyle={{ marginBottom: 20 }}
      />

      {activeTab === 'option1' ? (
        <FavoritesGoodsMain />
      ) : (
        <FavoritesEmptyPage
          title='У вас ще немає колекцій'
          subtitle='Але це чудове місце для планування покупок! Створюйте списки бажань та вішлісти для себе чи близьких. Почніть із вибору товарів або створіть першу колекцію вже зараз..'
        />
      )}
    </View>
  );
};

export default FavoritesMain;
