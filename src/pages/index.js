import React from 'react';
import Layout from "@theme/Layout";
import ZeitgeistLogo from "@site/static/img/Zeitgeist-trans.png";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function Main() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.tagline}>
      <p class="centered_image">
        <img src={ZeitgeistLogo} />
      </p>
    </Layout>
  );
}

export default Main;
