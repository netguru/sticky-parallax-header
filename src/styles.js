import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    flex: 1,
    width,
    alignItems: 'center'
  },
  toolbarWrapper: {
    width,
    zIndex: 1,
    position: 'absolute'
  },
  tabsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row'
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
  tabBarContainer: {
    zIndex: 1,
    width: '100%'
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
