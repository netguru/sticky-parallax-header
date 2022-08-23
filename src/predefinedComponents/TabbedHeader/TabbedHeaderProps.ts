import type { ReactChild, ReactFragment, ReactPortal, RefAttributes } from 'react';
import type {
  FlatListProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  NativeScrollEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type Animated from 'react-native-reanimated';

import type {
  StickyHeaderFlashListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { SharedPredefinedProps, TabsConfig } from '../common/SharedProps';

export interface PagerMethods {
  goToPage: (pageNumber: number) => void;
}

export interface PagerProps
  extends Omit<
    FlatListProps<ReactChild | ReactFragment | ReactPortal>,
    | 'data'
    | 'horizontal'
    | 'keyExtractor'
    | 'onMomentumScrollBegin'
    | 'onMomentumScrollEnd'
    | 'onScroll'
    | 'onScrollBeginDrag'
    | 'onScrollEndDrag'
    | 'pagingEnabled'
    | 'renderItem'
  > {
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
}

export interface TabbedHeaderSharedProps extends SharedPredefinedProps, Partial<TabsConfig> {
  enableSafeAreaTopInset?: boolean;
  foregroundImage?: ImageSourcePropType;
  hasBorderRadius?: boolean;
  logo?: ImageSourcePropType;
  logoContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  logoResizeMode?: ImageResizeMode;
  logoStyle?: StyleProp<Animated.AnimateStyle<ImageStyle>>;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

export interface TabbedHeaderPagerProps
  extends TabbedHeaderSharedProps,
    StickyHeaderScrollViewProps {
  disableScrollToPosition?: boolean;
  initialPage?: number;
  onChangeTab?: (prevPage: number, newPage: number) => void;
  pageContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  pagerProps?: PagerProps & RefAttributes<PagerMethods>;
  rememberTabScrollPosition?: boolean;
}

export interface TabbedHeaderListProps<ItemT, SectionT>
  extends TabbedHeaderSharedProps,
    StickyHeaderSectionListProps<ItemT, SectionT> {}

export interface TabbedHeaderFlashListProps<ItemT>
  extends Omit<TabbedHeaderSharedProps, 'contentContainerStyle'>,
    StickyHeaderFlashListProps<ItemT> {}
