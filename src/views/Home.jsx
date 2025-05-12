import React from 'react'
import AboutSection from "../components/Home/AboutSection";
import AdmissionInfo from "../components/Home/AdmissionInfo";
import CallSection from "../components/Home/CallSection";
import HeroSection from "../components/Home/HeroSection";
import PopularMajors from "../components/Home/PopularMajors";
import Testimonials from "../components/Home/Testimonials";


const Home = () => {
    return (
        <main class="main relative">
            <HeroSection />
            <AboutSection />
            <PopularMajors />
            <AdmissionInfo />
            <CallSection />
            <Testimonials />

        </main>
    );
}

export default Home;