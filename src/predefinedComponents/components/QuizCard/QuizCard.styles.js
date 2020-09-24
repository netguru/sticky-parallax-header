import { StyleSheet } from 'react-native';
import { colors } from '../../../constants';

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
    borderWidth: 2,
    borderColor: colors.paleGrey,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
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
    letterSpacing: 0.8,
  },
  mainText: {
    fontSize: 20,
    lineHeight: 24,
    color: colors.black,
    paddingTop: 8,
    paddingBottom: 20,
  },
});
