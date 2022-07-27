import type { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { HeaderWrapper } from '../../common/components/HeaderWrapper';
import { usePredefinedFlashListHeader } from '../../common/hooks/usePredefinedFlashListHeader';
import type { AvatarHeaderFlashListProps } from '../AvatarHeaderProps';
import { Foreground } from '../components/HeaderForeground';

export function useAvatarFlashListHeader<ItemT, T extends FlashList<ItemT> = FlashList<ItemT>>(
  props: AvatarHeaderFlashListProps<ItemT>
) {
  const {
    contentBackgroundColor,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = usePredefinedFlashListHeader<T>(props);
  const {
    backgroundColor,
    backgroundImage,
    hasBorderRadius,
    image,
    subtitle,
    subtitleStyle,
    subtitleTestID,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
  } = props;

  const renderHeader = React.useCallback(() => {
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
          subtitleStyle={subtitleStyle}
          subtitleTestID={subtitleTestID}
          title={title}
          titleStyle={titleStyle}
          titleTestID={titleTestID}
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
    subtitleStyle,
    subtitleTestID,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
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
