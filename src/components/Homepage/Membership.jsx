"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import background from "../../assets/img/membership/bg.jpg";
import MembershipSlider from './MembershipSlider';
import Title from './Title';

const Membership = () => {
  return (
    <section 
      className='py-24 relative overflow-hidden' 
      id='prices'
    >
      {/* Background with Parallax-like feel */}
      <div 
        className="absolute inset-0 z-0 scale-110 grayscale opacity-20"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }}
      ></div>
      
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-[#0a0a0a]/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>

      <div className='container mx-auto px-4 relative z-20'>
        <div className="mb-20">
          <Title title="Pricing Plans" subtitle="Select Your Membership" textColor="text-white" />
        </div>
        
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: true }}
          className="pb-10"
        >
          <MembershipSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default Membership;
