"use client";
import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { FaBriefcase, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { ImUsers } from 'react-icons/im';
import { motion, useInView } from 'framer-motion';

// Office hours
const OFFICE_START_HOUR = 7; // 7:00 AM
const OFFICE_END_HOUR = 23; // 11:00 PM
const OFFICE_HOURS_PER_DAY = OFFICE_END_HOUR - OFFICE_START_HOUR;

// Calculate initial values
const startDate = new Date('2023-06-27T00:00:00+06:00');
const calculateStats = () => {
  const currentDate = new Date();
  const currentTimeInDhaka = new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  const timeDifference = currentTimeInDhaka - startDate;
  const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const numberOfYears = Math.floor(numberOfDays / 365);

  // Calculate total working hours
  let workingHours = numberOfDays * OFFICE_HOURS_PER_DAY;
  
  const currentHour = currentTimeInDhaka.getHours();
  const currentMinute = currentTimeInDhaka.getMinutes();
  
  if (currentHour >= OFFICE_START_HOUR && currentHour < OFFICE_END_HOUR) {
    workingHours += currentHour - OFFICE_START_HOUR;
    workingHours += currentMinute / 60; // Add partial hour for current minute
  } else if (currentHour >= OFFICE_END_HOUR) {
    workingHours += OFFICE_HOURS_PER_DAY;
  }

  return {
    numberOfDays,
    numberOfYears,
    workingHours: Math.floor(workingHours), // Round down to nearest hour
  };
};

// animation
const statsContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      duration: 0.5,
      ease: 'linear',
    },
  },
};

const statsItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
};

const Achievements = () => {
  const [stats, setStats] = useState(calculateStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(calculateStats());
    }, 3600000); // Update every hour (3600000ms)

    return () => clearInterval(interval);
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section>
      <div className='container mx-auto'>
        <motion.div
          variants={statsContainerVariant}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-16'
        >
          {[
            {
              number: 24,
              icon: FaBriefcase,
              text: 'Weekly classes',
            },
            {
              number: stats.numberOfDays,
              icon: ImUsers,
              text: 'Happy customers',
            },
            {
              number: stats.workingHours,
              icon: FaClock,
              text: 'Working hours',
            },
            {
              number: stats.numberOfYears,
              icon: FaCalendarAlt,
              text: 'Number of years',
            },
          ].map((item, index) => {
            return (
              <motion.div
                variants={statsItem}
                className='flex flex-col justify-center items-center'
                key={index}
              >
                {/* circle outer */}
                <div className='border border-accent/90 w-[140px] h-[140px] mx-auto rounded-full p-1 mb-6'>
                  {/* circle inner & count number */}
                  <div
                    ref={ref}
                    className='border border-accent/30 w-full h-full flex items-center justify-center text-5xl rounded-full'
                  >
                    {/* render the CountUp animation only the component is in view (isInView is true) */}
                    {isInView && (
                      <CountUp className='text-accent' start={0} end={item.number} duration={6} />
                    )}
                  </div>
                </div>
                {/* text */}
                <div className='flex flex-col justify-center items-center text-center'>
                  <item.icon className='text-3xl mb-2 text-custom-yellow' />
                  <h4 className='h4 font-bold'>{item.text}</h4>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
