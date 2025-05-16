import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Major from './views/Major';
import MajorDetail from './views/MajorDetail'
import Chatbot from './views/Chatbot'
import DualMajorDetail from './views/DualMajorDetail'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/major" element={<Major />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/major/:id" element={<MajorDetail />} />
         <Route path="/dualmajor/:id" element={<DualMajorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
