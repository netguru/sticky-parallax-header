import { StyleSheet, Platform } from 'react-native';
import { colors, constants } from '../../../constants';

export default StyleSheet.create({
  container: {
    marginTop: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 2,
      heght: 2,
    },
    shadowRadius: 40,
    shadowOpacity: 0.08,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderColor: colors.paleGrey,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelTextContainer: {
    backgroundColor: colors.paleGrey,
    borderRadius: 16,
  },
  labelText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.greyishBrown,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      heght: 2,
    },
    shadowRadius: 32,
    shadowOpacity: 0.016,
    backgroundColor: colors.purplishBlue,
    width: 56,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
  number: {
    color: colors.white,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  mainText: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.black,
    letterSpacing: -0.2,
    paddingTop: 8,
  },
  mainTextContainer: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
  },
  authorPhoto: {
    width: 24,
    height: 24,
    borderRadius: constants.isAndroid ? 50 : 8,
  },
  authorName: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.black,
    paddingLeft: 8,
  },
  authorWrapper: {
    flexDirection: 'row',
  },
  authorContainer: {
    paddingRight: 40,
  },
  authorBlankContainer: {
    width: '38%',
  },
  iconCardElement: {
    paddingLeft: 8,
  },
});
