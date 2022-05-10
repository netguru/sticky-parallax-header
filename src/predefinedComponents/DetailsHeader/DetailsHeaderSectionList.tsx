import type { ForwardedRef, ReactElement, RefAttributes } from 'react';
import React, { forwardRef, useImperativeHandle } from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';

import commonStyles from '../../constants/screenStyles';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';
import type { DetailsHeaderSectionListProps } from './DetailsHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useDetailsHeader } from './useDetailsHeader';

function DetailsHeaderSectionListInner<ItemT, SectionT>(
  props: DetailsHeaderSectionListProps<ItemT, SectionT>,
  ref: ForwardedRef<SectionList<ItemT, SectionT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    decelerationRate = 'fast',
    leftTopIcon,
    leftTopIconAccessibilityLabel,
    leftTopIconOnPress,
    leftTopIconTestID,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
    renderHeaderBar,
    renderSectionFooter,
    renderSectionHeader,
    rightTopIcon,
    rightTopIconAccessibilityLabel,
    rightTopIconOnPress,
    rightTopIconTestID,
    scrollEventThrottle = 16,
    sections,
    stickySectionHeadersEnabled = true,
    title,
    ...rest
  } = props;
  const {
    headerTitleContainerAnimatedStyle,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
    renderHeader,
    scrollViewRef,
  } = useDetailsHeader<SectionList<ItemT, SectionT>>(props);

  useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

  return (
    <View style={[commonStyles.container, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          headerTitleContainerAnimatedStyle={headerTitleContainerAnimatedStyle}
          leftTopIcon={leftTopIcon}
          leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
          leftTopIconOnPress={leftTopIconOnPress}
          leftTopIconTestID={leftTopIconTestID}
          rightTopIcon={rightTopIcon}
          rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
          rightTopIconOnPress={rightTopIconOnPress}
          rightTopIconTestID={rightTopIconTestID}
          title={title}
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
          onScroll={onScroll}
          onScrollEndDrag={onScrollEndDrag}
          overScrollMode={overScrollMode}
          renderHeader={renderHeader}
          renderSectionFooter={renderSectionFooter}
          renderSectionHeader={renderSectionHeader}
          scrollEventThrottle={scrollEventThrottle}
          sections={sections}
          stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        />
      </View>
    </View>
  );
}

type DetailsHeaderSectionListType = <ItemT, SectionT>(
  props: DetailsHeaderSectionListProps<ItemT, SectionT> &
    RefAttributes<SectionList<ItemT, SectionT>>
) => ReactElement;

export const DetailsHeaderSectionList = forwardRef(
  DetailsHeaderSectionListInner
) as DetailsHeaderSectionListType;
