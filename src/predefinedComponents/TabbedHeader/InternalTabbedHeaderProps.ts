import type { RefObject } from 'react';
import type { ScrollView, StyleProp, ViewStyle } from 'react-native';
import type Animated from 'react-native-reanimated';

export interface InternalPagerProps {
  disableScrollToPosition?: boolean;
  initialPage?: number;
  minScrollHeight: number;
  onChangeTab?: (previousPage: number, newPage: number) => void;
  page: number;
  pageContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  rememberTabScrollPosition?: boolean;
  scrollHeight: number;
  scrollRef: RefObject<ScrollView>;
  scrollValue: Animated.SharedValue<number>;
  swipedPage?: (index: number) => void;
}
