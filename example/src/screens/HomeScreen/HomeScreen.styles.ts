import { StyleSheet } from 'react-native';
import { colors, screenStyles } from '../../constants';

export default StyleSheet.create({
  ...screenStyles,
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
