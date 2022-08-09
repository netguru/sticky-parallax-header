import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, StyleSheet } from 'react-native';

interface Props {
  icon?: (() => React.ReactElement | null) | ImageSourcePropType;
}

const IconRenderer: React.FC<Props> = ({ icon }) => {
  if (typeof icon === 'function') {
    return icon();
  }

  return icon ? <Image style={styles.icon} resizeMode="contain" source={icon} /> : null;
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
    marginTop: 3,
  },
});

export default IconRenderer;
