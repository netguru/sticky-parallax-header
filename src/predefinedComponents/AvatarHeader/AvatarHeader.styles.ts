import { StyleSheet, Platform } from 'react-native';
import { ifIphoneX } from '../../utils';
import { colors, constants, screenStyles } from '../../constants';

export default StyleSheet.create({
  ...screenStyles,
  userModalHeader: {
    paddingTop: Platform.OS === 'ios' ? ifIphoneX(50, 30) : 18,
  },
  headerPic: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
    marginLeft: 12,
    marginRight: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    width: 56,
  },
  infoText: {
    flexGrow: 1,
    color: colors.white,
    fontSize: constants.normalizedFontSize(16),
    lineHeight: 24,
  },
  icon: {
    width: 16,
    height: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  authorPhoto: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  userModalMessageContainer: {
    marginTop: 12,
    paddingBottom: 8,
  },
  rightHeaderButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftHeaderButton: {
    flex: 1,
  },
  foregroundTitle: {
    flexGrow: 1,
    paddingRight: 12,
  },
});
