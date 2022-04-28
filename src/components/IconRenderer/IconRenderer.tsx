import React, { ReactElement, VFC } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import styles from '../../predefinedComponents/DetailsHeader/DetailsHeader.styles';

interface Props {
  icon?: (() => ReactElement | null) | ImageSourcePropType;
}

const IconRenderer: VFC<Props> = ({ icon }) => {
  if (typeof icon === 'function') {
    return icon();
  }

  return icon ? <Image style={styles.icon} resizeMode="contain" source={icon} /> : null;
};

export default IconRenderer;
