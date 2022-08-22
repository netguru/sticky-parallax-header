import type { AnimatedColorProp, ColorProp } from '../SharedProps';

export function parseAnimatedColorProp(
  animatedColorProp?: AnimatedColorProp
): ColorProp | undefined {
  'worklet';

  return typeof animatedColorProp === 'undefined' ||
    typeof animatedColorProp === 'string' ||
    typeof animatedColorProp === 'number' ||
    typeof animatedColorProp === 'symbol'
    ? animatedColorProp
    : animatedColorProp?.value;
}
