import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string,
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Learn',
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
    Svg: require('@site/static/img/arrow-up.svg').default,
    link: '/docs/build/how-to-monitor-node',
    description: (
      <>
        Since Zeitgeist is built on its own layer-1 chain with optimized runtime logic, it will be affordable even with high traffic.
      </>
    ),
  },
];

function Feature({title, Svg, link, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link className={styles.heroLink} to={link}>
        <div className={clsx("text--center", styles.heroItem)}>
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
        <div className={clsx('col col--6')}>
            <h2>Help improve this wiki</h2>
            <p>This wiki was started by and is maintained by Web3 Foundation. It is an open-source-ish project and aims to be the most extensive resource of knowledge on Polkadot and the Polkadot ecosystem.</p>
            <div className="">
              <Link to="https://github.com/ZeitgeistPM" className={clsx('button button--outline button--primary', styles.ctaButton)}>Contribute</Link>
              <Link to="https://crowdin.com/project/zeitgeistpm" className={clsx('button button--outline button--primary', styles.ctaButton)}>Help Translate</Link>
            </div>
        </div>
        <div className={clsx('col col--6')}>

        </div>
      </div>
    </section>
    </>
  );
}
