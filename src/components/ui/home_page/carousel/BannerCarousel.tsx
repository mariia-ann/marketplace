import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Image, Dimensions, StyleSheet } from "react-native";

const banners = [
  require("@/assets/images/home_page/bannerCarousel/baner1.png"),
  require("@/assets/images/home_page/bannerCarousel/baner2.png"),
  require("@/assets/images/home_page/bannerCarousel/baner1.png"),
];

const { width } = Dimensions.get("window");

const BANNER_HORIZONTAL_MARGIN = 16;
const BANNER_WIDTH = width - BANNER_HORIZONTAL_MARGIN * 2;

export default function BannerCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const newIndex = Math.round(offsetX / BANNER_WIDTH);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(_, index) => index.toString()}
        extraData={currentIndex}
        renderItem={({ item }) => (
          <View style={styles.bannerWrapper}>
            <Image source={item} style={styles.image} />
            <View style={styles.dotsContainer}>
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
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  bannerWrapper: {
    width: BANNER_WIDTH,
    height: 180,
    position: "relative",
    marginHorizontal: BANNER_HORIZONTAL_MARGIN,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 12,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
});
