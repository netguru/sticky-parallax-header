import type { ImageSourcePropType, StyleProp, TextStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

import type {
  StickyHeaderFlashListProps,
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { AnimatedColorProp, IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface DetailsHeaderSharedProps extends IconProps, SharedPredefinedProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  contentIconNumberStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  contentIconNumberTestID?: string;
  enableSafeAreaTopInset?: boolean;
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  tabsContainerBackgroundColor?: AnimatedColorProp;
  subtitle?: string;
  subtitleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  subtitleTestID?: string;
  tag?: string;
  tagStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  tagTestID?: string;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

export interface DetailsHeaderScrollViewProps
  extends DetailsHeaderSharedProps,
    StickyHeaderScrollViewProps {}

export interface DetailsHeaderFlatListProps<ItemT>
  extends DetailsHeaderSharedProps,
    StickyHeaderFlatListProps<ItemT> {}

export interface DetailsHeaderSectionListProps<ItemT, SectionT>
  extends DetailsHeaderSharedProps,
    StickyHeaderSectionListProps<ItemT, SectionT> {}

export interface DetailsHeaderFlashListProps<ItemT>
  extends Omit<DetailsHeaderSharedProps, 'contentContainerStyle'>,
    StickyHeaderFlashListProps<ItemT> {}
