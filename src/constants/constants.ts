import { Dimensions, PixelRatio, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = width / 320;

const deviceWidth = width;
const deviceHeight = height;
const responsiveHeight = (h: number): number => height * (h / 100);
const responsiveWidth = (w: number): number => width * (w / 100);
const breakpoints = {
  smallPhoneWidth: 320,
  smallPhoneHeight: 600,
  mediumPhoneWidth: 414,
  bigPhoneWidth: 480,
};
const isSmallScreen =
  width <= breakpoints.smallPhoneWidth || height <= breakpoints.smallPhoneHeight;
const isNormalScreen = width > breakpoints.smallPhoneWidth && width < breakpoints.mediumPhoneWidth;
const isBigScreen = width >= breakpoints.mediumPhoneWidth;
const isBiggestPhoneScreen = width >= breakpoints.bigPhoneWidth;
const isAndroid = Platform.OS === 'android';

const getResponsiveFontSize = (fontSize: number): number => {
  const newSize = fontSize * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

const normalizedFontSize = (basicFontSize: number): number => {
  if (isSmallScreen) {
    return basicFontSize - 6;
  }
  if (isNormalScreen) {
    return basicFontSize;
  }
  if (isBigScreen) {
    return basicFontSize + 1;
  }

  return basicFontSize;
};

const scrollPosition = (scrollHeight: number, x: number): number => x * 0.01 * scrollHeight;

export default {
  getResponsiveFontSize,
  normalizedFontSize,
  scrollPosition,
  deviceWidth,
  deviceHeight,
  responsiveHeight,
  responsiveWidth,
  isSmallScreen,
  isNormalScreen,
  isBigScreen,
  isBiggestPhoneScreen,
  isAndroid,
};
