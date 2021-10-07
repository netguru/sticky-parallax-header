import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './HomePageHeader.module.css'
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const HomePageHeader = () => {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroImage}>
        <video controls>
          <source
            src={useBaseUrl('/parallax-video.mp4')}
            type="video/mp4"
          />
              Your browser does not support HTML video.
        </video>
      </div>
      <div className={styles.rightContent}>
        <div className={styles.logo}/>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroDescriptionText}>{siteConfig.tagline}</p>
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
      </div>
    </header>
  );
};

export default HomePageHeader;
