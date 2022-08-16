import type { ColorValue, ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

import type {
  StickyHeaderFlashListProps,
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface DetailsHeaderSharedProps extends IconProps, SharedPredefinedProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  contentIconNumberStyle?: StyleProp<TextStyle>;
  contentIconNumberTestID?: string;
  enableSafeAreaTopInset?: boolean;
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  tabsContainerBackgroundColor?: ColorValue;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  subtitleTestID?: string;
  tag?: string;
  tagStyle?: StyleProp<TextStyle>;
  tagTestID?: string;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
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
