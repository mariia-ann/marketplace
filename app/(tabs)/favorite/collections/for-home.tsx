import Colors from '@/constants/Colors';
import CustomButton from '@/src/components/common/CustomButton';
import CheckBox from '@/src/components/common/customInput/Checkbox';
import CustomSwitch from '@/src/components/common/CustomSwitch';
import OptionToggle from '@/src/components/common/OptionToggle/OptionToggle';
import { CUSTOM_ICON_REF } from '@/src/components/common/SvgIcons/IconRef';
import SvgIcons from '@/src/components/common/SvgIcons/SvgIcons';
import SearchBar from '@/src/components/ui/home_page/header/SearchBar';
import ItemCard from '@/src/components/ui/home_page/ItemCard';
import { Product } from '@/src/types/Product';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ForHomeScreen() {

  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const [isSelectToggle, setIsSelectToggle] = useState<boolean>(false);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: 'Стілець "Комфорт"',
      price: 1200,
      oldPrice: 1500,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600',
      isFavorite: true,
      isSelectedForWishlist: false,
    },
    {
      id: 2,
      title: 'Лампа "Світло"',
      price: 800,
      oldPrice: null,
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
      isFavorite: true,
      isSelectedForWishlist: false,
    },
    {
      id: 3,
      title: 'Килим "Тепло"',
      price: 2000,
      oldPrice: 2500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&fit=crop',
      isFavorite: true,
      isSelectedForWishlist: false,
    },
    {
      id: 4,
      title: 'Картина "Природа"',
      price: 1500,
      oldPrice: null,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
      isFavorite: true,
      isSelectedForWishlist: false,
    },
    {
      id: 5,
      title: 'Диван "Затишок"',
      price: 5000,
      oldPrice: 6000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
      isFavorite: true,
      isSelectedForWishlist: false,
    },
    {
      id: 6,
      title: 'Стол "Практичність"',
      price: 3000,
      oldPrice: null,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600',
      isFavorite: true,
      isSelectedForWishlist: false,
    }
  ]);

  const handleAddWishlist = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, isSelectedForWishlist: !p.isSelectedForWishlist } : p
      )
    );
  }
  const handleToggleWishlist = () => {
    setIsWishlist((prev) => !prev);
  }
  const handleSelect = () => {
    setIsSelectToggle((prev) => !prev);
  }
  const handleSelectAll = () => {
    setIsAllSelected((prev) => !prev);
    setProducts((prevProducts) =>
      prevProducts.map((p) => ({ ...p, isSelectedForWishlist: !isAllSelected }))
    );
  }
  const handleDeleteSelected = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => !p.isSelectedForWishlist)
    );
    setIsAllSelected(false);
  }
  
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const selectedItemLength: number = filteredProducts.filter((product) => product.isSelectedForWishlist).length;
  const totalProducts: number = filteredProducts.length;
  const selectText: string = isSelectToggle ? 'Скасувати' : 'Вибрати';

  const iconbSize = 24;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerContentStyle}>
      <View style={styles.heading}>
        <Text>Зберегти колекцію як Wishlist</Text>
        <CustomSwitch value={isWishlist} onToggle={handleToggleWishlist} />
      </View>
      <View style={styles.heading}>
        <Text>{isSelectToggle ? `Обрано ${selectedItemLength}/${totalProducts} товарів` : `Усього ${totalProducts} товарів`}</Text>
        <SvgIcons name={CUSTOM_ICON_REF.ShareNetwork} baseStyle={{ width: 24, height: 24 }} />
      </View>
      <View style={styles.heading}>
        <CheckBox title="Усі" isChecked={isAllSelected} onPress={handleSelectAll} />
        {isSelectToggle && <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          <CustomButton onPress={() => { }} customStyles={{ backgroundColor: 'transparent', borderColor: 'transparent', height: 'fit-content' }}>
            <SvgIcons name={CUSTOM_ICON_REF.AddtoCollection} baseStyle={{ width: 24, height: 24, color: Colors.blackMain }} />
          </CustomButton>
          <CustomButton onPress={handleDeleteSelected} customStyles={{ backgroundColor: 'transparent', borderColor: 'transparent', height: 'fit-content' }}>
            <SvgIcons name={CUSTOM_ICON_REF.Trash} baseStyle={{ width: 24, height: 24 }} />
          </CustomButton>
        </View>}
        <CustomButton customStyles={{ backgroundColor: 'transparent', borderColor: 'transparent', height: 'fit-content' }} onPress={handleSelect}>
          <Text style={styles.text}>{selectText}</Text>
        </CustomButton>
      </View>
      <View style={styles.heading}>
        <SearchBar 
          baseStyleInput={{ width: 300 }} 
          baseContainerStyle={{ margin: 0 }} 
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <CustomButton
          onPress={() => { }}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '48%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.Funnel}
            baseStyle={{
              width: iconbSize,
              height: iconbSize,
              color: '#000000',
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>Фільтр</Text>
            <Text style={{ color: '#666666' }}>не обраний</Text>
          </View>
        </CustomButton>
        <CustomButton
          onPress={() => { }}
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '48%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
        >
          <SvgIcons
            name={CUSTOM_ICON_REF.SlidersHorizontal}
            baseStyle={{
              width: iconbSize,
              height: iconbSize,
              color: '#000000',
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>Сортування</Text>
            <Text style={{ color: '#666666' }}>за рейтингом</Text>
          </View>
        </CustomButton>
      </View>
      <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {filteredProducts.map((product) => (
          <ItemCard
            key={product.id}
            imageSrc={{ uri: product.image }}
            itemName={product.title}
            discountedPrice={product.price}
            mrpPrice={product.oldPrice}
            rating={product.rating}
            isToggleSelectProduct={isSelectToggle}
            isSelectedProduct={product.isSelectedForWishlist}
            handleSetWishlist={() => handleAddWishlist(product)}
            addedTowishlist={product.isFavorite}
          />
        ))}
      </View>
      <CustomButton onPress={() => { }} customStyles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>До покупок</Text>
      </CustomButton>
      <CustomButton onPress={() => { }} customStyles={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <Text style={{ color: Colors.blackMain, fontSize: 16, fontWeight: 'bold' }}>Додати товари</Text>
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  containerContentStyle: {
    paddingBottom: 40,
  },
  heading: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.activePurple,
    fontSize: 14,
    fontWeight: '600',
  },
});
