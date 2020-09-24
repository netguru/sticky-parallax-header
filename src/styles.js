import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbarWrapper: {
    flex: 1,
    alignItems: 'center',
    width,
    position: 'absolute',
    zIndex: 2,
  },
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width + 0.5,
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingBottom: 3,
  },
  overScrollPadding: {
    height: 300,
    position: 'absolute',
    top: -300,
    left: 0,
    right: 0,
    overflow: 'scroll',
  },
  transparentBackground: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 3,
  },
});

export default styles;
