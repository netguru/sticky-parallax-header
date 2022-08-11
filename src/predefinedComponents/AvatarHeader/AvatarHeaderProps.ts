import type { ColorValue, ImageSourcePropType, StyleProp, TextStyle } from 'react-native';

import type {
  StickyHeaderFlashListProps,
  StickyHeaderFlatListProps,
  StickyHeaderScrollViewProps,
  StickyHeaderSectionListProps,
} from '../../primitiveComponents/StickyHeaderProps';
import type { IconProps, SharedPredefinedProps } from '../common/SharedProps';

export interface AvatarHeaderSharedProps extends IconProps, SharedPredefinedProps {
  enableSafeAreaTopInset?: boolean;
  hasBorderRadius?: boolean;
  image?: ImageSourcePropType;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  subtitleTestID?: string;
  tabsContainerBackgroundColor?: ColorValue;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleTestID?: string;
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

export interface AvatarHeaderFlashListProps<ItemT>
  extends Omit<AvatarHeaderSharedProps, 'contentContainerStyle'>,
    StickyHeaderFlashListProps<ItemT> {}
