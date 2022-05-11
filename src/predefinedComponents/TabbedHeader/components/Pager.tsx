import type { ReactNode, RefObject } from 'react';
import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { LayoutChangeEvent, ScrollView } from 'react-native';
import { Dimensions, I18nManager, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  runOnJS,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import commonStyles from '../../../constants/screenStyles';
import { DelayedFreeze } from '../../common/components/DelayedFreeze';
import type { InternalPagerProps, PagerMethods, PagerProps } from '../TabbedHeaderProps';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

const DEFAULT_OFFSCREEN_PAGE_LIMIT = 1;
const SCROLL_TO_PAGE_OFFSET_TIMEOUT = 250;

export const Pager = forwardRef<PagerMethods, PagerProps & InternalPagerProps>(
  (
    {
      automaticallyAdjustContentInsets = false,
      children,
      contentContainerStyle,
      contentOffset: _contentOffset,
      directionalLockEnabled = true,
      initialPage = 0,
      keyboardDismissMode = 'on-drag',
      minScrollHeight,
      offscreenPageLimit = DEFAULT_OFFSCREEN_PAGE_LIMIT,
      onChangeTab,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      page = -1,
      pageContainerStyle,
      rememberTabScrollPosition,
      scrollEventThrottle = 16,
      scrollHeight,
      scrollRef,
      scrollValue,
      scrollsToTop = false,
      showsHorizontalScrollIndicator = false,
      swipedPage,
      ...rest
    },
    ref
  ) => {
    const [containerWidth, setContainerWidth] = useState(() => Dimensions.get('window').width);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const horizontalScrollViewRef = useAnimatedRef<ScrollView>();
    const horizontalScrollValue = useSharedValue(initialPage * Dimensions.get('window').width);

    const scrollToTabPositionTimeoutValue = useSharedValue(1);

    const data = useMemo(() => {
      return Children.toArray(children);
    }, [children]);

    const tabsScrollPosition = useRef<number[]>(Array(data.length).fill(-1));

    const goToPageAnimationFrame = useRef<ReturnType<typeof requestAnimationFrame>>();

    const isInverted = Platform.OS === 'android' ? I18nManager.isRTL : undefined;

    const offscreenPageLimitValidated = useMemo(() => {
      return offscreenPageLimit >= DEFAULT_OFFSCREEN_PAGE_LIMIT
        ? offscreenPageLimit
        : DEFAULT_OFFSCREEN_PAGE_LIMIT;
    }, [offscreenPageLimit]);

    useEffect(() => {
      /**
       * Scroll to make first rendered tab visible (if not used, sometimes when Pager is first rendered, it has blank first tab)
       */
      function scrollOnePxAndBack() {
        'worklet';
        scrollTo(horizontalScrollViewRef, 0, 1, true);
        scrollTo(horizontalScrollViewRef, 0, 0, true);
      }

      runOnUI(scrollOnePxAndBack)();

      return () => {
        cancelAnimation(scrollToTabPositionTimeoutValue);
        if (goToPageAnimationFrame.current) {
          cancelAnimationFrame(goToPageAnimationFrame.current);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (page !== currentPage && page >= 0) {
        goToPage(page);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    function onContainerLayout(e: LayoutChangeEvent) {
      const { width } = e.nativeEvent.layout;

      if (!width || width <= 0 || Math.round(width) === Math.round(containerWidth)) {
        return;
      }

      setContainerWidth(width);
      goToPageAnimationFrame.current = requestAnimationFrame(() => {
        goToPage(currentPage);
      });
    }

    function scrollToPage(offset: number) {
      'worklet';
      scrollTo(horizontalScrollViewRef, offset, 0, true);
    }

    function scrollToTabPosition(position: number) {
      'worklet';
      scrollTo(scrollRef, 0, position, true);
    }

    function goToPage(pageNumber: number) {
      const offset = pageNumber * containerWidth;

      handleScrollToTabPosition(currentPage, pageNumber);
      runOnUI(scrollToPage)(offset);

      setCurrentPage(page);
      onChangeTab?.(currentPage, pageNumber);
    }

    function handleScrollToTabPosition(prevPage: number, newPage: number) {
      if (!data.length || scrollValue.value === 0) {
        return;
      }

      tabsScrollPosition.current[prevPage] = scrollValue.value;
      const scrollTargetPosition =
        rememberTabScrollPosition && tabsScrollPosition.current[newPage] !== -1
          ? tabsScrollPosition.current[newPage]
          : scrollHeight;

      scrollToTabPositionTimeoutValue.value = withDelay(
        SCROLL_TO_PAGE_OFFSET_TIMEOUT,
        withTiming(
          scrollToTabPositionTimeoutValue.value * -1,
          {
            duration: 0,
          },
          () => {
            'worklet';
            scrollToTabPosition(scrollTargetPosition);
          }
        )
      );
    }

    function handlePossiblePageChange(newPage: number) {
      if (currentPage !== newPage) {
        swipedPage?.(newPage);
        onChangeTab?.(currentPage, newPage);
        setCurrentPage(newPage);
        handleScrollToTabPosition(currentPage, newPage);
      }
    }

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (e) => {
        horizontalScrollValue.value = e.contentOffset.x;
        onScroll?.(e);
      },
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
        const offsetX = e.contentOffset.x;
        const newPage = Math.round(offsetX / containerWidth);

        runOnJS(handlePossiblePageChange)(newPage);
      },
    });

    useImperativeHandle(ref, () => ({ goToPage }));

    const renderItem = useCallback(
      (child: ReactNode, idx: number) => {
        return (
          <DelayedFreeze
            freeze={
              ![idx - offscreenPageLimitValidated, idx, idx + offscreenPageLimitValidated].includes(
                currentPage
              )
            }
            key={idx}
            containerWidth={containerWidth}>
            <View
              style={[
                isInverted && styles.inversionStyle,
                // used to calculate current height of scroll
                {
                  width: containerWidth,
                  minHeight: minScrollHeight,
                  maxHeight: idx === currentPage ? undefined : minScrollHeight,
                },
                pageContainerStyle,
              ]}>
              {child}
            </View>
          </DelayedFreeze>
        );
      },
      [
        containerWidth,
        currentPage,
        isInverted,
        minScrollHeight,
        offscreenPageLimitValidated,
        pageContainerStyle,
      ]
    );

    return (
      <View style={styles.container} onLayout={onContainerLayout}>
        <Animated.ScrollView
          ref={horizontalScrollViewRef as unknown as RefObject<Animated.ScrollView>}
          {...rest}
          automaticallyAdjustContentInsets={automaticallyAdjustContentInsets}
          contentContainerStyle={[
            Platform.OS === 'android'
              ? I18nManager.isRTL
                ? commonStyles.rowReverse
                : commonStyles.row
              : null,
            { minHeight: minScrollHeight },
            contentContainerStyle,
          ]}
          contentOffset={{ x: initialPage * containerWidth, y: 0 }}
          directionalLockEnabled={directionalLockEnabled}
          horizontal
          keyboardDismissMode={keyboardDismissMode}
          onScroll={scrollHandler}
          /**
           * Workaround for reanimated v2.3+ bug
           *
           * https://github.com/software-mansion/react-native-reanimated/issues/2735#issuecomment-1001714779
           */
          onMomentumScrollBegin={NOOP}
          onMomentumScrollEnd={NOOP}
          onScrollBeginDrag={NOOP}
          onScrollEndDrag={NOOP}
          pagingEnabled
          scrollEventThrottle={scrollEventThrottle}
          scrollsToTop={scrollsToTop}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          style={[isInverted && styles.inversionStyle]}>
          {data.map(renderItem)}
        </Animated.ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inversionStyle: {
    transform: [{ scaleX: -1 }],
  },
});
