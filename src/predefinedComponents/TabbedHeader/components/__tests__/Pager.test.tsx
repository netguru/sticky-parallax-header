import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Pager } from '../Pager';

// Mock React Native components
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
  FlatList: 'FlatList',
  I18nManager: {
    isRTL: false,
  },
  Platform: {
    OS: 'ios',
  },
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  View: 'View',
}));

// Mock React Native Reanimated
jest.mock('react-native-reanimated', () => ({
  useAnimatedRef: jest.fn(() => ({ current: null })),
  useAnimatedScrollHandler: jest.fn(() => jest.fn()),
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  createAnimatedComponent: jest.fn((Component) => Component),
  cancelAnimation: jest.fn(),
  runOnJS: jest.fn((fn) => fn),
  runOnUI: jest.fn((fn) => fn),
  scrollTo: jest.fn(),
  withDelay: jest.fn((delay, animation) => animation),
  withTiming: jest.fn((value, config, callback) => callback),
}));

describe('Pager', () => {
  const mockProps = {
    children: [<React.Fragment key="1">Page 1</React.Fragment>, <React.Fragment key="2">Page 2</React.Fragment>],
    initialPage: 0,
    minScrollHeight: 100,
    scrollHeight: 200,
    scrollRef: { current: null },
    scrollValue: { value: 0 },
  };

  it('should render without crashing', () => {
    const { getByText } = render(<Pager {...mockProps} />);
    expect(getByText('Page 1')).toBeTruthy();
  });

  it('should handle ref from pagerProps without throwing error', () => {
    const pagerRef = React.createRef();
    
    expect(() => {
      render(
        <Pager
          {...mockProps}
          pagerProps={{
            ref: pagerRef,
          }}
        />
      );
    }).not.toThrow();
  });

  it('should expose goToPage method through ref', () => {
    const pagerRef = React.createRef();
    
    render(
      <Pager
        {...mockProps}
        pagerProps={{
          ref: pagerRef,
        }}
      />
    );

    // The ref should have the goToPage method
    expect(pagerRef.current).toBeDefined();
    expect(typeof pagerRef.current?.goToPage).toBe('function');
  });

  it('should handle both forwardRef and pagerProps ref', () => {
    const forwardRef = React.createRef();
    const pagerRef = React.createRef();
    
    expect(() => {
      render(
        <Pager
          ref={forwardRef}
          {...mockProps}
          pagerProps={{
            ref: pagerRef,
          }}
        />
      );
    }).not.toThrow();

    // Both refs should have the goToPage method
    expect(forwardRef.current).toBeDefined();
    expect(typeof forwardRef.current?.goToPage).toBe('function');
    expect(pagerRef.current).toBeDefined();
    expect(typeof pagerRef.current?.goToPage).toBe('function');
  });
});
