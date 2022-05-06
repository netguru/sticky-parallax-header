import type { FC } from 'react';
import React from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import colors from '../../../constants/colors';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  subtitle?: string;
  title?: string;
}

const finishImgPosition = 31;
const startImgPosition = 27;

export const Foreground: FC<ForegroundProps> = ({
  height,
  image,
  scrollValue,
  subtitle,
  title,
}) => {
  const { responsiveWidth } = useResponsiveSize();
  const profilePicBorderRadius = responsiveWidth(4.5);

  const startSize = responsiveWidth(18);
  const endSize = responsiveWidth(12);
  const [startImgAnimation, finishImgAnimation] = [
    scrollPosition(height, startImgPosition),
    scrollPosition(height, finishImgPosition),
  ];
  const [startAuthorFade, finishAuthorFade] = [
    scrollPosition(height, 40),
    scrollPosition(height, 50),
  ];
  const [startAboutFade, fininshAboutFade] = [
    scrollPosition(height, 60),
    scrollPosition(height, 70),
  ];

  const imageOpacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startImgAnimation, finishImgAnimation],
        [1, 0.8, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const imageSize = interpolate(
      scrollValue.value,
      [0, startImgAnimation, finishImgAnimation],
      [startSize, startSize, endSize],
      Extrapolate.CLAMP
    );

    return {
      borderRadius: profilePicBorderRadius,
      height: imageSize,
      width: imageSize,
    };
  });
  const authorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startAuthorFade, finishAuthorFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const aboutAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startAboutFade, fininshAboutFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const foregroundTitleRTLStyle = useRTLStyles<ViewStyle>(
    styles.foregroundTitlePaddingRight,
    styles.foregroundTitlePaddingLeft,
    styles.foregroundTitlePaddingEnd
  );

  return (
    <View style={styles.foreground}>
      <Animated.View style={imageOpacityAnimatedStyle}>
        <Animated.Image source={image as ImageSourcePropType} style={imageAnimatedStyle} />
      </Animated.View>
      <Animated.View style={[styles.userModalMessageContainer, authorAnimatedStyle]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          style={[styles.message, styles.foregroundTitle, foregroundTitleRTLStyle]}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.infoContainer, aboutAnimatedStyle]}>
        <Text adjustsFontSizeToFit style={styles.infoText}>
          {subtitle}
        </Text>
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
  foregroundTitle: {
    flexGrow: 1,
    textAlign: 'left',
  },
  foregroundTitlePaddingEnd: {
    paddingEnd: 12,
  },
  foregroundTitlePaddingLeft: {
    paddingLeft: 12,
  },
  foregroundTitlePaddingRight: {
    paddingRight: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoText: {
    flexGrow: 1,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  message: {
    color: colors.white,
    fontSize: 72,
    lineHeight: 85,
    letterSpacing: -1,
    textAlign: 'left',
  },
  userModalMessageContainer: {
    alignItems: 'flex-start',
    marginTop: 12,
    paddingTop: 24,
    paddingBottom: 8,
  },
});
