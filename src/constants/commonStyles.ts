import { StyleSheet } from 'react-native';

import colors from './colors';

const commonStyles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  foreground: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  foregroundRow: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  headerWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logo: {
    height: 24,
    width: 142,
  },
  message: {
    color: colors.white,
    fontSize: 48,
    lineHeight: 55,
    letterSpacing: -1,
    textAlign: 'left',
  },
  messageContainer: {
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  wrapper: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default commonStyles;
