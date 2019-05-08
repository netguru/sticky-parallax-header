import { StyleSheet, Dimensions } from 'react-native'


const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
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
    zIndex: 1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 5 }
  }
})

export default styles
