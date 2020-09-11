import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const responsiveHeight = (h) => height * (h / 100);
const responsiveWidth = (w) => width * (w / 100);
const breakpoints = {
  smallPhoneWidth: 320,
  smallPhoneHeight: 600,
  mediumPhoneWidth: 414,
  bigPhoneWidth: 480,
};
const isSmallScreen =
  width <= breakpoints.smallPhoneWidth ||
  height <= breakpoints.smallPhoneHeight;
const isNormalScreen =
  width > breakpoints.smallPhoneWidth && width < breakpoints.mediumPhoneWidth;
const isBigScreen = width >= breakpoints.mediumPhoneWidth;
const isBiggestPhoneScreen = width >= breakpoints.bigPhoneWidth;
const deviceWidth = width;
const deviceHeight = height;
const isAndroid = Platform.OS === 'android';

const normalizedFontSize = (basicFontSize) => {
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

const scrollPosition = (scrollHeight, x) => x * 0.01 * scrollHeight;

export default {
  deviceHeight,
  deviceWidth,
  responsiveHeight,
  responsiveWidth,
  isAndroid,
  isSmallScreen,
  isNormalScreen,
  isBigScreen,
  isBiggestPhoneScreen,
  normalizedFontSize,
  scrollPosition,
};
