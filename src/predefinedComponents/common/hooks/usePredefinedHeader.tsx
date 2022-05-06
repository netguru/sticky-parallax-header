import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useStickyHeaderScrollProps } from '../../../primitiveComponents/useStickyHeaderScrollProps';
import type { ScrollComponent, SharedPredefinedProps } from '../SharedProps';

export function usePredefinedHeader<T extends ScrollComponent>(props: SharedPredefinedProps) {
  const { height } = useWindowDimensions();
  const { responsiveHeight } = useResponsiveSize();

  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps<T>(props);

  const {
    contentContainerStyle,
    headerHeight = 100,
    parallaxHeight = responsiveHeight(53),
  } = props;

  const innerScrollHeight = height - headerHeight - parallaxHeight;

  const { contentBackgroundColor } = useMemo(() => {
    const contentContainerFlattenedStyle = StyleSheet.flatten(contentContainerStyle);

    return { contentBackgroundColor: contentContainerFlattenedStyle?.backgroundColor };
  }, [contentContainerStyle]);

  return {
    contentBackgroundColor,
    innerScrollHeight,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  };
}
