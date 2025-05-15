import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

import Login from './views/Login';
import Home from './views/Home';
import Major from './views/Major';
import MajorDetail from './views/MajorDetail'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/major" element={<Major />} />
        <Route path="/major/:id" element={<MajorDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
