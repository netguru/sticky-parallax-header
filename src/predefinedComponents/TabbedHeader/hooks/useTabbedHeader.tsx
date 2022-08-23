import * as React from 'react';
import type { NativeScrollEvent, ScrollView, SectionList, ViewToken } from 'react-native';
import { Platform } from 'react-native';
import { runOnJS, useSharedValue, useWorkletCallback } from 'react-native-reanimated';

import type { ScrollComponent } from '../../common/SharedProps';
import { HeaderWrapper } from '../../common/components/HeaderWrapper';
import { usePredefinedHeader } from '../../common/hooks/usePredefinedHeader';
import { debounce } from '../../common/utils/debounce';
import type { TabbedHeaderListProps, TabbedHeaderPagerProps } from '../TabbedHeaderProps';
import { Foreground } from '../components/HeaderForeground';

import { useRenderTabs } from './useRenderTabs';

function useRenderHeader<T extends ScrollComponent>(props: TabbedHeaderPagerProps) {
  const {
    contentBackgroundColor,
    innerScrollHeight,
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
    foregroundImage,
    hasBorderRadius,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
  } = props;
  const horizontalScrollValue = useSharedValue(0);
  const onHorizontalPagerScroll = useWorkletCallback((e: NativeScrollEvent) => {
    horizontalScrollValue.value = e.contentOffset.x;
  }, []);

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
          foregroundImage={foregroundImage}
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
    foregroundImage,
    hasBorderRadius,
    parallaxHeight,
    scrollHeight,
    scrollValue,
    tabsContainerBackgroundColor,
    title,
    titleStyle,
    titleTestID,
  ]);

  return {
    innerScrollHeight,
    horizontalScrollValue,
    onHorizontalPagerScroll,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  };
}

export function useTabbedHeaderPager(props: TabbedHeaderPagerProps) {
  const {
    innerScrollHeight,
    horizontalScrollValue,
    onHorizontalPagerScroll,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useRenderHeader<ScrollView>(props);
  const { backgroundColor, initialPage, tabsContainerBackgroundColor } = props;
  const [currentPage, setCurrentPage] = React.useState(initialPage ?? 0);

  const goToPage = React.useCallback((pageNumber: number) => {
    setCurrentPage((prev) => {
      if (prev !== pageNumber) {
        return pageNumber;
      }

      return prev;
    });
  }, []);

  const renderTabs = useRenderTabs({
    ...props,
    activeTab: currentPage,
    horizontalScrollValue,
    onTabPressed: goToPage,
    tabsContainerBackgroundColor: tabsContainerBackgroundColor ?? backgroundColor,
  });

  return {
    currentPage,
    goToPage,
    innerScrollHeight,
    onHorizontalPagerScroll,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    renderTabs,
    scrollHeight,
    scrollValue,
    scrollViewRef,
    setCurrentPage,
  };
}

export function useTabbedHeaderList<
  ItemT,
  SectionT,
  T extends SectionList<ItemT, SectionT> = SectionList<ItemT, SectionT>
>(props: TabbedHeaderListProps<ItemT, SectionT>) {
  const ignoreViewabilityItemsChangedEvent = useSharedValue(false);
  const {
    innerScrollHeight,
    horizontalScrollValue,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollValue,
    scrollViewRef,
  } = useRenderHeader<T>(props);
  const onMomentumScrollEndInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      ignoreViewabilityItemsChangedEvent.value = false;
      onMomentumScrollEnd?.(e);
    },
    [onMomentumScrollEnd]
  );
  const debouncedIgnoreViewabilityItemsChangedCallback = debounce(() => {
    ignoreViewabilityItemsChangedEvent.value = false;
  }, 100);
  const onScrollInternal = useWorkletCallback(
    (e: NativeScrollEvent) => {
      if (Platform.OS === 'web') {
        // On web there is no onMomentumScrollEnd
        runOnJS(debouncedIgnoreViewabilityItemsChangedCallback)();
      }

      onScroll?.(e);
    },
    [onScroll]
  );

  const { backgroundColor, sections, tabsContainerBackgroundColor } = props;

  const [activeSection, setActiveSection] = React.useState(0);

  const goToSection = React.useCallback((sectionIndex: number) => {
    ignoreViewabilityItemsChangedEvent.value = true;
    scrollViewRef.current?.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex,
      viewPosition: 0,
    });
    setActiveSection(sectionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (!viewableItems.length || ignoreViewabilityItemsChangedEvent.value) {
        return;
      }

      const newActiveSection = sections.findIndex(
        (section) => section.key === viewableItems[0].section?.key
      );

      if (newActiveSection !== -1) {
        setActiveSection(newActiveSection);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sections]
  );

  const renderTabs = useRenderTabs({
    ...props,
    activeTab: activeSection,
    horizontalScrollValue,
    onTabPressed: goToSection,
    tabsContainerBackgroundColor: tabsContainerBackgroundColor ?? backgroundColor,
  });

  return {
    goToSection,
    innerScrollHeight,
    onMomentumScrollEnd: onMomentumScrollEndInternal,
    onScroll: onScrollInternal,
    onScrollEndDrag,
    onViewableItemsChanged,
    renderHeader,
    renderTabs,
    scrollValue,
    scrollViewRef,
  };
}
