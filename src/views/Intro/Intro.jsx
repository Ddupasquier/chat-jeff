import React from 'react';
import { introData } from './introData';
import 'App.scss';
import Alabaster from 'components/Banners/Alabaster';
// import Puzzle1 from 'puzzles/puzzle1';

const Intro = () => {

  return (
    <>
      <Alabaster />
      {introData.map((data, index) => (
        <div key={index} className="text-line" aria-label={data.label}>
          {data.line}
        </div>
      ))}
    </>
  );
};

export default Intro;
