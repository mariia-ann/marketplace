import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const LoaderfromFigma = () => {
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const rot = useSharedValue(0);
  const cx = 40;
  const cy = 40;
  const r = 34;
  const dashLength = 180;
  const endAngle = dashLength / r;
  const dotX = cx + r * Math.cos(endAngle);
  const dotY = cy + r * Math.sin(endAngle);

  React.useEffect(() => {
    rot.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedSvg
        width={80}
        height={80}
        viewBox='0 0 80 80'
        fill='none'
        style={style}
      >
        <Defs>
          <LinearGradient id='strokeGrad' x1='80%' y1='10%' x2='99%' y2='30%'>
            <Stop offset='0%' stopColor={Colors.softPurple} stopOpacity={1} />
            <Stop offset='100%' stopColor={Colors.softPurple} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke='url(#strokeGrad)'
          strokeWidth={12}
          strokeLinecap='round'
          strokeDasharray='180 200'
          fill='none'
        />
        {/* <Circle cx={dotX} cy={dotY} r='5' fill={Colors.softPurple} />*/}
      </AnimatedSvg>
    </View>
  );
};

export default LoaderfromFigma;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
