import { StyleSheet } from 'react-native';

import colors from './colors';

const screenStyles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 25,
  },
  contentText: {
    alignSelf: 'flex-start',
    color: colors.black,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 24,
    letterSpacing: -0.2,
    lineHeight: 28,
    paddingBottom: 20,
    paddingTop: 40,
  },
  darkBackground: {
    backgroundColor: colors.black,
  },
  lightBackground: {
    backgroundColor: colors.white,
  },
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  stretchContainer: {
    alignSelf: 'stretch',
    flex: 1,
  },
  text: {
    fontFamily: 'AvertaStd-Regular',
  },
});

export default screenStyles;
