import type { ReactElement } from 'react';
import type {
  FlatListProps,
  LayoutChangeEvent,
  NativeScrollEvent,
  ScrollViewProps,
  SectionListData,
  SectionListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { AnimateProps } from 'react-native-reanimated';

export interface StickyHeaderSharedProps {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onHeaderLayout?: (e: LayoutChangeEvent) => void;
  /** worklet function */
  onMomentumScrollBegin?: (e: NativeScrollEvent) => void;
  /** worklet function */
  onMomentumScrollEnd?: (e: NativeScrollEvent) => void;
  /** worklet function */
  onScroll?: (e: NativeScrollEvent) => void;
  /** worklet function */
  onScrollBeginDrag?: (e: NativeScrollEvent) => void;
  /** worklet function */
  onScrollEndDrag?: (e: NativeScrollEvent) => void;
  onTabsLayout?: (e: LayoutChangeEvent) => void;
  renderHeader?: () => ReactElement | null;
  renderTabs?: () => ReactElement | null;
  style?: StyleProp<ViewStyle>;
}

export interface StickyHeaderSnapProps {
  headerHeight?: number;
  onTopReached?: () => void;
  parallaxHeight?: number;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  snapToEdge?: boolean;
}
export interface StickyHeaderScrollViewProps
  extends StickyHeaderSharedProps,
    Omit<
      AnimateProps<ScrollViewProps>,
      | 'contentContainerStyle'
      | 'onMomentumScrollBegin'
      | 'onMomentumScrollEnd'
      | 'onScroll'
      | 'onScrollBeginDrag'
      | 'onScrollEndDrag'
      | 'style'
    > {}

export interface StickyHeaderFlatListProps<ItemT>
  extends StickyHeaderSharedProps,
    Omit<
      AnimateProps<FlatListProps<ItemT>>,
      | 'contentContainerStyle'
      | 'data'
      | 'onMomentumScrollBegin'
      | 'onMomentumScrollEnd'
      | 'onScroll'
      | 'onScrollBeginDrag'
      | 'onScrollEndDrag'
      | 'style'
    > {
  data: ReadonlyArray<ItemT>;
}

export interface StickyHeaderSectionListProps<ItemT, SectionT>
  extends StickyHeaderSharedProps,
    Omit<
      AnimateProps<SectionListProps<ItemT, SectionT>>,
      | 'contentContainerStyle'
      | 'onMomentumScrollBegin'
      | 'onMomentumScrollEnd'
      | 'onScroll'
      | 'onScrollBeginDrag'
      | 'onScrollEndDrag'
      | 'sections'
      | 'style'
    > {
  sections: ReadonlyArray<SectionListData<ItemT, SectionT>>;
}
