import Colors from "@/constants/Colors";
import CrossfadeTexts, {
  CrossfadeTextsHandle,
} from "@/src/components/ui/welcome_page/ChangingText";
import PaginationIndicator, {
  PaginationIndicatorHandle,
} from "@/src/components/ui/welcome_page/Pagination";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View,
} from "react-native";

export default function LoadingScreen() {
  // This type defines the structure of the animation data for each image
  type AnimationData = {
    source: any; // The source of the image
    targetX: number; // The target X coordinates of the image in the circular layout
    targetY: number; // The target Y coordinates of the image in the circular layout
    translateX: Animated.Value;
    translateY: Animated.Value;
    rotate?: Animated.Value;
    scale?: Animated.Value;
  };
  // This state is used for fade out animation on last stage
  const screenOpacity = useRef(new Animated.Value(1)).current;
  // This state variable keeps track of the current stage of the animation
  // It can be 0, 1, 2, 3, 4, or 5, according to design.
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const hasRedirected = useRef(false);
  // This ref is used to follow when to trigger the animation in a CrossfadeTexts component
  const crossfadeRef = useRef<CrossfadeTextsHandle>(null);
  // This ref is used to follow when to trigger the animation in a PaginationIndicator component
  const paginationRef = useRef<PaginationIndicatorHandle>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [imageContainerSize, setImageContainerSize] = useState({
    width: 0,
    height: 0,
  });
  // Size of each image in the circular layout
  const IMAGE_SIZE = 100;
  // This sets the initial font size for the animated title text to 24px
  const animatedFontSize = useRef(new Animated.Value(24)).current;
  // Create an array of animated values for each image
  // Each image will animate to a position in a circular layout
  const images = [
    {
      source: require("@/assets/images/welcome_page/img0.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 0,
          scale: 1.3,
        },
        stage3: {
          rotate: 45,
          scale: 1,
        },
        stage4: {
          rotate: 45,
          scale: 1.3,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img1.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },

        stage2: {
          rotate: 30,
          scale: 1,
        },
        stage3: {
          rotate: 105,
          scale: 1.3,
        },
        stage4: {
          rotate: 195,
          scale: 1,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img2.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 0,
          scale: 1.3,
        },
        stage3: {
          rotate: 30,
          scale: 1,
        },
        stage4: {
          rotate: 64.85,
          scale: 1.3,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img3.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 45,
          scale: 1,
        },
        stage3: {
          rotate: 60,
          scale: 1.3,
        },
        stage4: {
          rotate: 80.68,
          scale: 1,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img4.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 0,
          scale: 1.3,
        },
        stage3: {
          rotate: 90,
          scale: 1,
        },
        stage4: {
          rotate: 120,
          scale: 1.3,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img5.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 0,
          scale: 1,
        },
        stage3: {
          rotate: 150,
          scale: 1.3,
        },
        stage4: {
          rotate: 0,
          scale: 1,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img6.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 30,
          scale: 1.3,
        },
        stage3: {
          rotate: -30,
          scale: 1,
        },
        stage4: {
          rotate: 10,
          scale: 1,
        },
      },
    },
    {
      source: require("@/assets/images/welcome_page/img7.png"),
      animations: {
        stage1: {
          rotate: 0,
          scale: 1,
        },
        stage2: {
          rotate: 90,
          scale: 1,
        },
        stage3: {
          rotate: -60,
          scale: 1.3,
        },
        stage4: {
          rotate: -30,
          scale: 1,
        },
      },
    },
  ];
  // Here we store the animated values for each image
  const imageAnimations = useRef<AnimationData[]>([]);

  // For the STAGE 1 only calculate the initial positions for each image
  function calculateInitialImageAnimations({
    containerWidth,
    containerHeight,
    imageSize,
    images,
  }: {
    containerWidth: number;
    containerHeight: number;
    imageSize: number;
    images: { source: any }[];
  }): AnimationData[] {
    // To calculate the positions of the images in a ellipsis layout
    // Calculate the center of the image container and the radius for the ellipsis layout
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const radiusX = centerX - imageSize / 2;
    const radiusY = centerY - imageSize / 2;
    // The angleOffset is used to adjust the starting angle of the first
    // image to be on the top and slightly to the right clockwise
    const angleOffset = -Math.PI / 2 + (22 * Math.PI) / 180;

    return images.map((img, index) => {
      // Calculate the target position for each image based on its index
      const angle = (2 * Math.PI * index) / images.length + angleOffset;
      // (by Demidas)Really i could not understand why i needed to minus the radiusX and radiusY from
      // the targetX and targetY but it works
      const targetX =
        centerX - radiusX + radiusX * Math.cos(angle) - imageSize / 2;
      const targetY =
        centerY - radiusY + radiusY * Math.sin(angle) - imageSize / 2;
      // Calculate the starting position for the animation for the first 4 images to be outside
      // of the screen to the right and the last 4 images to be outside of the screen to the left
      const startX =
        index < images.length / 2 ? targetX + centerX : targetX - centerX;
      const startY = targetY;

      return {
        source: img.source,
        targetX,
        targetY,
        translateX: new Animated.Value(startX),
        translateY: new Animated.Value(startY),
        rotate: new Animated.Value(0),
        scale: new Animated.Value(1),
      };
    });
  }
  // For STAGE 2 to STAGE 4 calculate the next target positions rotating images clockwise
  function calculateNextTargetPositions(
    animations: AnimationData[],
  ): { x: number; y: number }[] {
    const currentTargets = animations.map((a) => ({
      x: a.targetX,
      y: a.targetY,
    }));
    currentTargets.push(currentTargets.shift()!);
    return currentTargets;
  }
  // STAGE 1: SPLASH-1 → SPLASH-2
  useEffect(() => {
    if (
      stage !== 1 ||
      imageContainerSize.width === 0 ||
      imageContainerSize.height === 0
    )
      return;
    const timeout = setTimeout(() => {
      const animations = calculateInitialImageAnimations({
        containerWidth: imageContainerSize.width,
        containerHeight: imageContainerSize.height,
        imageSize: IMAGE_SIZE,
        images,
      });
      imageAnimations.current = animations;
      // Animate the images to their target positions
      const moveAnims = animations.map((anim) =>
        Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: anim.targetX,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: anim.targetY,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      // Animate the font size from 24 to 72
      const growText = Animated.timing(animatedFontSize, {
        toValue: 72,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      });
      setAnimationsReady(true);
      requestAnimationFrame(() => {
        Animated.parallel([growText, ...moveAnims]).start(() => {
          requestAnimationFrame(() => setStage(2));
        });
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [stage, imageContainerSize]);

  // STAGE 2: SPLASH-2 → SPLASH-3
  useEffect(() => {
    if (stage !== 2 || imageAnimations.current.length !== images.length) return;
    const timeout = setTimeout(() => {
      // Trigger child animations
      crossfadeRef.current?.trigger(0);
      paginationRef.current?.trigger(2);
      // get new positions of images on which they'll move in animation
      const shiftedTargets = calculateNextTargetPositions(
        imageAnimations.current,
      );
      // Animate text shrinking to preset size
      // This will animate the text from 72px to 32px
      const textShrink = Animated.timing(animatedFontSize, {
        toValue: 32,
        duration: 500,
        useNativeDriver: false,
      });

      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        // Update the stored target values for the next stage
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;

        return Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: anim.targetX,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: anim.targetY,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate!, {
            toValue: imgDef.animations.stage2.rotate / 360,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale!, {
            toValue: imgDef.animations.stage2.scale,
            duration: 500,
            useNativeDriver: true,
          }),
        ]);
      });
      // Start planned animation in parallel
      Animated.parallel([textShrink, ...imageAnims]).start(() => {
        requestAnimationFrame(() => setStage(3));
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [stage]);

  // STAGE 3: SPLASH-3 → SPLASH-4
  useEffect(() => {
    if (stage !== 3 || imageAnimations.current.length !== images.length) return;
    const timeout = setTimeout(() => {
      // Trigger child animations
      crossfadeRef.current?.trigger(1);
      paginationRef.current?.trigger(3);
      // get new positions of images on which they'll move in animation
      const shiftedTargets = calculateNextTargetPositions(
        imageAnimations.current,
      );
      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        // Update the stored target values for the next stage
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;

        return Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: anim.targetX,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: anim.targetY,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate!, {
            toValue: imgDef.animations.stage3.rotate / 360,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale!, {
            toValue: imgDef.animations.stage3.scale,
            duration: 500,
            useNativeDriver: true,
          }),
        ]);
      });
      // Start planned animation in parallel
      Animated.parallel(imageAnims).start(() => {
        requestAnimationFrame(() => setStage(4));
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [stage]);

  // STAGE 4: SPLASH-4 → SPLASH-5
  useEffect(() => {
    if (stage !== 4 || imageAnimations.current.length !== images.length) return;
    const timeout = setTimeout(() => {
      // Trigger child animations
      crossfadeRef.current?.trigger(2);
      paginationRef.current?.trigger(4);
      // get new positions of images on which they'll move in animation
      const shiftedTargets = calculateNextTargetPositions(
        imageAnimations.current,
      );
      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        // Update the stored target values for the next stage
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;

        return Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: anim.targetX,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: anim.targetY,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate!, {
            toValue: imgDef.animations.stage4.rotate / 360,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale!, {
            toValue: imgDef.animations.stage4.scale,
            duration: 500,
            useNativeDriver: true,
          }),
        ]);
      });
      // Start planned animation in parallel
      Animated.parallel(imageAnims).start(() => {
        requestAnimationFrame(() => setStage(5));
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [stage]);

  // STAGE 5: Redirect to next page
  //TODO: Insert correct redirect page / by Demidas/
  useEffect(() => {
    if (stage === 5 && !hasRedirected.current) {
      hasRedirected.current = true;
      const timeout = setTimeout(() => {
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          router.replace("/(main)/welcome");
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [stage]);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          if (
            imageContainerSize.width === 0 &&
            imageContainerSize.height === 0
          ) {
            setImageContainerSize({ width, height });
            setStage(1);
          }
        }}
      >
        {imageContainerSize.width > 0 && imageContainerSize.height > 0 ? (
          <>
            {/* Animated images */}
            {animationsReady &&
              imageAnimations.current.length === images.length &&
              imageAnimations.current.map((anim, i) => (
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
                      {
                        rotate: anim.rotate
                          ? anim.rotate.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "360deg"],
                            })
                          : "0deg",
                      },
                      { scale: anim.scale ?? 1 },
                    ],
                  }}
                />
              ))}
            <Animated.Text
              style={[styles.title, { fontSize: animatedFontSize }]}
            >
              Market
            </Animated.Text>
            <Animated.Text
              style={[styles.title, { fontSize: animatedFontSize }]}
            >
              Hub
            </Animated.Text>
          </>
        ) : (
          // Fallback content until layout is ready
          <ActivityIndicator size="large" color={Colors.blackMain} />
        )}
      </View>
      <View style={styles.bottomContainer}>
        {stage !== 1 ? (
          <>
            <CrossfadeTexts
              ref={crossfadeRef}
              messages={[
                "Це спільнота розумних покупок та якісних послуг!",
                "Знайди все, що тобі потрібно, в одному місці!",
                "Твій маркетплейс починається тут!",
              ]}
              textStyle={styles.text}
              duration={500}
            />
            <PaginationIndicator ref={paginationRef} />
          </>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white,
    paddingTop: 120,
    paddingBottom: 40,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    width: "100%",
  },
  title: {
    fontFamily: "Namu",
    textTransform: "uppercase",
    color: Colors.blackMain,
  },
  bottomContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 16,
  },
  placeholder: {
    height: 100,
  },
  text: {
    fontFamily: "Manrope",
    fontWeight: "400",
    fontSize: 22,
    color: Colors.blackMain,
    letterSpacing: 0,
    textAlign: "center",
  },
});
