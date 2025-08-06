import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet, View } from "react-native";
import CustomButton from "../../app-example/components/CustomButton";

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

  // This state variable keeps track of the current stage of the animation
  // It can be 1, 2, 3, 4, or 5, according to design.
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);

  // This effect runs when the stage changes to 5 as last stage and should redirect the user to starting page
  useEffect(() => {
    if (stage === 5) {
      console.log("Stage 5 reached, redirecting to profile/cards");
    }
  }, [stage]);

  const [imageContainerSize, setImageContainerSize] = useState({
    width: 0,
    height: 0,
  });
  // TODO: Delete below line it's only for red dot debugging /by Demidas/
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  const IMAGE_SIZE = 100; // Size of each image in the circular layout

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
          rotate: 20.92,
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
          rotate: 145.08,
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
          rotate: -60,
          scale: 1,
        },
      },
    },
  ];
  // Here we store the animated values for each image
  const imageAnimations = useRef<AnimationData[]>([]);

  // STAGE 1: SPLASH-1 → SPLASH-2
  useEffect(() => {
    if (imageContainerSize.width === 0 || imageContainerSize.height === 0)
      return;
    // To calculate the positions of the images in a ellipsis layout
    // Calculate the center of the image container and the radius for the ellipsis layout
    const centerX = imageContainerSize.width / 2;
    const centerY = imageContainerSize.height / 2;
    const radiusX = centerX - IMAGE_SIZE / 2;
    const radiusY = centerY - IMAGE_SIZE / 2;

    const animations: AnimationData[] = images.map((img, index) => {
      // Calculate the target position for each image based on its index
      // The angleOffset is used to adjust the starting angle of the first image to be on the top and slightly to the right
      const angleOffset = -Math.PI / 2 + (30 * Math.PI) / 180;
      const angle = (2 * Math.PI * index) / images.length + angleOffset;
      // (by Demidas)Really i could not understand why i needed to minus the radiusX and radiusY from
      // the targetX and targetY but it works
      const targetX =
        centerX - radiusX + radiusX * Math.cos(angle) - IMAGE_SIZE / 2;
      const targetY =
        centerY - radiusY + radiusY * Math.sin(angle) - IMAGE_SIZE / 2;
      // Calculate the starting position for the animation for the first 4 images to be outside
      // of the screen to the right and the last 4 images to be outside of the screen to the left
      const startX =
        index < images.length / 2 ? targetX + centerX : targetX - centerX;
      const startY = targetY;
      const translateX = new Animated.Value(startX);
      const translateY = new Animated.Value(startY);

      return {
        source: img.source,
        targetX,
        targetY,
        translateX,
        translateY,
        rotate: new Animated.Value(0),
        scale: new Animated.Value(1),
      };
    });

    imageAnimations.current = animations;
    // Animate the images to their target positions
    const moveAnims = animations.map((anim) =>
      Animated.timing(anim.translateX, {
        toValue: anim.targetX,
        duration: 500,
        useNativeDriver: true,
      })
    );

    // Animate the font size from 24 to 72
    const growText = Animated.timing(animatedFontSize, {
      toValue: 72,
      duration: 800,
      useNativeDriver: false,
    });

    Animated.parallel([...moveAnims, growText]).start(() => {
      requestAnimationFrame(() => setStage(2));
    });
  }, [imageContainerSize]);

  // STAGE 2: SPLASH-2 → SPLASH-3
  useEffect(() => {
    if (stage !== 2 || imageAnimations.current.length !== images.length) return;
    const timeout = setTimeout(() => {
      // Copy the current animations with their current target positions
      const currentAnims = [...imageAnimations.current];
      // Shift image positions clockwise (coordinates of img0 goes to last img, img1 goes to img0's place, etc.)
      const shiftedTargets = currentAnims.map((a) => ({
        x: a.targetX,
        y: a.targetY,
      }));
      shiftedTargets.push(shiftedTargets.shift()!);
      // Animate text shrinking to preset size
      // This will animate the text from 72px to 32px
      const textShrink = Animated.timing(animatedFontSize, {
        toValue: 32,
        duration: 400,
        useNativeDriver: false,
      });
      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        const moveX = Animated.timing(anim.translateX, {
          toValue: shiftedTargets[i].x,
          duration: 400,
          useNativeDriver: true,
        });
        const moveY = Animated.timing(anim.translateY, {
          toValue: shiftedTargets[i].y,
          duration: 400,
          useNativeDriver: true,
        });
        const rotateAnim = Animated.timing(anim.rotate!, {
          toValue: imgDef.animations.stage2.rotate / 360,
          duration: 400,
          useNativeDriver: true,
        });
        const scaleAnim = Animated.timing(anim.scale!, {
          toValue: imgDef.animations.stage2.scale,
          duration: 400,
          useNativeDriver: true,
        });
        // Update the stored target values for the next stage
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;

        return Animated.parallel([moveX, moveY, rotateAnim, scaleAnim]);
      });
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
      const currentAnims = [...imageAnimations.current];
      // Shift image positions again (clockwise)
      const shiftedTargets = currentAnims.map((a) => ({
        x: a.targetX,
        y: a.targetY,
      }));
      shiftedTargets.push(shiftedTargets.shift()!); // circular clockwise shift
      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        const moveX = Animated.timing(anim.translateX, {
          toValue: shiftedTargets[i].x,
          duration: 400,
          useNativeDriver: true,
        });
        const moveY = Animated.timing(anim.translateY, {
          toValue: shiftedTargets[i].y,
          duration: 400,
          useNativeDriver: true,
        });
        const rotateAnim = Animated.timing(anim.rotate!, {
          toValue: imgDef.animations.stage3.rotate / 360,
          duration: 400,
          useNativeDriver: true,
        });
        const scaleAnim = Animated.timing(anim.scale!, {
          toValue: imgDef.animations.stage3.scale,
          duration: 400,
          useNativeDriver: true,
        });
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;
        return Animated.parallel([moveX, moveY, rotateAnim, scaleAnim]);
      });
      Animated.parallel(imageAnims).start(() => {
        requestAnimationFrame(() => setStage(4));
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [stage]);

  // STAGE 4: SPLASH-4 → SPLASH-5
  useEffect(() => {
    if (stage !== 4 || imageAnimations.current.length !== images.length) return;
    const timeout = setTimeout(() => {
      const currentAnims = [...imageAnimations.current];
      // Shift image positions again (clockwise)
      const shiftedTargets = currentAnims.map((a) => ({
        x: a.targetX,
        y: a.targetY,
      }));
      shiftedTargets.push(shiftedTargets.shift()!); // circular clockwise shift
      const imageAnims = imageAnimations.current.map((anim, i) => {
        const imgDef = images[i];
        const moveX = Animated.timing(anim.translateX, {
          toValue: shiftedTargets[i].x,
          duration: 400,
          useNativeDriver: true,
        });
        const moveY = Animated.timing(anim.translateY, {
          toValue: shiftedTargets[i].y,
          duration: 400,
          useNativeDriver: true,
        });
        const rotateAnim = Animated.timing(anim.rotate!, {
          toValue: imgDef.animations.stage4.rotate / 360,
          duration: 400,
          useNativeDriver: true,
        });
        const scaleAnim = Animated.timing(anim.scale!, {
          toValue: imgDef.animations.stage4.scale,
          duration: 400,
          useNativeDriver: true,
        });
        // Update target for the next stage
        anim.targetX = shiftedTargets[i].x;
        anim.targetY = shiftedTargets[i].y;

        return Animated.parallel([moveX, moveY, rotateAnim, scaleAnim]);
      });
      Animated.parallel(imageAnims).start(() => {
        requestAnimationFrame(() => setStage(5));
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [stage]);

  //TODO: Dlete this useEffect once the animations are working as expected / by Demidas/
  useEffect(() => {
    console.log("Stage now:", stage);
  }, [stage]);

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
        {/* TODO: Delete this red dot once the animations are working as expected /by Demidas/ */}
        {/* This is the red dot at the center of the screen */}
        {/* It serves as a visual anchor point for the animations */}
        {imageContainerSize.width > 0 && imageContainerSize.height > 0 ? (
          <>
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
    marginTop: 120,
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
