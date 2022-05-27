import type { ColorValue, ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

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
  subtitleStyle?: StyleProp<TextStyle>;
  tabsContainerBackgroundColor?: ColorValue;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
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
