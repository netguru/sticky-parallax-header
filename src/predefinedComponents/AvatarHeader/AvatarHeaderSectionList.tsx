import * as React from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';

import type { AvatarHeaderSectionListProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarHeader } from './hooks/useAvatarHeader';

function AvatarHeaderSectionListInner<ItemT, SectionT>(
  props: AvatarHeaderSectionListProps<ItemT, SectionT>,
  ref: React.ForwardedRef<SectionList<ItemT, SectionT>>
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
    titleStyle,
    ...rest
  } = props;
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    renderHeader,
    scrollValue,
    scrollViewRef,
  } = useAvatarHeader<SectionList<ItemT, SectionT>>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

  return (
    <View style={[commonStyles.wrapper, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          height={parallaxHeight}
          leftTopIcon={leftTopIcon}
          leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
          leftTopIconOnPress={leftTopIconOnPress}
          leftTopIconTestID={leftTopIconTestID}
          rightTopIcon={rightTopIcon}
          rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
          rightTopIconOnPress={rightTopIconOnPress}
          rightTopIconTestID={rightTopIconTestID}
          scrollValue={scrollValue}
          title={title}
          titleStyle={titleStyle}
        />
      )}
      <View style={commonStyles.wrapper}>
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

type AvatarHeaderSectionListType = <ItemT, SectionT>(
  props: AvatarHeaderSectionListProps<ItemT, SectionT> &
    React.RefAttributes<SectionList<ItemT, SectionT>>
) => React.ReactElement;

export const AvatarHeaderSectionList = React.forwardRef(
  AvatarHeaderSectionListInner
) as AvatarHeaderSectionListType;
