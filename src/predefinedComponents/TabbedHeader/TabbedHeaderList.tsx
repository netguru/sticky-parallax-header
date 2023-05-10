import * as React from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';
import { parseAnimatedColorProp } from '../common/utils/parseAnimatedColorProp';

import type { TabbedHeaderListProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useTabbedHeaderList } from './hooks/useTabbedHeader';

function TabbedHeaderListInner<ItemT, SectionT>(
  props: TabbedHeaderListProps<ItemT, SectionT>,
  ref: React.ForwardedRef<SectionList<ItemT, SectionT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    decelerationRate = 'fast',
    enableSafeAreaTopInset = true,
    logo,
    logoContainerStyle,
    logoResizeMode,
    logoStyle,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
    renderHeader,
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
    renderHeader: defaultRenderHeader,
    renderTabs,
    scrollViewRef,
  } = useTabbedHeaderList<ItemT, SectionT>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: parseAnimatedColorProp(backgroundColor),
    };
  });

  return (
    <Animated.View style={[commonStyles.container, wrapperAnimatedStyle]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : logo ? (
        <HeaderBar
          backgroundColor={backgroundColor}
          enableSafeAreaTopInset={enableSafeAreaTopInset}
          logo={logo}
          logoContainerStyle={logoContainerStyle}
          logoResizeMode={logoResizeMode}
          logoStyle={logoStyle}
        />
      ) : (
        <SafeAreaView
          edges={['left', 'right', ...(enableSafeAreaTopInset ? ['top' as Edge] : [])]}
          style={commonStyles.stretch}
        />
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
          renderHeader={renderHeader ?? defaultRenderHeader}
          renderSectionFooter={renderSectionFooter}
          renderSectionHeader={renderSectionHeader}
          renderTabs={renderTabs}
          scrollEventThrottle={scrollEventThrottle}
          stickySectionHeadersEnabled={stickySectionHeadersEnabled}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </Animated.View>
  );
}

type TabbedHeaderListType = <ItemT, SectionT>(
  props: TabbedHeaderListProps<ItemT, SectionT> & React.RefAttributes<SectionList<ItemT>>
) => React.ReactElement;

export const TabbedHeaderList = React.forwardRef(TabbedHeaderListInner) as TabbedHeaderListType;
