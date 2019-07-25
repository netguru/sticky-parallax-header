import { StyleSheet, Platform } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
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
    paddingTop: Platform.OS === 'ios' ? ifIphoneX(64, 44) : 55,
    paddingBottom: 20,
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
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
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
