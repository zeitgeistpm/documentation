import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';
import EmailSignUp from '@site/src/components/EmailFeatures';


type FeatureItem = {
  title: string;
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
  IconDark: React.ComponentType<React.ComponentProps<'svg'>>;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string,
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Learn',
    Icon: require('@site/static/img/dots.svg').default,
    IconDark: require('@site/static/img/dots-dark.svg').default,
    Svg: require('@site/static/img/arrow-up.svg').default,
    link: '/docs/category/learn',
    description: (
      <>
        No single entity controls the Zeitgeist network. It is based on peer-to-peer technology and distributed governance.
      </>
    ),
  },
  {
    title: 'Build',
    Icon: require('@site/static/img/triangle.svg').default,
    IconDark: require('@site/static/img/triangle-dark.svg').default,
    Svg: require('@site/static/img/arrow-up.svg').default,
    link: '/docs/category/build',
    description: (
      <>
        Zeitgeist is powered by ZTG. ZTG is the native currency of Zeitgeist that plays a critical role in market creation and resolution.
      </>
    ),
  },
  {
    title: 'Monitor',
    Icon: require('@site/static/img/eye.svg').default,
    IconDark: require('@site/static/img/eye-dark.svg').default,
    Svg: require('@site/static/img/arrow-up.svg').default,
    link: '/docs/build/how-to-monitor-node',
    description: (
      <>
        Since Zeitgeist is built on its own layer-1 chain with optimized runtime logic, it will be affordable even with high traffic.
      </>
    ),
  },
];

function Feature({title, Svg, Icon, IconDark, link, description}: FeatureItem) {
  const {colorMode, setColorMode} = useColorMode();
  return (
    <div className={clsx('col col--4')}>
      <Link className={styles.heroLink} to={link}>
        <div className={clsx("text--center", styles.heroItem)}>
          {colorMode === 'dark' ? <IconDark className={styles.icon} role="img" /> : <Icon className={styles.icon} role="img" />}
          <h3 className={styles.heroTitle}>{title}</h3>
          <p className={styles.heroDescription}>{description}</p>
          <Svg className={styles.featureSvg} role="img" />
        </div>
      </Link>
    </div>
  );
}


export default function HomepageFeatures(): JSX.Element {
  return (
  <>
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
    <section className={clsx('row', styles.homeCTA)}>
      <div className={clsx('container', styles.homeCTAinner)}>
        <h2 className={styles.ctaHeader}>Help Improve This Wiki</h2>
        <p>Zeitgeist is an evolving blockchain for prediction markets and futarchy. If you are a builder or entreprenuer interested in building on top of the Zeitgeist network, check out our SDK docs and feel free to contact us to tell us what you're building</p>
        <div className={styles.homeCTAButtons}>
          <Link to="https://github.com/ZeitgeistPM" className={clsx('button button-primary', styles.ctaButton)}>Contribute</Link>
          <Link to="https://crowdin.com/project/zeitgeistpm" className={clsx('button button-secondary', styles.ctaButton)}>Help Translate</Link>
        </div>
      </div>
    </section>
    <EmailSignUp/>
    </>
  );
}
