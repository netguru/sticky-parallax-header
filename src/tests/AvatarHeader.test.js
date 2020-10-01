import React from 'react';
import renderer from 'react-test-renderer';
import AvatarHeader from '../predefinedComponents/AvatarHeader/AvatarHeader';

describe('AvatarHeader Test [Hacktoberfest]', () => {
  test('-Snapshot AvatarHeader', () => {
    const tree = renderer.create(<AvatarHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
