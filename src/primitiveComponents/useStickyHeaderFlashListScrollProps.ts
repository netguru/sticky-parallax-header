import type { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';
import type { NativeScrollEvent } from 'react-native';
import { Platform } from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  useWorkletCallback,
} from 'react-native-reanimated';

import { useResponsiveSize } from '../hooks/useResponsiveSize';

import type { StickyHeaderSharedProps, StickyHeaderSnapProps } from './StickyHeaderProps';

const VELOCITY_THRESHOLD = 7;

// FIXME: unknown does not work here :/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStickyHeaderFlashListScrollProps<T extends FlashList<any> = FlashList<any>>(
  props: StickyHeaderSharedProps & StickyHeaderSnapProps
) {
  const { responsiveHeight } = useResponsiveSize();

  const {
    headerHeight = 100,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    onTopReached,
    parallaxHeight = responsiveHeight(53),
    snapStartThreshold,
    snapStopThreshold,
    snapToEdge = true,
  } = props;

  const scrollValue = useSharedValue(0);

  const scrollViewRef = useAnimatedRef<T>();

  const onTopReachedRef = useRef(onTopReached);
  const onTopReachedWasCalled = useRef(false);

  useEffect(() => {
    onTopReachedRef.current = onTopReached;
  }, [onTopReached]);

  function maybeTopReached(value: number) {
    if (value <= 0) {
      if (!onTopReachedWasCalled.current && onTopReachedRef.current) {
        onTopReachedRef.current();
        onTopReachedWasCalled.current = true;
      }
    } else {
      onTopReachedWasCalled.current = false;
    }
  }

  useAnimatedReaction(
    () => scrollValue.value,
    (value) => {
      runOnJS(maybeTopReached)(value);
    },
    [scrollValue]
  );

  const scrollHeight = Math.max(parallaxHeight, headerHeight * 2);

  const snapToTop = useCallback(() => {
    scrollViewRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [scrollViewRef]);

  const snapToBottom = useCallback(() => {
    scrollViewRef.current?.scrollToOffset({ animated: true, offset: scrollHeight });
  }, [scrollHeight, scrollViewRef]);

  const onSnapToEdge = useWorkletCallback(
    (e: NativeScrollEvent) => {
      const scrollToHeight = snapStopThreshold ?? scrollHeight;
      const snapToEdgeThreshold = snapStartThreshold ?? scrollHeight / 2;

      const currentVal = scrollValue.value;
      const velocity = e.velocity?.y ?? 0;

      const dragsToTop = velocity >= 0;
      const dragsToBottom = !dragsToTop;
      const dragsQuickToBottom = dragsToBottom && velocity <= -VELOCITY_THRESHOLD;
      const dragsQuickToTop = dragsToTop && velocity >= VELOCITY_THRESHOLD;

      const isUnderSnapToEdgeThresholdAndDragIsSlow =
        currentVal > 0 && currentVal < snapToEdgeThreshold && !dragsQuickToBottom;
      const isUnderSnapToEdgeThresholdAndDragIsQuick =
        currentVal >= snapToEdgeThreshold / 2 &&
        currentVal < snapToEdgeThreshold &&
        dragsQuickToBottom;
      const isOverSnapToEdgeThresholdAndDragIsSlow =
        currentVal >= snapToEdgeThreshold && currentVal < scrollToHeight && !dragsQuickToTop;
      const isOverSnapToEdgeThresholdAndDragIsQuick =
        currentVal >= snapToEdgeThreshold && currentVal < scrollToHeight / 2 && dragsQuickToTop;

      if (snapToEdge) {
        // TODO: when react-native-web will support onMomentumScrollEnd & onScrollEndDrag events
        // handle web snap scroll
        if (isUnderSnapToEdgeThresholdAndDragIsSlow || isOverSnapToEdgeThresholdAndDragIsQuick) {
          runOnJS(snapToTop)();
        } else if (
          isOverSnapToEdgeThresholdAndDragIsSlow ||
          isUnderSnapToEdgeThresholdAndDragIsQuick
        ) {
          runOnJS(snapToBottom)();
        }
      }
    },
    [
      snapStartThreshold,
      snapStopThreshold,
      snapToBottom,
      snapToTop,
      snapToEdge,
      scrollHeight,
      scrollValue,
    ]
  );

  const onMomentumScrollEndInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      onMomentumScrollEnd?.(e);
      onSnapToEdge(e);
    },
    [onMomentumScrollEnd, onSnapToEdge]
  );

  const onScrollEndDragInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      onScrollEndDrag?.(e);
      if (Platform.OS === 'android' || Math.abs(e.velocity?.y ?? 0) > 0) {
        return;
      }

      onSnapToEdge(e);
    },
    [onScrollEndDrag, onSnapToEdge]
  );

  const onScrollInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      scrollValue.value = e.contentOffset.y;
      onScroll?.(e);
    },
    [onScroll]
  );

  return {
    onMomentumScrollEnd: onMomentumScrollEndInternal,
    onScroll: onScrollInternal,
    onScrollEndDrag: onScrollEndDragInternal,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  };
}
