import * as React from 'react';
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

  return (
    <View pointerEvents="box-none" style={{ backgroundColor: contentBackgroundColor }}>
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
      <View
        pointerEvents="box-none"
        style={[
          {
            height: scrollHeight,
            backgroundColor: tabsContainerBackgroundColor,
          },
          !!backgroundImage && styles.transparentBackground,
        ]}
        testID="HeaderForeground">
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
