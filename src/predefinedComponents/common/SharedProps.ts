import type { ReactElement } from 'react';
import type {
  ColorValue,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  ProcessedColorValue,
  ScrollView,
  SectionList,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type Animated from 'react-native-reanimated';

// FIXME: unknown does not work here :/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ScrollComponent = ScrollView | FlatList<any> | SectionList<any, any>;

export type AnimatedColorProp =
  | ColorValue
  | ProcessedColorValue
  | Animated.SharedValue<ColorValue | ProcessedColorValue>;

export type ColorProp = ColorValue | ProcessedColorValue;

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
  backgroundColor?: AnimatedColorProp;
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
  tabTextActiveStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  tabTextContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  tabTextContainerActiveStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  tabTextStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  tabUnderlineColor?: AnimatedColorProp;
  tabWrapperStyle?: StyleProp<ViewStyle>;
  tabs: Tab[];
  tabsContainerBackgroundColor?: AnimatedColorProp;
  tabsContainerHorizontalPadding?: number;
  tabsContainerStyle?: StyleProp<ViewStyle>;
}
