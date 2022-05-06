import type { FC } from 'react';
import React from 'react';
import type { ColorValue, ImageSourcePropType } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type Animated from 'react-native-reanimated';

import { colors } from '../../../constants';
import { HeaderBackground } from './HeaderBackground';
import { HeaderBackgroundImage } from './HeaderBackgroundImage';

interface HeaderWrapperProps {
  backgroundColor?: ColorValue;
  backgroundImage?: ImageSourcePropType;
  contentBackgroundColor?: ColorValue;
  hasBorderRadius?: boolean;
  parallaxHeight: number;
  scrollHeight: number;
  scrollValue: Animated.SharedValue<number>;
  tabsContainerBackgroundColor?: ColorValue;
}

export const HeaderWrapper: FC<HeaderWrapperProps> = ({
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

  return (
    <View style={{ backgroundColor: contentBackgroundColor }}>
      {backgroundImage ? (
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
      ) : (
        <View style={[styles.headerStyle, { height: scrollHeight }, { width }]}>
          <HeaderBackground
            backgroundColor={backgroundColor}
            hasBorderRadius={hasBorderRadius}
            height={parallaxHeight}
            scrollValue={scrollValue}
          />
        </View>
      )}
      <View
        style={[
          {
            height: scrollHeight,
            backgroundColor: tabsContainerBackgroundColor,
          },
          !!backgroundImage && styles.transparentBackground,
        ]}>
        {children}
      </View>
    </View>
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
  transparentBackground: {
    backgroundColor: colors.transparent,
  },
});
