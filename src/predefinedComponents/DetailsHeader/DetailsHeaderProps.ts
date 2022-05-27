import type { ColorValue, ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

import type {
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface DetailsHeaderSharedProps extends IconProps, SharedPredefinedProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  contentIconNumberStyle?: StyleProp<TextStyle>;
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  tabsContainerBackgroundColor?: ColorValue;
  tag?: string;
  tagStyle?: StyleProp<TextStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
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
