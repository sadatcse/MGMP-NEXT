"use client";
import React, { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import About from '../components/Homepage/About';
import Hero from '../components/Homepage/Hero';
import Classes from '../components/Homepage/Classes';
import Team from '../components/Homepage/Team';
import Membership from '../components/Homepage/Membership';
import Testimonial from '../components/Homepage/Testimonial';
import Blog from '../components/Homepage/Blog';
import Photo_galary from '../components/Homepage/Photo_galary';


const Home = () => {
    // const [modalOpen, setModalOpen] = useState(true);
    // const [countdown, setCountdown] = useState(10);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setModalOpen(false);
    //     }, 10000);

    //     const interval = setInterval(() => {
    //         setCountdown((prevCount) => prevCount - 1);
    //     }, 1000);

    //     return () => {
    //         clearTimeout(timer);
    //         clearInterval(interval);
    //     };
    // }, []);

    return (
        <div>

            <Hero />
            {/* <div className="hidden sm:block">
                
            </div> */}
            <About />
            <Classes />
            <Team />
            <Membership />
            <Testimonial />
            <Blog />
            <Photo_galary />

            {/* {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center border-2 border-red-500">
                    <div className="fixed inset-0 "></div>
                    <div className="bg-white p-8 rounded shadow-lg max-w-md">
                        <div className="text-lg font-bold mb-4 flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" /> Website Under Construction
                        </div>
                        <img src="https://www.maring-omgevingsrecht.nl/afbeeldingen/webPageConstruction.jpg" alt="Under Construction" className="mb-4 rounded-lg" />
                        <p className="text-gray-700 mb-4">
                            Sorry, the information on this page is currently not accurate as the website is under construction.
                        </p>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Auto closing in {countdown} seconds</p>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Home;
