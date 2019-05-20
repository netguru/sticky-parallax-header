import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
    paddingLeft: 20
  },
  tabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.transparent,
    borderRadius: 18
  },
  countWrapper: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabWrapperActive: {
    backgroundColor: colors.darkMint
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.white
  },
  nestedStyle: {
    height: 50,
    alignSelf: 'center'
  }
})
