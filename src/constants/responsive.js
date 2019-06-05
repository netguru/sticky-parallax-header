import { Dimensions, Platform, StatusBar } from 'react-native'

const isIphoneX = () => {
  const dimen = Dimensions.get('window')

  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    // eslint-disable-next-line max-len
    && (dimen.height === 812 || dimen.width === 812 || (dimen.height === 896 || dimen.width === 896))
  )
}

const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) {
    return iphoneXStyle
  }

  return regularStyle
}

const getStatusBarHeight = safe => Platform.select({
  ios: ifIphoneX(safe ? 44 : 30, 20),
  android: StatusBar.currentHeight
})

export default {
  getStatusBarHeight,
  ifIphoneX,
  isIphoneX
}
