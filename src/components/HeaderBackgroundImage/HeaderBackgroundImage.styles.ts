import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width + 0.5,
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingBottom: 3,
  },
});

export default styles;
