"use client";
import AboutHero from '../components/About/AboutHero';
import VisionAndValues from '../components/About/VisionAndValues';
import Package_Membership from '../components/About/Package_Membership';
import Schedules from '../components/About/Schedules';
import MessageFromChairman from '../components/About/Chairman';

const About_us = () => {
    return (
       <div>
         <AboutHero />
         <VisionAndValues />
         <MessageFromChairman />
         {/* <Team /> */}
         <Schedules />
         <Package_Membership />
       </div>
    );
};

export default About_us;