import { Dimensions, ImageStyle, Platform, ScrollView, TextStyle, ViewStyle } from 'react-native';
import type { MutableRefObject, RefObject } from 'react';

export function isIphoneX(): boolean {
  const dimen = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
}

export function ifIphoneX<T = ViewStyle | TextStyle | ImageStyle>(
  iphoneXStyle: T,
  regularStyle: T
): T {
  if (isIphoneX()) {
    return iphoneXStyle;
  }

  return regularStyle;
}

export function getSafelyScrollNode(
  scrollNode: { getNode(): ScrollView } | ScrollView | null
): ScrollView | null {
  // after react-native 0.62
  if (scrollNode && (scrollNode as ScrollView)?.scrollTo) {
    return scrollNode as ScrollView;
  }
  if (scrollNode) {
    // before react-native 0.62
    // @ts-ignore
    return scrollNode.getNode();
  }

  return null;
}

type RefCallback<T> = (r: T) => void;
export function setRef<T>(
  ref: RefObject<T> | MutableRefObject<T> | RefCallback<T>,
  value: T
): void {
  if (typeof ref === 'function') {
    ref?.(value);
  } else if (ref !== null) {
    // @ts-ignore
    ref.current = value;
  }
}
