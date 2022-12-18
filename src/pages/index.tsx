import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  // const title = document.getElementsByClassName('navbar__title');
  // title[0].innerHTML === 'Zeitgeist . Docs'

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Learn how to integrate with the Zeitgeist network.">
      <main className={styles.main}>
        <div className={styles.socialLinks}>
          <a className={styles.socialLink} href="https://discord.com/invite/xv8HuA4s8v" target="_blank" rel="noreferrer noopener">
            <img width="18" src="img/discord.svg" alt="Discord Logo"/>
          </a>
          <a className={styles.socialLink} href="https://facebook.com/zeitgeistpm" target="_blank" rel="noreferrer noopener">
            <img width="9" src="img/facebook.svg" alt="Facebook Logo"/>
          </a>
          <a className={styles.socialLink} href="https://twitter.com/zeitgeistpm" target="_blank" rel="noreferrer noopener">
            <img width="18" src="img/twitter.svg" alt="Twitter Logo"/>
          </a>
          <a className={styles.socialLink} href="https://github.com/ZeitgeistPM" target="_blank" rel="noreferrer noopener">
            <img width="20" src="img/github-light.png" alt="Github Logo"/>
          </a>
        </div>
        <img className={clsx(styles.bg, styles.bgTopLeft)} src="/img/bg/top-left.svg"/>       
        <img className={clsx(styles.bg, styles.bgTopCenter)} src="/img/bg/top-center.svg"/>       
        <img className={clsx(styles.bg, styles.bgLightning)} src="/img/bg/lightning.svg"/>       
        <img className={clsx(styles.bg, styles.bgCenterLeft)} src="/img/bg/center-left.svg"/>       
        <img className={clsx(styles.bg, styles.bgCenterCircleSmall)} src="/img/bg/center-circle-small.svg"/>
        <img className={clsx(styles.bg, styles.bgCenterXRight)} src="/img/bg/x.svg"/>           
        <img className={clsx(styles.bg, styles.bgBottomLeft)} src="/img/bg/bottom-left.svg"/>
        <img className={clsx(styles.bg, styles.bgBottomRight)} src="/img/bg/bottom-right.svg"/>        
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
