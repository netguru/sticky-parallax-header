import { StyleSheet, Platform } from 'react-native'
import { ifIphoneX } from '../constants/utils'
import colors from './colors'
import constants from './constants'

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24
  },
  contentText: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.black,
    alignSelf: 'flex-start',
    letterSpacing: -0.2,
    paddingTop: 40,
    paddingBottom: 20,
    fontFamily: 'AvertaStd-Semibold'
  },
  foreground: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end'
  },
  background: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.primaryGreen,
    height: '100%'
  },
  headerWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: Platform.select({ ios: ifIphoneX(50, 40), android: 55 }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    height: 24,
    width: 142
  },
  message: {
    color: colors.white,
    fontSize: constants.responsiveWidth(11),
    lineHeight: 48,
    letterSpacing: -1,
    fontFamily: 'AvertaStd-Semibold'
  },
  messageContainer: {
    paddingTop: 24,
    paddingBottom: 24
  },
  profilePic: {
    width: constants.responsiveWidth(18),
    height: constants.responsiveWidth(18),
    borderRadius: constants.responsiveWidth(4.5)
  },
  foregroundText: {
    color: colors.white
  }
})

export default screenStyles
