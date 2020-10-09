import React from 'react';
import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import DetailsHeader from '../predefinedComponents/DetailsHeader/DetailsHeader';
import StickyParallaxHeader from '../StickyParallaxHeader';

describe('DetailsHeader empty', () => {
  afterEach(cleanup);

  test('Snapshot for default', () => {
    const tree = renderer.create(<DetailsHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should have default leftTopIconOnPress prop', () => {
    expect(DetailsHeader.defaultProps.leftTopIconOnPress).toBeDefined();
  });

  test('LeftTopIconOnPress should return undefined', () => {
    const result = DetailsHeader.defaultProps.leftTopIconOnPress();
    expect(result).toBeUndefined();
  });

  test('Should have default rightTopIconOnPress prop', () => {
    expect(DetailsHeader.defaultProps.rightTopIconOnPress).toBeDefined();
  });

  test('RightTopIconOnPress should return undefined', () => {
    const result = DetailsHeader.defaultProps.rightTopIconOnPress();
    expect(result).toBeUndefined();
  });

  test('Renders title prop correctly', () => {
    const component = renderer.create(<DetailsHeader title="Test 1" />);
    const testInstance = component.root;

    expect(testInstance.props.title).toBe('Test 1');
  });

  test('Renders headerLayout correctly', () => {
    const component = renderer.create(<DetailsHeader />);
    const testInstance = component.root;
    const stickyHeader = testInstance.findByType(StickyParallaxHeader);

    expect(testInstance.instance.state.headerLayout).toMatchObject({ height: 0 });
    stickyHeader.props.headerSize({ height: 1 });
    expect(testInstance.instance.state.headerLayout).toMatchObject({ height: 1 });
  });
});
