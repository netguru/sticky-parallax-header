import { StyleSheet } from 'react-native';
import { colors, screenStyles, constants } from '../../constants';

export default StyleSheet.create({
  ...screenStyles,
  foregroundText: {
    color: colors.white,
    paddingHorizontal: 12,
  },
  foregroundTitle: {
    height: 36,
    alignSelf: 'flex-start',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 32,
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    width: 56,
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: 3,
  },
  number: {
    color: colors.black,
    paddingLeft: 4,
    fontSize: 16,
    lineHeight: 20,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  authorPhoto: {
    width: 32,
    height: 32,
    borderRadius: constants.isAndroid ? 50 : 8,
  },
  authorName: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
    paddingLeft: 12,
  },
  headerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  },
});
