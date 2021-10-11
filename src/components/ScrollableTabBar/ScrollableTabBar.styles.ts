import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countWrapper: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
  },
  nestedStyle: {
    alignSelf: 'center',
  },
  tabUnderlineStyles: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 6,
    height: 3,
  },
  noMargins: { paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0 },
});
