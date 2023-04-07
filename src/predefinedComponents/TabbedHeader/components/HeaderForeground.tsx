import * as React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { colors, commonStyles, constants } from '../../../constants';
import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  foregroundImage?: ImageSourcePropType;
  height: number;
  scrollValue: Animated.SharedValue<number>;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

export const Foreground: React.FC<ForegroundProps> = ({
  foregroundImage,
  height,
  scrollValue,
  title,
  titleStyle,
  titleTestID = 'TabbedHeaderForegroundTitleTestID',
}) => {
  const { responsiveWidth } = useResponsiveSize();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isLandscape =
    windowWidth > windowHeight && windowHeight <= constants.breakpoints.mediumPhoneShorterEdge;

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
  }, [scrollValue, startImgFade, finishImgFade]);
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
  }, [scrollValue, startImgSize, finishImgSize, startSize, endSize, profilePicBorderRadius]);
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, startTitleFade, finishTitleFade],
        [1, 1, 0],
        Extrapolate.CLAMP
      ),
    };
  }, [scrollValue, startTitleFade, finishTitleFade]);

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
      {foregroundImage ? (
        <Animated.View style={imageOpacityAnimatedStyle}>
          <Animated.Image source={foregroundImage} style={imageAnimatedStyle} />
        </Animated.View>
      ) : null}
      <Animated.View style={[commonStyles.messageContainer, titleAnimatedStyle]}>
        <Animated.Text style={messageStyle} testID={titleTestID}>
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 42,
    letterSpacing: -1,
    textAlign: 'left',
  },
});
