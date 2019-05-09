import { StyleSheet, Dimensions } from 'react-native'


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'flex-end'
  },
  titleWrapper: {
    width: width,
    paddingBottom: 24,
    paddingTop: 18,
    alignItems: 'center',
    flex: 1,
    position: 'absolute'
  },
  toolbarWrapper: {
    height: 56,
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 1
  }
})

export default styles
