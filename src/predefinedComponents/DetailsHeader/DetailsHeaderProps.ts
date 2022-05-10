import type { ColorValue, ImageSourcePropType } from 'react-native';

import type {
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface DetailsHeaderSharedProps extends IconProps, SharedPredefinedProps {
  contentIcon?: ImageSourcePropType;
  contentIconNumber?: number;
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  tabsContainerBackgroundColor?: ColorValue;
  tag?: string;
  title?: string;
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
