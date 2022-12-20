import React from 'react';
import { introData } from './introData';
import 'App.scss';
import Alabaster from 'components/Banners/Alabaster';

const Intro = () => {

  return (
    <>
      <Alabaster />
      {introData.map((data, index) => (
        <div key={index} className="text-line" aria-label={data}>
          {data}
        </div>
      ))}
    </>
  );
};

export default Intro;
