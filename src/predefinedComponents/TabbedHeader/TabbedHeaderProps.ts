import type { RefAttributes } from 'react';
import type {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  NativeScrollEvent,
  ScrollViewProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type {
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { SharedPredefinedProps, TabsConfig } from '../common/SharedProps';

export interface PagerMethods {
  goToPage: (pageNumber: number) => void;
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
}

export interface TabbedHeaderPagerProps
  extends TabbedHeaderSharedProps,
    StickyHeaderScrollViewProps {
  initialPage?: number;
  /**
   * Set the number of pages that should be retained to either side of the currently visible page(s).
   * Pages beyond this limit will be recreated when needed.
   * Defaults to 1.
   * The given value must be larger than 0.
   */
  offscreenPageLimit?: number;
  onChangeTab?: (prevPage: number, newPage: number) => void;
  pagerProps?: Omit<
    ScrollViewProps,
    | 'horizontal'
    | 'pagingEnabled'
    | 'onMomentumScrollBegin'
    | 'onMomentumScrollEnd'
    | 'onScroll'
    | 'onScrollBeginDrag'
    | 'onScrollEndDrag'
  > & {
    onMomentumScrollBegin?: (e: NativeScrollEvent) => void;
    onMomentumScrollEnd?: (e: NativeScrollEvent) => void;
    onScroll?: (e: NativeScrollEvent) => void;
    onScrollBeginDrag?: (e: NativeScrollEvent) => void;
    onScrollEndDrag?: (e: NativeScrollEvent) => void;
  } & RefAttributes<PagerMethods>;
  rememberTabScrollPosition?: boolean;
}

export interface TabbedHeaderListProps<ItemT, SectionT>
  extends TabbedHeaderSharedProps,
    StickyHeaderSectionListProps<ItemT, SectionT> {}
