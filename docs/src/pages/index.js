import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SectionItem from '../components/sectionItem/SectionItem';
import HomePageHeader from '../components/homePageHeader/HomePageHeader';
import GetStartedSection from '../components/getStartedSection/GetStartedSection';
import {SECTIONS_DATA} from '../data/sections';

const Home = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
     <Layout
       title={`Hello from ${siteConfig.title}`}
       description="Description will go into a meta tag in <head />"
     >
      <HomePageHeader />
      {SECTIONS_DATA.map((data, index) => {
          return <SectionItem
            key={data.id}
            index={index}
            title={data.title}
            description={data.description}
            imageName={data.imageName}
          />
        })
      }
      <GetStartedSection />
    </Layout>
  );
}

export default Home;
