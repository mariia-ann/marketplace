import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, useWindowDimensions, StyleSheet } from 'react-native';

interface BannerCarouselProps {
  banners?: any[];
  baseStyle?: any;
  containerHorizontalPadding?: number;
}

const banners = [
  require('@/assets/images/home_page/bannerCarousel/banner3.png'),
  require('@/assets/images/home_page/bannerCarousel/baner2.png'),
  require('@/assets/images/home_page/bannerCarousel/baner1.png'),
];

const BANNER_HORIZONTAL_MARGIN = 0;

export default function BannerCarousel(props: BannerCarouselProps) {
  const { baseStyle, containerHorizontalPadding = 0 } = props;
  const { width: windowWidth } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewportWidth = windowWidth - containerHorizontalPadding * 2;
  const bannerWidth = viewportWidth - BANNER_HORIZONTAL_MARGIN * 2;
  const itemWidth = bannerWidth + BANNER_HORIZONTAL_MARGIN * 2;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / itemWidth);
    setCurrentIndex(newIndex);
};


  return (
    <View style={baseStyle}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        extraData={currentIndex}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { width: itemWidth, paddingHorizontal: BANNER_HORIZONTAL_MARGIN }]}>
            <View style={[styles.bannerWrapper, { width: bannerWidth }]}>
              <Image source={item} style={styles.image} />
              <View style={styles.dotsContainer}>
                <View style={{ backgroundColor :"#F5F4FEB2", width: 75, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 10, paddingVertical: 2 }}>
                  {banners.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 230,
  },
  bannerWrapper: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    position: "absolute",
    bottom: -25,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: "#AC94E8",
    borderWidth: 2,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 25,
    backgroundColor: '#8E6CEF',
    borderColor: "#8E6CEF",
    borderWidth: 2,
    borderRadius: 4,
  },
});
