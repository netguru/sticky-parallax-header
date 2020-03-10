import { StyleSheet, Platform } from 'react-native'
import { ifIphoneX } from '../../utils'
import { colors, constants, screenStyles } from '../../constants'

export default StyleSheet.create({
  ...screenStyles,
  userModalHeader: {
    paddingTop: Platform.OS === 'ios' ? ifIphoneX(50, 30) : 18
  },
  headerPic: {
    width: 32,
    height: 32,
    borderRadius: 8
  },
  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -(constants.deviceWidth / 3)
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
    marginLeft: 12,
    fontFamily: 'AvertaStd-Semibold'
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 32
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    width: 56
  },
  infoText: {
    color: colors.white,
    fontSize: constants.normalizedFontSize(16),
    lineHeight: 24,
    fontFamily: 'AvertaStd-Regular'
  },
  icon: {
    width: 16,
    height: 16
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24
  },
  authorPhoto: {
    width: 32,
    height: 32,
    borderRadius: 8
  },
  userModalMessageContainer: {
    paddingBottom: 8
  }
})
