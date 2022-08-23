/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FlashList, ViewToken } from '@shopify/flash-list';
import * as React from 'react';
import type { NativeScrollEvent } from 'react-native';
import { Platform } from 'react-native';
import { runOnJS, useSharedValue, useWorkletCallback } from 'react-native-reanimated';

import { HeaderWrapper } from '../../common/components/HeaderWrapper';
import { usePredefinedFlashListHeader } from '../../common/hooks/usePredefinedFlashListHeader';
import { debounce } from '../../common/utils/debounce';
import { isNotEmpty } from '../../common/utils/isNotEmpty';
import type { TabbedHeaderFlashListProps } from '../TabbedHeaderProps';
import { Foreground } from '../components/HeaderForeground';

import { useRenderTabs } from './useRenderTabs';

function useRenderFlashListHeader<T extends FlashList<any>>(
  props: TabbedHeaderFlashListProps<any>
) {
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
  } = usePredefinedFlashListHeader<T>(props);
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

export function useTabbedFlashListHeader<ItemT, T extends FlashList<ItemT> = FlashList<ItemT>>(
  props: TabbedHeaderFlashListProps<ItemT>
) {
  const {
    innerScrollHeight,
    horizontalScrollValue,
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    renderHeader,
    scrollValue,
    scrollViewRef,
  } = useRenderFlashListHeader<T>(props);
  const { stickyHeaderIndices = [], backgroundColor, tabsContainerBackgroundColor } = props;
  const [activeSection, setActiveSection] = React.useState(0);
  const ignoreViewabilityItemsChangedEvent = useSharedValue(false);
  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (
        !viewableItems.length ||
        ignoreViewabilityItemsChangedEvent.value ||
        !isNotEmpty(viewableItems[0].index)
      ) {
        return;
      }

      let newActiveSection: number | undefined;

      for (let i = 0; i < stickyHeaderIndices.length; i++) {
        const firstIdx = stickyHeaderIndices[i];

        if (i === stickyHeaderIndices.length - 1) {
          if (viewableItems[0].index >= firstIdx) {
            newActiveSection = i;
            i = stickyHeaderIndices.length;
          }
        } else {
          const secondIdx = stickyHeaderIndices[i + 1];

          if (viewableItems[0].index >= firstIdx && viewableItems[0].index < secondIdx) {
            newActiveSection = i;
            i = stickyHeaderIndices.length;
          }
        }
      }

      if (typeof newActiveSection === 'number') {
        setActiveSection(newActiveSection);
      }
    },
    [ignoreViewabilityItemsChangedEvent, stickyHeaderIndices]
  );
  const goToSection = React.useCallback(
    (sectionIndex: number) => {
      ignoreViewabilityItemsChangedEvent.value = true;
      scrollViewRef.current?.scrollToIndex({
        animated: true,
        index: stickyHeaderIndices[sectionIndex],
        viewPosition: 0,
        viewOffset: 0,
      });
      setActiveSection(sectionIndex);
    },
    [ignoreViewabilityItemsChangedEvent, scrollViewRef, stickyHeaderIndices]
  );
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
