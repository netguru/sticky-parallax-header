import React from 'react';
import styles from './GetStartedSection.module.css';
import Link from '@docusaurus/Link';

const GetStartedSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        Get started
      </div>
      <div className={styles.description}>
        Check out the full documentation for Stickyheader.js and start using it in your projects.
      </div>
      <div className={styles.buttons}>
        <Link
          className={styles.heroButton}
          to="docs/introduction/getting-started"
        >
        <span className={styles.heroButtonText}>
          GET STARTED
        </span>
        </Link>
      </div>
    </section>
  );
};

export default GetStartedSection;
