import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
    paddingLeft: 20
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  countWrapper: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 16
  },
  nestedStyle: {
    height: 50,
    alignSelf: 'center'
  }
})
