import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import StickyParallaxHeader from '../StickyParallaxHeader';

describe('StickyParallaxHeader snspasot', () => {
  afterEach(cleanup);
  test('Snapshot for default', () => {
    const tree = render(<StickyParallaxHeader headerSize={() => {}} header={<></>} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
