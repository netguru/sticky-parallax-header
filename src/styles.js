import { StyleSheet, Dimensions } from 'react-native'
import { colors } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    width: width,
    paddingBottom: 24,
    paddingTop: 18,
    flex: 1,
  },
  toolbarWrapper: {
    width: width,
    zIndex: 1
  },
  toolbar: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: '100%',
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
  tabWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  singleTabContainer: {
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
