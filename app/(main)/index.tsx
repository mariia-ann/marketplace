import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

export default function LoadingScreen() {
  const [imageContainerSize, setImageContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const IMAGE_SIZE = 100; // Size of each image in the circular layout

  // This sets the initial font size for the animated text
  const animatedFontSize = useRef(new Animated.Value(24)).current;
  // Create an array of animated values for each image
  // Each image will animate to a position in a circular layout
  const images = [
    require("@/assets/images/welcome_page/img0.png"),
    require("@/assets/images/welcome_page/img1.png"),
    require("@/assets/images/welcome_page/img2.png"),
    require("@/assets/images/welcome_page/img3.png"),
    require("@/assets/images/welcome_page/img4.png"),
    require("@/assets/images/welcome_page/img5.png"),
    require("@/assets/images/welcome_page/img6.png"),
    require("@/assets/images/welcome_page/img7.png"),
  ];

  type AnimationData = {
    source: any;
    targetX: number;
    targetY: number;
    translateX: Animated.Value;
    translateY: Animated.Value;
  };

  const imageAnimations = useRef<AnimationData[]>([]);

  useEffect(() => {
    console.log("Container size:", imageContainerSize);
    if (imageContainerSize.width === 0 || imageContainerSize.height === 0)
      return;

    const RADIUS_X = imageContainerSize.width / 2 - IMAGE_SIZE;
    const RADIUS_Y = imageContainerSize.height / 2 - IMAGE_SIZE;
    console.log("Image container size:", imageContainerSize);
    console.log("Generated imageAnimations:", imageAnimations.current);
    imageAnimations.current = images.map((img, index) => {
      const angleOffset = -Math.PI / 2 + (20 * Math.PI) / 180;
      const angle = (2 * Math.PI * index) / images.length + angleOffset;
      const targetX = RADIUS_X * Math.cos(angle) - IMAGE_SIZE / 2;
      const targetY = RADIUS_Y * Math.sin(angle) - IMAGE_SIZE / 2;
      const startX =
        index < 4 ? imageContainerSize.width + IMAGE_SIZE : -IMAGE_SIZE;

      return {
        source: img,
        targetX,
        targetY,
        translateX: new Animated.Value(startX),
        translateY: new Animated.Value(targetY),
      };
    });

    imageAnimations.current.forEach((anim, index) => {
      Animated.timing(anim.translateX, {
        toValue: anim.targetX,
        duration: 1000,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, [imageContainerSize]);

  return (
    <View style={styles.container}>
      <View
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          console.log("Layout dimensions:", width, height);
          setImageContainerSize({ width, height });
        }}
      >
        {/* This is the red dot at the center of the screen */}
        {/* It serves as a visual anchor point for the animations */}
        {/* TODO: Delete this red dot once the animations are working as expected /Demidas/ */}
        {imageContainerSize.width > 0 && imageContainerSize.height > 0 ? (
          <>
            {/* Red dot (debug center) */}
            <View
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                backgroundColor: "red",
                left: imageContainerSize.width / 2 - 5,
                top: imageContainerSize.height / 2 - 5,
                borderRadius: 5,
                zIndex: 9999,
              }}
            />
            {/* Animated images */}
            {imageAnimations.current.map((anim, i) => (
              <Animated.Image
                key={i}
                source={anim.source}
                style={{
                  position: "absolute",
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: anim.translateY },
                  ],
                }}
              />
            ))}
            <Animated.Text
              style={[styles.text, { fontSize: animatedFontSize }]}
            >
              Market
            </Animated.Text>
            <Animated.Text
              style={[styles.text, { fontSize: animatedFontSize }]}
            >
              Hub
            </Animated.Text>
          </>
        ) : (
          // Fallback content until layout is ready
          <ActivityIndicator
            size='large'
            color={Colors.blackMain}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 120,
    height: 400,
    width: "100%",
    // Temporary border to debug sizing
    borderColor: "blue",
    borderWidth: 1,
  },
  text: {
    fontFamily: "Namu",
    textTransform: "uppercase",
    color: Colors.blackMain,
  },
});
