import React, { useState, useEffect } from 'react';
import Title from '../components/Homepage/Title';


const UnderConstruction = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-10-24') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <Title title=" We're working hard to get this page ready for you. Stay tuned!" subtitle="Page Under Construction" />
      <img 
        src="https://upload.wikimedia.org/wikipedia/en/1/1d/Page_Under_Construction.png" 
        alt="Under Construction" 
        className="mt-6"
      />
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold">Countdown to Launch</h2>
        <div className="mt-4 flex space-x-4 text-lg">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.days || '0'}</span>
            <span>Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.hours || '0'}</span>
            <span>Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.minutes || '0'}</span>
            <span>Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold">{timeLeft.seconds || '0'}</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
