import type { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { useResponsiveSize } from '../../../hooks/useResponsiveSize';
import { useStickyHeaderFlashListScrollProps } from '../../../primitiveComponents/useStickyHeaderFlashListScrollProps';
import type { SharedPredefinedProps } from '../SharedProps';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePredefinedFlashListHeader<T extends FlashList<any>>(
  props: SharedPredefinedProps
) {
  const { height } = useWindowDimensions();
  const { responsiveHeight } = useResponsiveSize();

  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderFlashListScrollProps<T>(props);

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
