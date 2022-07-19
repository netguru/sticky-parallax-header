import type { ReactChild, ReactFragment, ReactPortal, RefAttributes, RefObject } from 'react';
import type {
  FlatListProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  NativeScrollEvent,
  ScrollView,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type {
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { SharedPredefinedProps, TabsConfig } from '../common/SharedProps';

export interface PagerMethods {
  goToPage: (pageNumber: number) => void;
}

/** TODO: do not export it when exporting module's components and types */
export interface InternalPagerProps {
  initialPage?: number;
  minScrollHeight: number;
  onChangeTab?: (previousPage: number, newPage: number) => void;
  page: number;
  pageContainerStyle?: StyleProp<ViewStyle>;
  rememberTabScrollPosition?: boolean;
  scrollHeight: number;
  scrollRef: RefObject<ScrollView>;
  scrollValue: SharedValue<number>;
  swipedPage?: (index: number) => void;
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
  foregroundImage?: ImageSourcePropType;
  hasBorderRadius?: boolean;
  logo?: ImageSourcePropType;
  logoContainerStyle?: StyleProp<ViewStyle>;
  logoResizeMode?: ImageResizeMode;
  logoStyle?: StyleProp<ImageStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleTestID?: string;
}

export interface TabbedHeaderPagerProps
  extends TabbedHeaderSharedProps,
    StickyHeaderScrollViewProps {
  initialPage?: number;
  onChangeTab?: (prevPage: number, newPage: number) => void;
  pageContainerStyle?: StyleProp<ViewStyle>;
  pagerProps?: PagerProps & RefAttributes<PagerMethods>;
  rememberTabScrollPosition?: boolean;
}

export interface TabbedHeaderListProps<ItemT, SectionT>
  extends TabbedHeaderSharedProps,
    StickyHeaderSectionListProps<ItemT, SectionT> {}
