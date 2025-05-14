import React from 'react';

import MajorSection from '../components/Major/MajorSection';
import DualMajorSection from '../components/Major/DualMajorSection';

const Major = () => {
  return (
    <main className="main relative">
      <div
        id="home"
        className="relative overflow-hidden bg-primary text-primary-color pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <MajorSection></MajorSection>
        <DualMajorSection></DualMajorSection>
      </div>
    </main>
  );
};
export default Major;
