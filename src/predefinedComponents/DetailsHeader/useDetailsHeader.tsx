import React, { useCallback } from 'react';
import { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import type { ScrollComponent } from '../common/SharedProps';
import { HeaderWrapper } from '../common/components/HeaderWrapper';
import { usePredefinedHeader } from '../common/hooks/usePredefinedHeader';
import { scrollPosition } from '../common/utils/scrollPosition';

import type { DetailsHeaderScrollViewProps } from './DetailsHeaderProps';
import { Foreground } from './components/HeaderForeground';

export function useDetailsHeader<T extends ScrollComponent>(props: DetailsHeaderScrollViewProps) {
  const {
    contentBackgroundColor,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = usePredefinedHeader<T>(props);
  const {
    backgroundColor,
    backgroundImage,
    contentIcon,
    contentIconNumber,
    contentIconNumberStyle,
    hasBorderRadius,
    image,
    tabsContainerBackgroundColor,
    tag,
    tagStyle,
    title,
    titleStyle,
  } = props;

  const headerTitleInputRange = [
    0,
    scrollPosition(scrollHeight, 60),
    scrollPosition(scrollHeight, 90),
  ];
  const headerTitleContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollValue.value, headerTitleInputRange, [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  const renderHeader = useCallback(() => {
    return (
      <HeaderWrapper
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        contentBackgroundColor={contentBackgroundColor}
        hasBorderRadius={hasBorderRadius}
        parallaxHeight={parallaxHeight}
        scrollHeight={scrollHeight}
        scrollValue={scrollValue}
        tabsContainerBackgroundColor={tabsContainerBackgroundColor}>
        <Foreground
          height={parallaxHeight}
          scrollValue={scrollValue}
          contentIcon={contentIcon}
          contentIconNumber={contentIconNumber}
          contentIconNumberStyle={contentIconNumberStyle}
          image={image}
          tag={tag}
          tagStyle={tagStyle}
          title={title}
          titleStyle={titleStyle}
        />
      </HeaderWrapper>
    );
  }, [
    backgroundColor,
    backgroundImage,
    contentBackgroundColor,
    contentIcon,
    contentIconNumber,
    contentIconNumberStyle,
    hasBorderRadius,
    image,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    tabsContainerBackgroundColor,
    tag,
    tagStyle,
    title,
    titleStyle,
  ]);

  return {
    headerTitleContainerAnimatedStyle,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollValue,
    scrollViewRef,
  };
}
