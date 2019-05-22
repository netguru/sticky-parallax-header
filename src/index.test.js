import React from 'react'
import { View } from 'react-native'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import StickyParalaxHeader from './index'

configure({
  adapter: new Adapter()
})

const defaultProps = {
  onEndReached: jest.fn(),
  foreground: <View />,
  tabs: ['Popular', 'Product Design', 'Development', 'Project Management'],
  deviceWidth: 420,
  parallaxHeight: 300,
  scrollEvent: jest.fn(),
  background: <View />,
  tabTextStyle: {},
  tabTextContainerStyle: {},
  tabTextContainerActiveStyle: {},
  tabsContainerBackgroundColor: 'white'
}

describe('with basic props', () => {
  const props = defaultProps
  const wrapper = shallow(<StickyParalaxHeader {...props} />)

  // it('Should render properly', () => {
  //   expect(wrapper.find(PrimarySlider).length).toBe(1)
  //   expect(wrapper.find(Text).length).toBe(3)
  // })

  it('Should render snapshot properly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
