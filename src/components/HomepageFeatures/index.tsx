import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Permissionless and Unstoppable',
    Svg: require('@site/static/img/Icon1.svg').default,
    description: (
      <>
        No single entity controls the Zeitgeist network. It is based on peer-to-peer technology and distributed governance.
      </>
    ),
  },
  {
    title: 'Powered by ZTG',
    Svg: require('@site/static/img/Icon2.svg').default,
    description: (
      <>
        Zeitgeist is powered by ZTG. ZTG is the native currency of Zeitgeist that plays a critical role in market creation and resolution.
      </>
    ),
  },
  {
    title: 'Scalable and Affordable',
    Svg: require('@site/static/img/Icon3.svg').default,
    description: (
      <>
        Since Zeitgeist is built on its own layer-1 chain with optimized runtime logic, it will be affordable even with high traffic.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
