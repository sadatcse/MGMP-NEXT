"use client";
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../../assets/img/hero/bg.png";
import 'swiper/css';
import 'swiper/css/navigation';
import CustomButton from './CustomButton';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import Link from 'next/link';

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
        <div className='h-full flex justify-center items-center pt-12 relative'>
          {!loaded && (
            <img
              src={image1.src}
              alt='Background'
              className='absolute inset-0 w-full h-full object-cover z-0'
            />
          )}
          <video
            ref={videoRef}
            id='hero-video'
            src='/vedio1.mp4'
            autoPlay
            loop
            muted
            className={`absolute inset-0 w-full h-full object-cover z-0 ${loaded ? 'block' : 'hidden'}`}
          />
          <div className='flex flex-col items-center lg:items-center lg:max-w-[700px] relative z-10'>
            <motion.h1
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='h1 text-center lg:text-center mb-2'
            >
              <p className='text-accent text-3xl md:text-5xl lg:text-6xl '>Build Your Tomorrow</p>
            </motion.h1>
            <motion.p
              variants={fadeIn('up', 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
              className='text-custom-yellow text-center lg:text-center mb-4'
            >
              we do everything we can to help you become your best self for the rest of your life.
            </motion.p>
            <motion.div
              variants={fadeIn('up', 0.8)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Link href="/signup">
                <CustomButton
                  text='Start today'
                  containerStyles='w-[196px] h-[62px]'
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
