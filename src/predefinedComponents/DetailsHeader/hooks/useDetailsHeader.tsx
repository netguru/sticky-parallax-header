import * as React from 'react';
import { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import type { ScrollComponent } from '../../common/SharedProps';
import { HeaderWrapper } from '../../common/components/HeaderWrapper';
import { usePredefinedHeader } from '../../common/hooks/usePredefinedHeader';
import { scrollPosition } from '../../common/utils/scrollPosition';
import type { DetailsHeaderScrollViewProps } from '../DetailsHeaderProps';
import { Foreground } from '../components/HeaderForeground';

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
    contentIconNumberTestID,
    hasBorderRadius,
    image,
    subtitle,
    subtitleStyle,
    subtitleTestID,
    tabsContainerBackgroundColor,
    tag,
    tagStyle,
    tagTestID,
    title,
    titleStyle,
    titleTestID,
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
          contentIcon={contentIcon}
          contentIconNumber={contentIconNumber}
          contentIconNumberStyle={contentIconNumberStyle}
          contentIconNumberTestID={contentIconNumberTestID}
          image={image}
          subtitle={subtitle}
          subtitleStyle={subtitleStyle}
          subtitleTestID={subtitleTestID}
          tag={tag}
          tagStyle={tagStyle}
          tagTestID={tagTestID}
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
    contentIcon,
    contentIconNumber,
    contentIconNumberStyle,
    contentIconNumberTestID,
    hasBorderRadius,
    image,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    subtitle,
    subtitleStyle,
    subtitleTestID,
    tabsContainerBackgroundColor,
    tag,
    tagStyle,
    tagTestID,
    title,
    titleStyle,
    titleTestID,
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
