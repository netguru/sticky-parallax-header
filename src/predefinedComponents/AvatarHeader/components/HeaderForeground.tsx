import * as React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { colors, commonStyles, constants } from '../../../constants';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  subtitle?: string;
  subtitleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  subtitleTestID?: string;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

const finishImgPosition = 31;
const startImgPosition = 27;

export const Foreground: React.FC<ForegroundProps> = ({
  height,
  image,
  scrollValue,
  subtitle,
  subtitleStyle,
  subtitleTestID = 'AvatarHeaderForegroundSubtitleTestID',
  title,
  titleStyle,
  titleTestID = 'AvatarHeaderForegroundTitleTestID',
}) => {
  const { responsiveWidth } = useResponsiveSize();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isLandscape =
    windowWidth > windowHeight && windowHeight <= constants.breakpoints.mediumPhoneShorterEdge;

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
  }, [scrollValue, startImgAnimation, finishImgAnimation]);
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
  }, [
    scrollValue,
    startImgAnimation,
    finishImgAnimation,
    startSize,
    endSize,
    profilePicBorderRadius,
  ]);
  const authorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startAuthorFade, finishAuthorFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  }, [scrollValue, startAuthorFade, finishAuthorFade]);
  const aboutAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startAboutFade, fininshAboutFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  }, [scrollValue, startAboutFade, fininshAboutFade]);
  const foregroundTitleRTLStyle = useRTLStyles<ViewStyle>(
    styles.foregroundTitlePaddingRight,
    styles.foregroundTitlePaddingLeft,
    styles.foregroundTitlePaddingEnd
  );
  const landscapeStyle = useRTLStyles<ViewStyle>(
    commonStyles.row,
    commonStyles.rowReverse,
    commonStyles.row
  );

  return (
    <View
      pointerEvents="none"
      style={
        isLandscape
          ? [commonStyles.foregroundRow, landscapeStyle]
          : [commonStyles.foreground, commonStyles.column]
      }>
      <Animated.View style={imageOpacityAnimatedStyle}>
        <Animated.Image source={image as ImageSourcePropType} style={imageAnimatedStyle} />
      </Animated.View>
      <View style={[isLandscape && styles.landscapeTitleContainer]}>
        <Animated.View style={[styles.userModalMessageContainer, authorAnimatedStyle]}>
          <Animated.Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={[
              commonStyles.message,
              styles.foregroundTitle,
              foregroundTitleRTLStyle,
              titleStyle,
            ]}
            testID={titleTestID}>
            {title}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.infoContainer, aboutAnimatedStyle]}>
          <Animated.Text
            adjustsFontSizeToFit
            style={[styles.infoText, subtitleStyle ?? titleStyle]}
            testID={subtitleTestID}>
            {subtitle}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  infoText: {
    flexGrow: 1,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  landscapeTitleContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  userModalMessageContainer: {
    alignItems: 'flex-start',
    marginTop: 12,
    paddingTop: 24,
    paddingBottom: 8,
  },
});
