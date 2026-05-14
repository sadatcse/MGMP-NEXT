"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import background from "../../assets/img/membership/bg.jpg";
import MembershipSlider from './MembershipSlider';
import Title from './Title';
const Membership = () => {
  return (
    <motion.section
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.2 }}
      className='py-8 xl:py-0 lg:h-[95vh] relative'
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative', 
      }}
      id='prices'
    >
      <div className='container mx-auto px-4 text-white h-full flex flex-col xl:pt-10 relative z-20'>
      <Title title="PRICING TABLES" subtitle="CHOOSE YOUR PRICING PLAN" textColor="text-white" />
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.2 }}
        >
          <MembershipSlider />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Membership;
