import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import DetailsHeader from '../predefinedComponents/DetailsHeader/DetailsHeader';

describe('DetailsHeader empty', () => {
  afterEach(cleanup);

  test('Snapshot for default', () => {
    const tree = render(<DetailsHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
