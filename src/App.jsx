import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

import Home from './views/Home';
import Major from './views/Major';
import MajorDetail from './views/MajorDetail'
import DualMajorDetail from './views/DualMajorDetail'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/major" element={<Major />} />
        <Route path="/major/:id" element={<MajorDetail />} />
        <Route path="/dualmajor/:id" element={<DualMajorDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
