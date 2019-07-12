import { ifIphoneX } from 'react-native-iphone-x-helper'
import constants from './constants'

export default {
  toolbarHeight: 100,
  headerHeight: ifIphoneX(92, constants.responsiveHeight(13)),
  cardScreenHeaderHeight: ifIphoneX(110, 90),
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
    right: 15
  }
}
