import { Platform } from 'react-native';
import { ifIphoneX } from '../constants/utils';
import constants from './constants';

export default {
  toolbarHeight: 100,
  headerHeight: ifIphoneX(92, constants.responsiveHeight(13)),
  cardScreenHeaderHeight: Platform.select({
    ios: ifIphoneX(95, 85),
    android: 100,
  }),
  userModalHeaderHeight: ifIphoneX(100, 75),
  homeScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(38),
    constants.responsiveHeight(48)
  ),
  cardScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(43),
    constants.responsiveHeight(53)
  ),
  userScreenParallaxHeader: ifIphoneX(
    constants.responsiveHeight(43),
    constants.responsiveHeight(53)
  ),
  hitSlop: {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  },
};
