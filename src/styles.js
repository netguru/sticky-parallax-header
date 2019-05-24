import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  toolbarWrapper: {
    width,
    position: 'absolute'
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: colors.secondaryGreen
  },
  tabText: {
    color: colors.white,
    fontWeight: '500'
  },
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingBottom: 3
  }
})

export default styles
