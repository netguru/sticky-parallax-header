import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { colors } from '../../../constants';
import type { AnimatedColorProp } from '../SharedProps';
import { parseAnimatedColorProp } from '../utils/parseAnimatedColorProp';

import { HeaderBackground } from './HeaderBackground';
import { HeaderBackgroundImage } from './HeaderBackgroundImage';

interface HeaderWrapperProps {
  backgroundColor?: AnimatedColorProp;
  backgroundImage?: ImageSourcePropType;
  contentBackgroundColor?: AnimatedColorProp;
  hasBorderRadius?: boolean;
  parallaxHeight: number;
  scrollHeight: number;
  scrollValue: Animated.SharedValue<number>;
  tabsContainerBackgroundColor?: AnimatedColorProp;
}

export const HeaderWrapper: React.FC<React.PropsWithChildren<HeaderWrapperProps>> = ({
  backgroundColor,
  backgroundImage,
  children,
  contentBackgroundColor,
  hasBorderRadius,
  parallaxHeight,
  scrollHeight,
  scrollValue,
  tabsContainerBackgroundColor,
}) => {
  const { width } = useWindowDimensions();
  const hasBackgroundImage = !!backgroundImage;
  const contentAnimatedStyle = useAnimatedStyle(() => {
    // TypeScript complains about AnimatedNode<StyleProp<ViewStyle>> from reanimated v1
    return { backgroundColor: parseAnimatedColorProp(contentBackgroundColor) as string };
  }, [contentBackgroundColor]);
  const foregroundAnimatedStyle = useAnimatedStyle(() => {
    if (hasBackgroundImage) {
      return { backgroundColor: colors.transparent };
    }

    return {
      backgroundColor: parseAnimatedColorProp(tabsContainerBackgroundColor),
    };
  }, [hasBackgroundImage, tabsContainerBackgroundColor]);

  return (
    <Animated.View pointerEvents="box-none" style={contentAnimatedStyle}>
      {backgroundImage ? (
        <View pointerEvents="none">
          <HeaderBackgroundImage
            background={
              <HeaderBackground
                backgroundColor={backgroundColor}
                hasBorderRadius={hasBorderRadius}
                height={parallaxHeight}
                scrollValue={scrollValue}
              />
            }
            backgroundHeight={scrollHeight}
            backgroundImage={backgroundImage}
          />
        </View>
      ) : (
        <View
          pointerEvents="none"
          style={[styles.headerStyle, { height: scrollHeight }, { width }]}>
          <HeaderBackground
            backgroundColor={backgroundColor}
            hasBorderRadius={hasBorderRadius}
            height={parallaxHeight}
            scrollValue={scrollValue}
          />
        </View>
      )}
      <Animated.View
        pointerEvents="box-none"
        style={[
          {
            height: scrollHeight,
          },
          foregroundAnimatedStyle,
        ]}
        testID="HeaderForeground">
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
