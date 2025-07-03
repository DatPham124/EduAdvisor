import React, { useEffect, useState } from 'react';
import AboutSection from '../components/Home/AboutSection';
import AdmissionInfo from '../components/Home/AdmissionInfo';
import CallSection from '../components/Home/CallSection';
import HeroSection from '../components/Home/HeroSection';
import PopularMajors from '../components/Home/PopularMajors';
import Testimonials from '../components/Home/Testimonials';
import DualMajors from '../components/Home/DualMajors';
import ChatBubble from '../components/Chatbot/ChatBubble'
import ChatBotWidget from '../components/Chatbot/ChatbotWidget';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      {isChatOpen && <ChatBotWidget />}
      <ChatBubble onClick={() => setIsChatOpen(prev => !prev)} />
    </main>
  );
};

export default Home;
