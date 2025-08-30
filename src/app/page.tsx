'use client';

import React from 'react';
import Layout from '../components/Layout';
import DocumentAnalyzerContainer from '../containers/DocumentAnalyzerContainer';

const HomePage: React.FC = () => {
  return (
    <Layout currentPage="home">
      <DocumentAnalyzerContainer />
    </Layout>
  );
};

export default HomePage;
