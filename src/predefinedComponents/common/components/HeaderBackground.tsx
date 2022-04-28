import type { FC } from 'react';
import React from 'react';
import type { ColorValue } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { colors } from '../../../constants';

interface HeaderBackgroundProps {
  backgroundColor?: ColorValue;
  hasBorderRadius?: boolean;
  height: number;
  scrollValue: Animated.SharedValue<number>;
}

export const HeaderBackground: FC<HeaderBackgroundProps> = ({
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

  return <Animated.View style={[styles.background, { backgroundColor }, animatedStyle]} />;
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.primaryGreen,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
