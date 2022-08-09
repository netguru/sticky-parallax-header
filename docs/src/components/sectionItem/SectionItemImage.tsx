import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import * as React from 'react';

import styles from './SectionItem.module.css';

interface SectionItemImageProps {
  index: number;
  imageName: string;
}

export const SectionItemImage: React.FC<SectionItemImageProps> = ({ imageName, index }) => {
  return (
    <div className={clsx('col col--6', styles.imageWrapper)}>
      <img
        className={index !== 2 ? styles.image : styles.smallerImage}
        src={useBaseUrl(`/img/${imageName}.png`)}
        alt={imageName}
      />
    </div>
  );
};
