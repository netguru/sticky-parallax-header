import type { ColorValue, ImageSourcePropType } from 'react-native';

import type {
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface AvatarHeaderSharedProps extends IconProps, SharedPredefinedProps {
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  subtitle?: string;
  tabsContainerBackgroundColor?: ColorValue;
  title?: string;
}

export interface AvatarHeaderScrollViewProps
  extends AvatarHeaderSharedProps,
    StickyHeaderScrollViewProps {}

export interface AvatarHeaderFlatListProps<ItemT>
  extends AvatarHeaderSharedProps,
    StickyHeaderFlatListProps<ItemT> {}

export interface AvatarHeaderSectionListProps<ItemT, SectionT>
  extends AvatarHeaderSharedProps,
    StickyHeaderSectionListProps<ItemT, SectionT> {}
