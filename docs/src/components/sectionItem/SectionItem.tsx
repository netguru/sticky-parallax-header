import clsx from 'clsx';
import React from 'react';

import styles from './SectionItem.module.css';
import { SectionItemContent } from './SectionItemContent';
import { SectionItemImage } from './SectionItemImage';

interface Props {
  description: string;
  imageName: string;
  index: number;
  title: string;
}

const SectionItem: React.FC<Props> = ({ index, title, description, imageName }) => {
  const isOdd = index % 2 === 0;

  return (
    <section className={isOdd ? styles.backgroundOdd : styles.backgroundEven}>
      <div className={clsx('container', styles.container)}>
        {isOdd ? (
          <div className={clsx('row', styles.row)}>
            <SectionItemContent description={description} title={title} />
            <SectionItemImage imageName={imageName} index={index} />
          </div>
        ) : (
          <div className={clsx('row', styles.row)}>
            <SectionItemImage imageName={imageName} index={index} />
            <SectionItemContent description={description} title={title} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionItem;
