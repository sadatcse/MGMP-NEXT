"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
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
        const newData = response.data;
        setBlogData(newData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [axiosPublic]);

  return (
    <section className='bg-primary-300 text-white py-24' id='blog'>
      <div className='container mx-auto px-4'>
        <Title title="OUR NEWS" subtitle="LATEST BLOG POSTS" />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <motion.div
              variants={fadeIn('up', 0.6)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 15 },
                  1024: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                }}
                className='h-[420px] md:max-w-[660px] lg:max-w-none mb-8'
              >
                {blogData
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((post, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex flex-col justify-start h-full max-w-[320px] mx-auto'>
                        <Link href={`/blog/${post._id}`}>
                          <img src={post.image} alt={post.title} className='mb-6 h-64 w-84' />
                        </Link>
                        <div className='flex flex-col items-start'>
                          <p className='max-w-[380px] uppercase text-[12px] tracking-[3px] mb-1'>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <Link
                            className='hover:text-accent transition-all duration-300'
                            href={`/blog/${post._id}`}
                          >
                            <h5 className='h5'>{post.title}</h5>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                <SwiperNavButtons
                  containerStyles='absolute left-0 right-0 bottom-[16rem] w-full max-w-[370px] sm:max-w-[620px] md:max-w-[960px] xl:max-w-[1320px] mx-auto z-50 flex justify-between gap-1'
                  btnStyles='bg-accent text-white w-[56px] h-[56px] flex justify-center items-center hover:bg-accent transition-all duration-300'
                  iconStyles='text-2xl'
                />
              </Swiper>
            </motion.div>
            <motion.div
              variants={fadeIn('up', 0.8)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Link href="/blog">
                <CustomButton containerStyles='block w-[196px] h-[62px] mx-auto' text='View all' />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
