import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import StickyParallaxHeaderComponent from '../StickyParallaxHeaderComponent';

describe('StickyParallaxHeader empty', () => {
  afterEach(cleanup);

  test('Snapshot for default', () => {
    const tree = render(
      <StickyParallaxHeaderComponent foreground={<></>} headerSize={() => {}} header={<></>} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
