"use client";
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../../assets/img/hero/bg.png";
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import Link from 'next/link';
import { FaBuilding, FaArrowRight } from 'react-icons/fa';
import { branches } from '../../data/branches';

const HeroSlider = () => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const handleLoadedData = () => {
      setLoaded(true);
    };

    if (video) {
      video.addEventListener('loadeddata', handleLoadedData);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <Swiper className='h-full'>
      <SwiperSlide>
        <div className='h-full flex justify-center items-center pt-16 pb-12 relative overflow-hidden'>
          {/* Fallback Image */}
          {!loaded && (
            <Image
              src={image1}
              alt='Background'
              fill
              sizes='100vw'
              priority
              className='object-cover z-0'
            />
          )}

          {/* Background Video */}
          <video
            ref={videoRef}
            id='hero-video'
            src='/vedio1.mp4'
            autoPlay
            loop
            muted
            className={`absolute inset-0 w-full h-full object-cover z-0 ${loaded ? 'block' : 'hidden'}`}
          />

          {/* Subtle gradient overlay to preserve text readability while showing original video */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-0 pointer-events-none' />

          {/* Hero Content */}
          <div className='flex flex-col items-center max-w-[950px] w-full px-4 relative z-10 text-center'>
            
            {/* Main Title */}
            <motion.h1
              variants={fadeIn('up', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            >
              <span className='text-white'>JUST BELIEVE </span>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-custom-yellow to-yellow-300 drop-shadow-[0_0_25px_rgba(244,203,113,0.4)]'>
                YOURSELF
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeIn('up', 0.5)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='text-gray-300 text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.2em] max-w-2xl mb-8 drop-shadow-md'
            >
              We do everything we can to help you become your best self for the rest of your life.
            </motion.p>

            {/* Two Branch Buttons */}
            <motion.div
              variants={fadeIn('up', 0.7)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-3xl'
            >
              {branches.map((branch) => {
                const isMain = branch.id === "shiya-masjid";
                return (
                  <Link
                    key={branch.id}
                    href={`/branches/${branch.slug}`}
                    className={`w-full sm:w-1/2 group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-black/80 backdrop-blur-xl border-2 transition-all duration-300 shadow-2xl hover:-translate-y-1.5 ${
                      isMain
                        ? "border-red-600/50 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                        : "border-custom-yellow/50 hover:border-custom-yellow hover:shadow-[0_0_30px_rgba(244,203,113,0.4)]"
                    }`}
                  >
                    <div className='flex items-center gap-4 text-left'>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isMain
                            ? "bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white"
                            : "bg-custom-yellow/20 text-custom-yellow group-hover:bg-custom-yellow group-hover:text-black"
                        }`}
                      >
                        <FaBuilding className='text-xl' />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-md mb-1 ${
                            isMain
                              ? "bg-red-600 text-white"
                              : "bg-custom-yellow text-black"
                          }`}
                        >
                          {branch.tag}
                        </span>
                        <h4 className='text-base sm:text-lg font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors leading-tight'>
                          {branch.name}
                        </h4>
                      </div>
                    </div>
                    <FaArrowRight
                      className={`text-xl transition-all duration-300 group-hover:translate-x-2 flex-shrink-0 ml-3 ${
                        isMain ? "text-red-500 group-hover:text-white" : "text-custom-yellow"
                      }`}
                    />
                  </Link>
                );
              })}
            </motion.div>

          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
