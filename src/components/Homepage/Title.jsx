import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const Title = ({ title, subtitle, textColor = 'text-custom-yellow' }) => {
  return (
    <div className="flex flex-col items-center justify-center relative w-full mb-12">
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
        className="flex items-center gap-4 mb-3"
      >
        <div className="w-10 h-[2px] bg-accent rounded-full"></div>
        <h3 className='text-center text-sm md:text-base text-accent font-bold uppercase tracking-[0.3em]'>
          {title}
        </h3>
        <div className="w-10 h-[2px] bg-accent rounded-full"></div>
      </motion.div>
      
      <motion.h2
        variants={fadeIn('up', 0.6)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
        className={`text-center font-extrabold poppins uppercase text-4xl sm:text-5xl md:text-6xl leading-[1.2] ${textColor} drop-shadow-md`}
      >
        {subtitle}
      </motion.h2>

      <motion.div
        variants={fadeIn('up', 0.8)}
        initial='hidden'
        whileInView={'show'}
        viewport={{ once: false, amount: 0.2 }}
        className="mt-6 flex items-center justify-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent/80"></span>
        <span className="w-16 md:w-24 h-1 rounded-full bg-accent/60"></span>
        <span className="w-2 h-2 rounded-full bg-accent/80"></span>
      </motion.div>
    </div>
  );
};

export default Title;
