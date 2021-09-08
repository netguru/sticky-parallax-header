import React from 'react';
import { cleanup } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import DetailsHeader from '../predefinedComponents/DetailsHeader/DetailsHeader';
import StickyParallaxHeaderComponent from '../StickyParallaxHeaderComponent';

describe('DetailsHeader empty', () => {
  afterEach(cleanup);

  test('Snapshot for default', () => {
    const tree = renderer.create(<DetailsHeader headerType={'DetailsHeader'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders title prop correctly', () => {
    const component = renderer.create(
      <DetailsHeader headerType={'DetailsHeader'} title="Test 1" />
    );
    const testInstance = component.root;

    expect(testInstance.props.title).toBe('Test 1');
  });

  test('Renders headerLayout correctly', () => {
    const component = renderer.create(<DetailsHeader headerType={'DetailsHeader'} />);
    const testInstance = component.root;
    const stickyHeader = testInstance.findByType(StickyParallaxHeaderComponent);

    expect(testInstance.instance.state.headerLayout).toMatchObject({ height: 0 });
    stickyHeader.props.headerSize({ height: 1 });
    expect(testInstance.instance.state.headerLayout).toMatchObject({ height: 1 });
  });
});
