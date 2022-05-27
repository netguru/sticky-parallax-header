import type { FC } from 'react';
import React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { colors, commonStyles, constants } from '../../../constants';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  contentIconNumberStyle?: StyleProp<TextStyle>;
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  tag?: string;
  tagStyle?: StyleProp<TextStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

export const Foreground: FC<ForegroundProps> = ({
  contentIcon,
  contentIconNumber,
  contentIconNumberStyle,
  height,
  image,
  scrollValue,
  tag,
  tagStyle,
  title,
  titleStyle,
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
  });
  const titleInputRange = [0, scrollPosition(height, 45), scrollPosition(height, 55)];
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, titleInputRange, outputRange, Extrapolate.CLAMP),
    };
  });
  const authorInputRange = [0, scrollPosition(height, 55), scrollPosition(height, 70)];
  const authorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, authorInputRange, outputRange, Extrapolate.CLAMP),
    };
  });
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
      style={
        isLandscape
          ? [commonStyles.foregroundRow, landscapeStyle]
          : [commonStyles.foreground, commonStyles.column]
      }>
      <View>
        <Animated.View style={[styles.foregroundTitle, labelAnimatedStyle]}>
          <Text style={[styles.foregroundText, tagStyle ?? titleStyle]}>{tag}</Text>
        </Animated.View>
        <Animated.View style={[commonStyles.messageContainer, titleAnimatedStyle]}>
          <Text numberOfLines={3} style={[commonStyles.message, titleStyle]}>
            {title}
          </Text>
        </Animated.View>
      </View>
      <Animated.View style={[styles.infoContainer, authorAnimatedStyle]}>
        <View style={styles.iconContainer}>
          {contentIcon && <Image source={contentIcon} style={styles.icon} />}
          <Text style={[styles.number, numberRTLStyle, contentIconNumberStyle ?? titleStyle]}>
            {contentIconNumber}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          {image && <Image source={image} style={styles.authorPhoto} resizeMode="contain" />}
          <Text numberOfLines={1} style={[styles.authorName, authorNameRTLStyle, titleStyle]}>
            {title}
          </Text>
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
