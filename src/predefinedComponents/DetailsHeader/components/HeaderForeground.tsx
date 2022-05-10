import type { FC } from 'react';
import React from 'react';
import type { ImageSourcePropType, TextStyle } from 'react-native';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import colors from '../../../constants/colors';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

interface ForegroundProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  tag?: string;
  title?: string;
}

export const Foreground: FC<ForegroundProps> = ({
  contentIcon,
  contentIconNumber,
  height,
  image,
  scrollValue,
  tag,
  title,
}) => {
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

  return (
    <View style={styles.foreground}>
      <Animated.View style={[styles.foregroundTitle, labelAnimatedStyle]}>
        <Text style={styles.foregroundText}>{tag}</Text>
      </Animated.View>
      <Animated.View style={[styles.messageContainer, titleAnimatedStyle]}>
        <Text numberOfLines={3} style={styles.message}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.infoContainer, authorAnimatedStyle]}>
        <View style={styles.iconContainer}>
          {contentIcon && <Image source={contentIcon} style={styles.icon} />}
          <Text style={[styles.number, numberRTLStyle]}>{contentIconNumber}</Text>
        </View>
        <View style={styles.footerContainer}>
          {image && <Image source={image} style={styles.authorPhoto} resizeMode="contain" />}
          <Text numberOfLines={1} style={[styles.authorName, authorNameRTLStyle]}>
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
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
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
  message: {
    color: colors.white,
    fontSize: 72,
    lineHeight: 85,
    letterSpacing: -1,
    textAlign: 'left',
  },
  messageContainer: {
    padding: 24,
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
