import type { ForwardedRef, ReactElement, RefAttributes } from 'react';
import React, { forwardRef, useImperativeHandle } from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';

import type { TabbedHeaderListProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useTabbedHeaderList } from './useTabbedHeader';

function TabbedHeaderListInner<ItemT, SectionT>(
  props: TabbedHeaderListProps<ItemT, SectionT>,
  ref: ForwardedRef<SectionList<ItemT, SectionT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    decelerationRate = 'fast',
    logo,
    logoContainerStyle,
    logoResizeMode,
    logoStyle,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
    renderHeaderBar,
    renderSectionFooter,
    renderSectionHeader,
    scrollEventThrottle = 16,
    stickySectionHeadersEnabled = true,
    viewabilityConfig = { itemVisiblePercentThreshold: 50 },
    ...rest
  } = props;
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    onViewableItemsChanged,
    renderHeader,
    renderTabs,
    scrollViewRef,
  } = useTabbedHeaderList<ItemT, SectionT>(props);

  useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

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
        <StickyHeaderSectionList
          ref={scrollViewRef}
          {...rest}
          contentContainerStyle={contentContainerStyle}
          decelerationRate={decelerationRate}
          nestedScrollEnabled={nestedScrollEnabled}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={onScroll}
          overScrollMode={overScrollMode}
          onViewableItemsChanged={onViewableItemsChanged}
          renderHeader={renderHeader}
          renderSectionFooter={renderSectionFooter}
          renderSectionHeader={renderSectionHeader}
          renderTabs={renderTabs}
          scrollEventThrottle={scrollEventThrottle}
          stickySectionHeadersEnabled={stickySectionHeadersEnabled}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </View>
  );
}

type TabbedHeaderListType = <ItemT, SectionT>(
  props: TabbedHeaderListProps<ItemT, SectionT> & RefAttributes<SectionList<ItemT>>
) => ReactElement;

export const TabbedHeaderList = forwardRef(TabbedHeaderListInner) as TabbedHeaderListType;
