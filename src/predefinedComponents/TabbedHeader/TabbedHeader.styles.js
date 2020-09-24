import { StyleSheet } from 'react-native';
import { colors, screenStyles } from '../../constants';

export default StyleSheet.create({
  ...screenStyles,
  logo: {
    height: 24,
    width: 142,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.darkMint,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white,
  },
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  homeScreenHeader: {
    backgroundColor: colors.primaryGreen,
  },
});
