import type { FlashList, FlashListProps } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import type { StickyHeaderFlashListProps } from '../../primitiveComponents/StickyHeaderProps';
import { withStickyHeaderFlashList } from '../../primitiveComponents/withStickyHeaderFlashList';

import type { TabbedHeaderFlashListProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useTabbedFlashListHeader } from './hooks/useTabbedFlashListHeader';

export function withTabbedHeaderFlashList<ItemT>(
  flashListComponent: React.ComponentType<FlashListProps<ItemT>>
) {
  const StickyHeaderFlashList = withStickyHeaderFlashList(
    flashListComponent as React.ComponentType<FlashListProps<ItemT>>
  ) as (
    props: StickyHeaderFlashListProps<ItemT> & React.RefAttributes<FlashList<ItemT>>
  ) => React.ReactElement;

  return React.forwardRef<FlashList<ItemT>, TabbedHeaderFlashListProps<ItemT>>((props, ref) => {
    const {
      backgroundColor,
      decelerationRate = 'fast',
      logo,
      logoContainerStyle,
      logoResizeMode,
      logoStyle,
      nestedScrollEnabled = true,
      overScrollMode = 'never',
      renderHeaderBar,
      scrollEventThrottle = 16,
      viewabilityConfig = { itemVisiblePercentThreshold: 50 },
      ...rest
    } = props;
    const {
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      onTabsLayout,
      onViewableItemsChanged,
      renderHeader,
      renderTabs,
      scrollViewRef,
    } = useTabbedFlashListHeader<ItemT>(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as FlashList<ItemT>);

    return (
      <View style={[commonStyles.container, { backgroundColor }]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : logo ? (
          <HeaderBar
            backgroundColor={backgroundColor}
            logo={logo}
            logoContainerStyle={logoContainerStyle}
            logoResizeMode={logoResizeMode}
            logoStyle={logoStyle}
          />
        ) : (
          <SafeAreaView edges={['left', 'top', 'right']} style={commonStyles.stretch} />
        )}
        <View style={commonStyles.container}>
          <StickyHeaderFlashList
            ref={scrollViewRef}
            {...rest}
            decelerationRate={decelerationRate}
            nestedScrollEnabled={nestedScrollEnabled}
            overScrollMode={overScrollMode}
            scrollEventThrottle={scrollEventThrottle}
            viewabilityConfig={viewabilityConfig}
            renderHeader={renderHeader}
            renderTabs={renderTabs}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onTabsLayout={onTabsLayout}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
      </View>
    );
  });
}
