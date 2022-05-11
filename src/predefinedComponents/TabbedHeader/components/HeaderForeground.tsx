import type { FC } from 'react';
import React from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import colors from '../../../constants/colors';
import screenStyles from '../../../constants/screenStyles';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  foregroundImage?: ImageSourcePropType;
  height: number;
  scrollValue: Animated.SharedValue<number>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

export const Foreground: FC<ForegroundProps> = ({
  foregroundImage,
  height,
  scrollValue,
  title,
  titleStyle,
}) => {
  const { responsiveWidth } = useResponsiveSize();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isLandscape = windowWidth > windowHeight;

  const profilePicBorderRadius = responsiveWidth(4.5);
  const messageStyle = [styles.message, titleStyle];
  const startSize = responsiveWidth(18);
  const endSize = responsiveWidth(10);
  const [startImgFade, finishImgFade] = [scrollPosition(height, 22), scrollPosition(height, 27)];
  const [startImgSize, finishImgSize] = [scrollPosition(height, 20), scrollPosition(height, 30)];
  const [startTitleFade, finishTitleFade] = [
    scrollPosition(height, 25),
    scrollPosition(height, 45),
  ];

  const imageOpacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startImgFade, finishImgFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const imageSize = interpolate(
      scrollValue.value,
      [0, startImgSize, finishImgSize],
      [startSize, startSize, endSize],
      Extrapolate.CLAMP
    );

    return {
      borderRadius: profilePicBorderRadius,
      height: imageSize,
      width: imageSize,
    };
  });
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startTitleFade, finishTitleFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const landscapeStyle = useRTLStyles<ViewStyle>(
    screenStyles.row,
    screenStyles.rowReverse,
    screenStyles.row
  );

  return (
    <View
      style={
        isLandscape
          ? [styles.foregroundRow, landscapeStyle]
          : [styles.foreground, screenStyles.column]
      }>
      {foregroundImage ? (
        <Animated.View style={imageOpacityAnimatedStyle}>
          <Animated.Image source={foregroundImage} style={imageAnimatedStyle} />
        </Animated.View>
      ) : null}
      <Animated.View style={[styles.messageContainer, titleAnimatedStyle]}>
        <Text style={messageStyle}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  foreground: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  foregroundRow: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  message: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 42,
    letterSpacing: -1,
    textAlign: 'left',
  },
  messageContainer: {
    paddingVertical: 24,
  },
});
