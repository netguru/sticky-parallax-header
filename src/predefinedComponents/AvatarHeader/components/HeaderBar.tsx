import type { FC } from 'react';
import React from 'react';
import type { ColorValue, ImageSourcePropType, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconRenderer from '../../../components/IconRenderer/IconRenderer';
import colors from '../../../constants/colors';
import type { IconProps } from '../../common/SharedProps';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { scrollPosition } from '../../common/utils/scrollPosition';

const HIT_SLOP = {
  top: 15,
  left: 15,
  bottom: 15,
  right: 15,
};

interface HeaderProps extends IconProps {
  backgroundColor?: ColorValue;
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  title?: string;
}

export const HeaderBar: FC<HeaderProps> = ({
  backgroundColor,
  height,
  image,
  leftTopIcon,
  leftTopIconAccessibilityLabel,
  leftTopIconOnPress,
  leftTopIconTestID,
  rightTopIcon,
  rightTopIconAccessibilityLabel,
  rightTopIconOnPress,
  rightTopIconTestID,
  scrollValue,
  title,
}) => {
  const [beforeFadeImg, startFadeImg, finishFadeImg] = [
    scrollPosition(height, 30),
    scrollPosition(height, 40),
    scrollPosition(height, 70),
  ];
  const [beforeFadeName, startFadeName, finishFadeName] = [
    scrollPosition(height, 50),
    scrollPosition(height, 60),
    scrollPosition(height, 75),
  ];

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, beforeFadeImg, startFadeImg, finishFadeImg],
        [0, 0, 0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const nameAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, beforeFadeName, startFadeName, finishFadeName],
        [0, 0, 0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const headerTitleContainerRTLStyle = useRTLStyles<ViewStyle>(
    styles.headerTitleContainerMarginRight,
    styles.headerTitleContainerMarginLeft,
    styles.headerTitleContainerMarginEnd
  );

  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={[styles.headerWrapper, { backgroundColor }]}>
      <View style={styles.headerMenu}>
        <Pressable
          accessibilityLabel={leftTopIconAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={HIT_SLOP}
          onPress={leftTopIconOnPress}
          style={styles.leftHeaderButton}
          testID={leftTopIconTestID}>
          <IconRenderer icon={leftTopIcon} />
        </Pressable>
        <View style={[styles.headerTitleContainer, headerTitleContainerRTLStyle]}>
          <Animated.Image
            source={image as ImageSourcePropType}
            style={[styles.headerPic, imageAnimatedStyle]}
          />
          <Animated.Text numberOfLines={1} style={[styles.headerTitle, nameAnimatedStyle]}>
            {title}
          </Animated.Text>
        </View>
        <Pressable
          accessibilityLabel={rightTopIconAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={HIT_SLOP}
          onPress={rightTopIconOnPress}
          style={styles.rightHeaderButton}
          testID={rightTopIconTestID}>
          <IconRenderer icon={rightTopIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerMenu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerPic: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
    marginHorizontal: 12,
    textAlign: 'left',
  },
  headerTitleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainerMarginEnd: {
    marginEnd: 24,
  },
  headerTitleContainerMarginLeft: {
    marginLeft: 24,
  },
  headerTitleContainerMarginRight: {
    marginRight: 24,
  },
  headerWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  leftHeaderButton: {
    alignItems: 'flex-start',
    flex: 1,
  },
  rightHeaderButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
