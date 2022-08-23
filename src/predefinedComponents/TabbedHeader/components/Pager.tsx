import * as React from 'react';
import type { FlatListProps, LayoutChangeEvent, ListRenderItemInfo } from 'react-native';
import { Dimensions, FlatList, I18nManager, Platform, StyleSheet, View } from 'react-native';
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

import { commonStyles } from '../../../constants';
import { debounce } from '../../common/utils/debounce';
import type { InternalPagerProps } from '../InternalTabbedHeaderProps';
import type { PagerMethods, PagerProps } from '../TabbedHeaderProps';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

const SCROLL_TO_PAGE_OFFSET_TIMEOUT = 250;

type Page = React.ReactChild | React.ReactFragment | React.ReactPortal;

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<Page>>(FlatList);

export const Pager = React.forwardRef<PagerMethods, PagerProps & InternalPagerProps>(
  (
    {
      automaticallyAdjustContentInsets = false,
      children,
      contentContainerStyle,
      contentOffset: _contentOffset,
      directionalLockEnabled = true,
      disableScrollToPosition,
      initialPage = 0,
      keyboardDismissMode = 'on-drag',
      minScrollHeight,
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
    const [containerWidth, setContainerWidth] = React.useState(
      () => Dimensions.get('window').width
    );
    const containerWidthRef = React.useRef(containerWidth);
    const [currentPage, setCurrentPage] = React.useState(initialPage);
    const currentPageRef = React.useRef(currentPage);
    const horizontalFlatListRef = useAnimatedRef<FlatList>();
    const horizontalScrollValue = useSharedValue(initialPage * Dimensions.get('window').width);

    const scrollToTabPositionTimeoutValue = useSharedValue(1);

    const data = React.useMemo(() => {
      return React.Children.toArray(children);
    }, [children]);

    const tabsScrollPosition = React.useRef<number[]>(Array(data.length).fill(-1));

    const goToPageAnimationFrame = React.useRef<ReturnType<typeof requestAnimationFrame>>();

    const isInvertedAndroid = Platform.OS === 'android' ? I18nManager.isRTL : undefined;

    React.useEffect(() => {
      /**
       * Scroll to make first rendered tab visible (if not used, sometimes when Pager is first rendered, it has blank first tab)
       */
      horizontalFlatListRef.current?.scrollToOffset({ offset: 1, animated: true });
      horizontalFlatListRef.current?.scrollToOffset({ offset: 0, animated: true });

      return () => {
        cancelAnimation(scrollToTabPositionTimeoutValue);
        if (goToPageAnimationFrame.current) {
          cancelAnimationFrame(goToPageAnimationFrame.current);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (page !== currentPageRef.current && page >= 0) {
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
      containerWidthRef.current = width;
      goToPageAnimationFrame.current = requestAnimationFrame(() => {
        goToPage(currentPage);
      });
    }

    function scrollToPage(offset: number) {
      'worklet';
      if (Platform.OS === 'web') {
        horizontalFlatListRef.current?.scrollToOffset({ offset, animated: true });

        return;
      }

      scrollTo(horizontalFlatListRef, offset, 0, true);
    }

    function scrollToTabPosition(position: number) {
      'worklet';
      if (Platform.OS === 'web') {
        scrollRef.current?.scrollTo({ x: 0, y: position, animated: true });

        return;
      }

      scrollTo(scrollRef, 0, position, true);
    }

    function goToPage(pageNumber: number) {
      const offset = pageNumber * containerWidthRef.current;

      handleScrollToTabPosition(currentPage, pageNumber);
      runOnUI(scrollToPage)(offset);

      setCurrentPage(page);
      currentPageRef.current = page;
      onChangeTab?.(currentPage, pageNumber);
    }

    function handleScrollToTabPosition(prevPage: number, newPage: number) {
      if (!data.length || scrollValue.value === 0 || disableScrollToPosition) {
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

    function handlePossiblePageChange(offsetX: number) {
      const newPage = Math.round(offsetX / containerWidthRef.current);

      if (currentPage !== newPage) {
        swipedPage?.(newPage);
        onChangeTab?.(currentPage, newPage);
        setCurrentPage(newPage);
        handleScrollToTabPosition(currentPage, newPage);
      }
    }

    const handlePossiblePageChangeOnWeb = debounce((offsetX: number) => {
      const newPage = Math.round(offsetX / containerWidthRef.current);

      if (currentPageRef.current !== newPage) {
        const prevPage = currentPageRef.current;

        swipedPage?.(newPage);
        onChangeTab?.(prevPage, newPage);
        setCurrentPage(newPage);
        handleScrollToTabPosition(prevPage, newPage);
        currentPageRef.current = newPage;
      }
    }, 100);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (e) => {
        horizontalScrollValue.value = e.contentOffset.x;
        onScroll?.(e);
        if (Platform.OS === 'web') {
          // On web there is no onMomentumScrollEnd
          const offsetX = e.contentOffset.x;

          runOnJS(handlePossiblePageChangeOnWeb)(offsetX);
        }
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

        runOnJS(handlePossiblePageChange)(offsetX);
      },
    });

    React.useImperativeHandle(ref, () => ({ goToPage }));

    const renderItem = React.useCallback(
      ({ item }: ListRenderItemInfo<Page>) => {
        return (
          <Animated.View
            style={[
              isInvertedAndroid && styles.inversionStyle,
              // used to calculate current height of scroll
              {
                width: containerWidth,
              },
              pageContainerStyle,
            ]}>
            {item}
          </Animated.View>
        );
      },
      [containerWidth, isInvertedAndroid, pageContainerStyle]
    );

    return (
      <View style={styles.container} onLayout={onContainerLayout}>
        <AnimatedFlatList
          ref={horizontalFlatListRef as unknown as React.RefObject<Animated.FlatList<Page>>}
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
          data={data}
          directionalLockEnabled={directionalLockEnabled}
          horizontal
          keyExtractor={(_, i) => `${i}`}
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
          renderItem={renderItem}
          scrollEventThrottle={scrollEventThrottle}
          scrollsToTop={scrollsToTop}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          style={[isInvertedAndroid && styles.inversionStyle]}
        />
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
