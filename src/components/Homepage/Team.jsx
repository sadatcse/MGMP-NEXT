"use client";
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaMobileAlt } from 'react-icons/fa';
import Link from 'next/link';
import Title from './Title';
import CustomButton from './CustomButton';
import Spinner from "../Utility/Spinner";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { motion } from 'framer-motion';

const Team = () => {
  const [trainerData, setTrainerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let timeoutId;
    const fetchTrainerData = async () => {
      try {
        const response = await axiosPublic.get('/trainer/get-all');
        setTrainerData(response.data);
        setLoading(false);
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Error fetching trainer data:', error);
        setLoading(false);
      }
    };
    fetchTrainerData();
    timeoutId = setTimeout(() => {
      if (loading) fetchTrainerData();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [axiosPublic, loading]);

  const selectedTrainers = trainerData.slice(0, 4);

  return (
    <section className='py-24 bg-[#0a0a0a]'>
      <div className='container mx-auto px-4'>
        <div className="mb-16">
          <Title title="Our Experts" subtitle="Meet Our Team" />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Trainers Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {selectedTrainers.map((trainer, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group flex flex-col items-center bg-white/5 border border-white/5 rounded-[2rem] p-8 premium-card' 
                  key={trainer._id}
                >
                  {/* Image Container */}
                  <div className='relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-2xl'>
                    <Link href={`/trainers/${trainer.short_name}`}>
                      <img 
                        src={trainer.image_url} 
                        alt={trainer.full_name} 
                        className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' 
                      />
                    </Link>
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2 w-full">
                    <Link href={`/trainers/${trainer.short_name}`}>
                      <h4 className='text-xl font-black text-white uppercase tracking-tight group-hover:text-custom-yellow transition-colors'>{trainer.full_name}</h4>
                    </Link>
                    <p className='text-red-600 font-bold uppercase text-[10px] tracking-[0.3em]'>Elite Fitness Coach</p>
                    <p className='text-gray-400 text-xs font-medium line-clamp-2 min-h-[2rem]'>{trainer.certification}</p>
                    
                    {/* Socials - Polished */}
                    <div className='flex justify-center gap-4 pt-4 border-t border-white/5 mt-4 group-hover:border-white/10 transition-colors'>
                      {[
                        { icon: FaInstagram, link: trainer.Instagram, prefix: 'https://www.instagram.com/' },
                        { icon: FaFacebook, link: trainer.facebook, prefix: 'https://www.facebook.com/' },
                        { icon: FaMobileAlt, link: trainer.mobile, prefix: 'tel:' }
                      ].map((social, sIndex) => (
                        social.link && (
                          <a 
                            key={sIndex}
                            href={social.prefix + social.link} 
                            target='_blank' 
                            rel='noopener noreferrer' 
                            className='w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black transition-all duration-300'
                          >
                            <social.icon size={18} />
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className='mt-16 text-center'>
              <Link href="/trainers">
                <button className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-500">
                    Explore All Experts
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
