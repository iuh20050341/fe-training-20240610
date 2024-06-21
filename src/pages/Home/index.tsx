import React from 'react';
import BannerSlide from '../../components/Banner/index.tsx'
import Content from '../../components/Content/index.tsx';

const Home = () => {

  return (
    <div className='home' style={{}}>
      <div className='banner' style={{}}>
        <BannerSlide />
      </div>
      <div className='content' style={{}}>
        <Content />
      </div>
    </div>
  );  
};

export default Home;
