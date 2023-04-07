import * as React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { colors, commonStyles, constants } from '../../../constants';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  contentIconNumberStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  contentIconNumberTestID?: string;
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  subtitle?: string;
  subtitleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  subtitleTestID?: string;
  tag?: string;
  tagStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  tagTestID?: string;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

export const Foreground: React.FC<ForegroundProps> = ({
  contentIcon,
  contentIconNumber,
  contentIconNumberStyle,
  contentIconNumberTestID = 'DetailsHeaderForegroundContentIconNumberTestID',
  height,
  image,
  scrollValue,
  subtitle,
  subtitleStyle,
  subtitleTestID = 'DetailsHeaderForegroundSubtitleTestID',
  tag,
  tagStyle,
  tagTestID = 'DetailsHeaderForegroundTagTestID',
  title,
  titleStyle,
  titleTestID = 'DetailsHeaderForegroundTitleTestID',
}) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const isLandscape =
    windowWidth > windowHeight && windowHeight <= constants.breakpoints.mediumPhoneShorterEdge;
  const outputRange = [1, 0.8, 0];
  const labelInputRange = [0, scrollPosition(height, 19), scrollPosition(height, 25)];
  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, labelInputRange, outputRange, Extrapolate.CLAMP),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollValue, height]);
  const titleInputRange = [0, scrollPosition(height, 45), scrollPosition(height, 55)];
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, titleInputRange, outputRange, Extrapolate.CLAMP),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollValue, height]);
  const authorInputRange = [0, scrollPosition(height, 55), scrollPosition(height, 70)];
  const authorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, authorInputRange, outputRange, Extrapolate.CLAMP),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollValue, height]);
  const authorNameRTLStyle = useRTLStyles<TextStyle>(
    styles.authorNamePaddingLeft,
    styles.authorNamePaddingRight,
    styles.authorNamePaddingStart
  );
  const numberRTLStyle = useRTLStyles<TextStyle>(
    styles.numberPaddingLeft,
    styles.numberPaddingRight,
    styles.numberPaddingStart
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
      <View>
        <Animated.View style={[styles.foregroundTitle, labelAnimatedStyle]}>
          <Animated.Text style={[styles.foregroundText, tagStyle ?? titleStyle]} testID={tagTestID}>
            {tag}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={[commonStyles.messageContainer, titleAnimatedStyle]}>
          <Animated.Text
            numberOfLines={3}
            style={[commonStyles.message, titleStyle]}
            testID={titleTestID}>
            {title}
          </Animated.Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.infoContainer, authorAnimatedStyle]}>
        <View style={styles.iconContainer}>
          {contentIcon && <Image source={contentIcon} style={styles.icon} />}
          <Animated.Text
            style={[styles.number, numberRTLStyle, contentIconNumberStyle ?? titleStyle]}
            testID={contentIconNumberTestID}>
            {contentIconNumber}
          </Animated.Text>
        </View>
        <View style={styles.footerContainer}>
          {image && <Image source={image} style={styles.authorPhoto} resizeMode="contain" />}
          <Animated.Text
            numberOfLines={1}
            style={[styles.authorName, authorNameRTLStyle, subtitleStyle ?? titleStyle]}
            testID={subtitleTestID}>
            {subtitle ?? title}
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  authorName: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
  },
  authorNamePaddingStart: {
    paddingStart: 12,
  },
  authorNamePaddingLeft: {
    paddingLeft: 12,
  },
  authorNamePaddingRight: {
    paddingRight: 12,
  },
  authorPhoto: {
    borderRadius: Platform.select({
      android: 50,
      default: 8,
    }),
    height: 32,
    width: 32,
  },
  foregroundText: {
    color: colors.white,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
  foregroundTitle: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.whiteTransparent10,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 24,
  },
  icon: {
    height: 16,
    marginTop: 3,
    width: 16,
  },
  iconContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 8,
    width: 56,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 32,
  },
  number: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'left',
  },
  numberPaddingStart: {
    paddingStart: 4,
  },
  numberPaddingLeft: {
    paddingLeft: 4,
  },
  numberPaddingRight: {
    paddingRight: 4,
  },
});
