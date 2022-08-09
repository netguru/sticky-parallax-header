import * as React from 'react';
import type { ColorValue } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface HeaderBackgroundProps {
  backgroundColor?: ColorValue;
  hasBorderRadius?: boolean;
  height: number;
  scrollValue: Animated.SharedValue<number>;
}

export const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
  backgroundColor,
  hasBorderRadius,
  height,
  scrollValue,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    if (!hasBorderRadius) {
      return { borderBottomEndRadius: 0 };
    }

    return {
      borderBottomEndRadius: interpolate(
        scrollValue.value,
        [0, height],
        [80, 0],
        Extrapolate.EXTEND
      ),
    };
  }, [hasBorderRadius, height]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.background, { backgroundColor }, animatedStyle]}
      testID="HeaderBackground"
    />
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: -1,
  },
});
