import * as React from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';

import type { DetailsHeaderSectionListProps } from './DetailsHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useDetailsHeader } from './hooks/useDetailsHeader';

function DetailsHeaderSectionListInner<ItemT, SectionT>(
  props: DetailsHeaderSectionListProps<ItemT, SectionT>,
  ref: React.ForwardedRef<SectionList<ItemT, SectionT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    decelerationRate = 'fast',
    enableSafeAreaTopInset = true,
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
    titleStyle,
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

  React.useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

  return (
    <View style={[commonStyles.container, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          enableSafeAreaTopInset={enableSafeAreaTopInset}
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
          titleStyle={titleStyle}
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
    React.RefAttributes<SectionList<ItemT, SectionT>>
) => React.ReactElement;

export const DetailsHeaderSectionList = React.forwardRef(
  DetailsHeaderSectionListInner
) as DetailsHeaderSectionListType;
