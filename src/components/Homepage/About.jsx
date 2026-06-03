import { FaUser, FaDumbbell, FaHeartbeat, FaUsers, FaSun } from 'react-icons/fa';
import { IoIosPricetags, IoIosNutrition } from 'react-icons/io';
import Achievements from './Achievements';
import Title from './Title';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const featured = [
  {
    icon: FaDumbbell,
    title: 'FREE WEIGHTS',
    subtitle: 'Discover the ultimate freedom in your fitness routine with our state-of-the-art Free Weights. Elevate your workout experience and sculpt your physique.',
  },
  {
    icon: IoIosNutrition,
    title: 'NUTRITION SERVICES',
    subtitle: 'Achieve your goals with our coaches who provide personalized programming and in-person sessions tailored to your specific needs.',
  },
  {
    icon: FaHeartbeat,
    title: 'CARDIO',
    subtitle: 'Experience the heart-pounding energy of our cutting-edge cardio machines that take your fitness journey to new heights.',
  },
  {
    icon: FaUsers,
    title: 'GROUP CLASSES',
    subtitle: 'Get ready to move and groove in our exciting dance class, where rhythm meets fitness for an exhilarating workout experience.',
  },
  {
    icon: FaSun,
    title: 'TANNING',
    subtitle: 'Elevate your glow at our gym with our premium tanning services. Achieve that sun-kissed look while maintaining your fitness routine.',
  },
  {
    icon: FaUser,
    title: 'PERSONAL TRAINING',
    subtitle: 'Achieve your goals with our coaches who provide personalized programming and in-person sessions tailored to your specific needs.',
  },
];

const About = () => {
  return (
    <section className='py-24 bg-[#0a0a0a]' id='about'>
      <div className='container mx-auto px-4'>
        <div className='mb-20'>
          <Title title="Why Choose Us" subtitle="Build Your Best Body" />
        </div>
        
        {/* featured items */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24'>
          {featured.map((feature, index) => {
            return (
              <motion.div
                variants={fadeIn('up', index * 0.1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: true }}
                className='group relative bg-white/5 border border-white/5 p-12 rounded-[2.5rem] transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 flex flex-col items-center text-center shadow-2xl'
                key={index}
              >
                {/* Icon Container */}
                <div className='text-4xl text-custom-yellow bg-white/5 w-20 h-20 rounded-2xl flex justify-center items-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-custom-yellow group-hover:text-black shadow-lg'>
                  <feature.icon />
                </div>
                
                <div className='space-y-4'>
                  <h4 className='text-2xl font-black text-white tracking-tight uppercase group-hover:text-custom-yellow transition-colors'>
                    {feature.title}
                  </h4>
                  <div className="w-8 h-1 bg-red-600 mx-auto rounded-full group-hover:w-16 transition-all duration-500"></div>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base">
                    {feature.subtitle}
                  </p>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full -mr-12 -mt-12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            );
          })}
        </div>
        
        {/* achievements */}
        <Achievements />
      </div>
    </section>
  );
};

export default About;
