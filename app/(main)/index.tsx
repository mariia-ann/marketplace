import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../../app-example/components/CustomButton";

export default function LoadingScreen() {
  type AnimationData = {
    source: any;
    targetX: number;
    targetY: number;
    translateX: Animated.Value;
  };

  const [imageContainerSize, setImageContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

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

  const imageAnimations = useRef<AnimationData[]>([]);

  // To calculate the positions of the images in a ellipsis layout
  useEffect(() => {
    if (imageContainerSize.width === 0 || imageContainerSize.height === 0)
      return;
    // Calculate the center of the image container and the radius for the ellipsis layout
    const centerX = imageContainerSize.width / 2;
    const centerY = imageContainerSize.height / 2;
    const radiusX = centerX - IMAGE_SIZE / 2;
    const radiusY = centerY - IMAGE_SIZE / 2;

    const animations: AnimationData[] = images.map((img, index) => {
      // Calculate the target position for each image based on its index
      // The angleOffset is used to adjust the starting angle of the first image to be on the top
      const angleOffset = -Math.PI / 2 + (20 * Math.PI) / 180;
      const angle = (2 * Math.PI * index) / images.length + angleOffset;
      // (by Demidas)Really i could not understand why i need to minus the radiusX from the targetX but it works
      const targetX =
        centerX - radiusX + radiusX * Math.cos(angle) - IMAGE_SIZE / 2;
      const targetY = centerY + radiusY * Math.sin(angle) - IMAGE_SIZE / 2;

      const startX =
        index < images.length / 2 ? targetX + centerX : targetX - centerX;

      const translateX = new Animated.Value(startX);

      // Animate each image's translateX to its final position
      Animated.timing(translateX, {
        toValue: targetX,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      return {
        source: img,
        targetX,
        targetY,
        translateX,
      };
    });

    imageAnimations.current = animations;
  }, [imageContainerSize]);

  // Animate the font size of the text
  useEffect(() => {
    Animated.timing(animatedFontSize, {
      toValue: 72,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

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
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                left: 100,
                top: 1,
                backgroundColor: "purple",
                borderRadius: 10,
                zIndex: 9999,
              }}
            />
            {/* Red dot (debug center) */}
            <View
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                setParentSize({ width, height });
                console.log("Parent size:", width, height);
              }}
              style={{
                position: "absolute",
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: 5,
                zIndex: 9999,
              }}
            >
              <Text>Parent Width: {parentSize.width}</Text>
              <Text>Parent Height: {parentSize.height}</Text>
            </View>
            {/* Animated images */}
            {imageAnimations.current.length === images.length &&
              imageAnimations.current.map((anim, i) => (
                <Animated.Image
                  key={i}
                  source={anim.source}
                  style={{
                    position: "absolute",
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    top: anim.targetY,
                    transform: [{ translateX: anim.translateX }],
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
      <CustomButton
        title={"Enter"}
        onPress={() => router.push("/profile/cards")}
      />
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
