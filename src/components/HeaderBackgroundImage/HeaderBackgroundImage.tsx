import React, { ReactNode, VFC } from 'react';
import { ImageBackground, Animated, ImageSourcePropType } from 'react-native';
import styles from './HeaderBackgroundImage.styles';

const { createAnimatedComponent } = Animated;

type HeaderBackgroundImageProps = {
  background: ReactNode;
  backgroundHeight: number;
  backgroundImage: ImageSourcePropType;
};
const HeaderBackgroundImage: VFC<HeaderBackgroundImageProps> = (props) => {
  const { backgroundHeight, backgroundImage, background } = props;
  const AnimatedImageBackground = createAnimatedComponent(ImageBackground);

  return (
    <AnimatedImageBackground
      style={[
        styles.headerStyle,
        {
          height: backgroundHeight,
        },
      ]}
      source={backgroundImage}>
      {background}
    </AnimatedImageBackground>
  );
};

const headerImagesAreEqual = (
  prevProps: HeaderBackgroundImageProps,
  props: HeaderBackgroundImageProps
) =>
  // @ts-ignore
  prevProps?.backgroundImage?.uri === props?.backgroundImage?.uri &&
  prevProps.backgroundHeight === props.backgroundHeight &&
  prevProps.background === props.background;

const MemoHeaderBackgroundImage = React.memo(HeaderBackgroundImage, headerImagesAreEqual);

export default MemoHeaderBackgroundImage;
