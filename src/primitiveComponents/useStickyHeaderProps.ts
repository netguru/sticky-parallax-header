import { useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type {
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from './StickyHeaderProps';

export function useStickyHeaderProps(
  props:
    | StickyHeaderFlatListProps<unknown>
    | StickyHeaderScrollViewProps
    | StickyHeaderSectionListProps<unknown, unknown>
) {
  const {
    contentContainerStyle,
    onHeaderLayout,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onTabsLayout,
    stickyTabs = true,
    style,
  } = props;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);

  const scrollValue = useSharedValue(0);

  function onHeaderLayoutInternal(e: LayoutChangeEvent) {
    setHeaderHeight(e.nativeEvent.layout.height);
    onHeaderLayout?.(e);
  }

  function onTabsLayoutInternal(e: LayoutChangeEvent) {
    setTabsHeight(e.nativeEvent.layout.height);
    onTabsLayout?.(e);
  }

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      onScrollBeginDrag?.(e);
    },
    onEndDrag: (e) => {
      onScrollEndDrag?.(e);
    },
    onMomentumBegin: (e) => {
      onMomentumScrollBegin?.(e);
    },
    onMomentumEnd: (e) => {
      onMomentumScrollEnd?.(e);
    },
    onScroll: (e) => {
      scrollValue.value = e.contentOffset.y;
      onScroll?.(e);
    },
  });

  const contentContainerPaddingTop = useMemo(() => {
    const paddingTop = StyleSheet.flatten(contentContainerStyle)?.paddingTop;

    if (typeof paddingTop === 'number') {
      return paddingTop;
    }

    // We do not support string values
    return 0;
  }, [contentContainerStyle]);

  const contentContainerPaddingBottom = useMemo(() => {
    const paddingBottom = StyleSheet.flatten(contentContainerStyle)?.paddingBottom;

    if (typeof paddingBottom === 'number') {
      return paddingBottom;
    }

    // We do not support string values
    return 0;
  }, [contentContainerStyle]);

  const listPaddingTop = useMemo(() => {
    const paddingTop = StyleSheet.flatten(style)?.paddingTop;

    if (typeof paddingTop === 'number') {
      return paddingTop;
    }

    // We do not support string values
    return 0;
  }, [style]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollValue.value,
            [0, headerHeight],
            [0, -headerHeight],
            stickyTabs ? Extrapolate.CLAMP : Extrapolate.EXTEND
          ),
        },
      ],
    };
  }, [scrollValue, headerHeight, stickyTabs]);

  return {
    contentContainerPaddingTop,
    contentContainerPaddingBottom,
    headerAnimatedStyle,
    headerHeight,
    listPaddingTop,
    onHeaderLayoutInternal,
    onTabsLayoutInternal,
    scrollHandler,
    tabsHeight,
  };
}
