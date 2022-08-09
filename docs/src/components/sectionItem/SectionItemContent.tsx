import clsx from 'clsx';
import * as React from 'react';

import styles from './SectionItem.module.css';

interface SectionItemContentProps {
  description: string;
  title: string;
}

export const SectionItemContent: React.FC<SectionItemContentProps> = ({ description, title }) => {
  return (
    <div className={clsx('col col--6', styles.contentWrapper)}>
      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <div className={styles.sectionDescription}>{description}</div>
      </div>
    </div>
  );
};
