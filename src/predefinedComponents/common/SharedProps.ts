import type { ReactElement } from 'react';
import type {
  ColorValue,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  ScrollView,
  SectionList,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

// FIXME: unknown does not work here :/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScrollComponent = ScrollView | FlatList<any> | SectionList<any, any>;

export interface IconProps {
  leftTopIcon?: (() => ReactElement | null) | ImageSourcePropType;
  leftTopIconAccessibilityLabel?: string;
  leftTopIconOnPress?: () => void;
  leftTopIconTestID?: string;
  rightTopIcon?: (() => ReactElement | null) | ImageSourcePropType;
  rightTopIconAccessibilityLabel?: string;
  rightTopIconOnPress?: () => void;
  rightTopIconTestID?: string;
}

export interface SharedPredefinedProps {
  backgroundColor?: ColorValue;
  backgroundImage?: ImageSourcePropType;
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerHeight?: number;
  onMomentumScrollEnd?: (e: NativeScrollEvent) => void;
  onScroll?: (e: NativeScrollEvent) => void;
  onScrollEndDrag?: (e: NativeScrollEvent) => void;
  onTopReached?: () => void;
  parallaxHeight?: number;
  renderHeaderBar?: () => ReactElement | null;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  snapToEdge?: boolean;
}

export interface Tab {
  title?: string;
  icon?: (ReactElement | null) | ((isActive: boolean) => ReactElement | null);
  testID?: string;
}

export interface TabsConfig {
  tabTextActiveStyle?: StyleProp<TextStyle>;
  tabTextContainerStyle?: StyleProp<ViewStyle>;
  tabTextContainerActiveStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  tabUnderlineColor?: ColorValue;
  tabWrapperStyle?: StyleProp<ViewStyle>;
  tabs: Tab[];
  tabsContainerBackgroundColor?: ColorValue;
  tabsContainerHorizontalPadding?: number;
  tabsContainerStyle?: StyleProp<ViewStyle>;
}
