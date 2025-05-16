import React from 'react';
import { useEffect } from 'react';
import AboutSection from '../components/Home/AboutSection';
import AdmissionInfo from '../components/Home/AdmissionInfo';
import CallSection from '../components/Home/CallSection';
import HeroSection from '../components/Home/HeroSection';
import PopularMajors from '../components/Home/PopularMajors';
import Testimonials from '../components/Home/Testimonials';
import DualMajors from '../components/Home/DualMajors';

const Home = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/src/assets/js/main.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <main class="main relative">
      <HeroSection />
      <AboutSection />
      <PopularMajors />
      <DualMajors/>
      <AdmissionInfo />
      <CallSection />
      <Testimonials />
    </main>
  );
};

export default Home;
