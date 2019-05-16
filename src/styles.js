import { StyleSheet, Dimensions } from 'react-native'
import { colors, constants, sizes } from './constants'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleWrapper: {
    width: constants.responsiveWidth(width),
    paddingBottom: 24,
    paddingTop: 18,
    alignItems: 'center',
    flex: 1,
    position: 'absolute'
  },
  toolbarWrapper: {
    height: sizes.toolbarHeight,
    width: constants.responsiveWidth(width),
    backgroundColor: colors.primaryGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 1
  },
  toolbar: {
    height: sizes.toolbarHeight,
    backgroundColor: colors.primaryGreen,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
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
  }
})

export default styles
