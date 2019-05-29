import { Dimensions, Platform } from 'react-native'

const { height, width } = Dimensions.get('window')

const deviceWidth = width
const deviceHeight = height
const responsiveHeight = h => height * (h / 100)
const responsiveWidth = w => width * (w / 100)
const breakpoints = {
  smallPhoneWidth: 320,
  smallPhoneHeight: 600,
  mediumPhoneWidth: 414,
  bigPhoneWidth: 480
}
const isSmallScreen = width <= breakpoints.smallPhoneWidth || height <= breakpoints.smallPhoneHeight
const isNormalScreen = width > breakpoints.smallPhoneWidth && width < breakpoints.mediumPhoneWidth
const isBigScreen = width >= breakpoints.mediumPhoneWidth
const isBiggestPhoneScreen = width >= breakpoints.bigPhoneWidth
const isAndroid = Platform.OS === 'android'

export default {
  deviceWidth,
  deviceHeight,
  responsiveHeight,
  responsiveWidth,
  isSmallScreen,
  isNormalScreen,
  isBigScreen,
  isBiggestPhoneScreen,
  isAndroid
}
