"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeIn } from '../../../lib/variants';
import CustomButton from './CustomButton';
import SwiperNavButtons from './SwiperNavButtons';
import Title from './Title';
import Spinner from "../Utility/Spinner";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axiosPublic.get('/news/get-all');
        setBlogData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [axiosPublic]);

  return (
    <section className='bg-[#0a0a0a] py-24' id='blog'>
      <div className='container mx-auto px-4'>
        <div className="mb-16">
          <Title title="Our News" subtitle="Latest Blog Posts" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <div className="relative">
            <motion.div
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true }}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className='pb-20'
              >
                {blogData
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((post, index) => (
                    <SwiperSlide key={index}>
                      <div className='group flex flex-col h-full bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden premium-card'>
                        <Link href={`/blog/${post._id}`} className="relative block h-64 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                        </Link>

                        <div className='p-8 flex flex-col flex-grow'>
                          <p className='uppercase text-[10px] font-black tracking-[0.2em] text-custom-yellow mb-3'>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <Link
                            className='hover:text-custom-yellow transition-all duration-300'
                            href={`/blog/${post._id}`}
                          >
                            <h3 className='text-xl font-black text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-custom-yellow transition-colors'>
                              {post.title}
                            </h3>
                          </Link>
                          <div className="mt-auto pt-6 border-t border-white/5">
                            <Link href={`/blog/${post._id}`} className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 group-hover:text-red-600 transition-colors">
                              Read Article <span className="text-red-600">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                {/* Navigation Controls */}
                <div className="mt-12 flex justify-center gap-4">
                  <SwiperNavButtons
                    containerStyles='flex justify-center gap-4'
                    btnStyles='bg-white/5 border border-white/10 text-white w-14 h-14 rounded-2xl flex justify-center items-center hover:bg-custom-yellow hover:text-black hover:border-custom-yellow transition-all duration-500 shadow-xl'
                    iconStyles='text-xl'
                  />
                </div>
              </Swiper>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link href="/blog">
                <button className="px-10 py-4 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-500">
                  Explore All News
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
