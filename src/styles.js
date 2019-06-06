import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbarWrapper: {
    flex: 1,
    alignItems: 'center',
    width,
    position: 'absolute',
    zIndex: 2
  },
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingBottom: 3
  },
  overScrollPadding: {
    height: 200,
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0
  }
})

export default styles
