import { StyleSheet } from 'react-native';
import { colors, constants } from '../../../constants';

export default StyleSheet.create({
  container: {
    width: constants.responsiveWidth(75),
    minHeight: 48,
    borderRadius: 24,
    backgroundColor: colors.paleGrey,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  letter: {
    color: colors.black,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    width: 36,
    borderRadius: 17.5,
    backgroundColor: colors.white,
    margin: 6,
  },
  textContainer: {
    width: '80%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 7,
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
});
