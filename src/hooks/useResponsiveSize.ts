import { useWindowDimensions } from 'react-native';

export function useResponsiveSize() {
  const { height, width } = useWindowDimensions();

  function responsiveHeight(value: number) {
    return height * (value / 100);
  }

  function responsiveWidth(value: number) {
    return width * (value / 100);
  }

  return { responsiveHeight, responsiveWidth };
}
