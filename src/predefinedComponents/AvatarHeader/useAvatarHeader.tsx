import React, { useCallback } from 'react';

import type { ScrollComponent } from '../common/SharedProps';
import { HeaderWrapper } from '../common/components/HeaderWrapper';
import { usePredefinedHeader } from '../common/hooks/usePredefinedHeader';

import type { AvatarHeaderScrollViewProps } from './AvatarHeaderProps';
import { Foreground } from './components/HeaderForeground';

export function useAvatarHeader<T extends ScrollComponent>(props: AvatarHeaderScrollViewProps) {
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
    hasBorderRadius,
    image,
    subtitle,
    tabsContainerBackgroundColor,
    title,
  } = props;

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
          image={image}
          subtitle={subtitle}
          title={title}
        />
      </HeaderWrapper>
    );
  }, [
    backgroundColor,
    backgroundImage,
    contentBackgroundColor,
    hasBorderRadius,
    image,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    subtitle,
    tabsContainerBackgroundColor,
    title,
  ]);

  return {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    renderHeader,
    scrollValue,
    scrollViewRef,
  };
}
