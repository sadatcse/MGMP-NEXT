"use client";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import useAxiosPublic from "../Hook/useAxiosPublic";
import { motion } from 'framer-motion';

const Trainers_Details = () => {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
     
    useEffect(() => {
        axiosPublic.get("/trainer/get-all/")
            .then(res => {
                const trainer = res.data.find(item => item.short_name === name);
                setData(trainer);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [name, axiosPublic]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center text-white">Trainer Not Found</div>;
    }

    const { image_url, full_name, certification, bio, facebook, Instagram, mobile, email, short_name } = data;

    return (
        <div className='bg-[#050505] min-h-screen text-white pt-20 overflow-x-hidden'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:flex-row items-center relative gap-10 lg:gap-20 py-20'>
                    
                    {/* Background Backdrop Text - Refined */}
                    <p className='absolute text-[15vw] font-black uppercase -z-10 top-0 left-0 opacity-[0.03] select-none tracking-tighter leading-none lg:block hidden'>
                        {short_name}
                    </p>

                    {/* Image Column */}
                    <div className='w-full lg:w-1/2'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <img 
                                src={image_url} 
                                className='w-full rounded-3xl shadow-2xl border border-white/5 object-cover max-h-[700px]' 
                                alt={full_name} 
                            />
                            {/* Subtle Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-t from-red-600/20 to-transparent blur-2xl -z-10"></div>
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <p className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs">Certified Instructor</p>
                                <h1 className='text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none'>
                                    {full_name}
                                </h1>
                                <p className='text-xl md:text-3xl font-bold text-gray-300 uppercase tracking-tight'>
                                    {certification}
                                </p>
                            </div>

                            <div className="w-16 h-1 bg-red-600 rounded-full mx-auto lg:mx-0"></div>

                            <p className='text-lg md:text-xl font-medium text-gray-400 leading-relaxed max-w-2xl italic'>
                                {bio ? bio.split('\n').map((paragraph, index) => (
                                    <React.Fragment key={index}>
                                        {paragraph}
                                        <br />
                                    </React.Fragment>
                                )) : 'Expert training guidance tailored to your goals.'}
                            </p>

                            <div className='flex gap-6 pt-6 justify-center lg:justify-start'>
                                {[
                                    { icon: FaFacebookF, link: facebook, prefix: 'https://www.facebook.com/' },
                                    { icon: FaInstagram, link: Instagram, prefix: 'https://www.instagram.com/' },
                                    { icon: FaPhoneAlt, link: mobile, prefix: 'tel:' },
                                    { icon: MdOutlineEmail, link: email, prefix: 'mailto:' }
                                ].map((social, index) => (
                                    social.link && (
                                        <a 
                                            key={index}
                                            href={social.prefix + social.link} 
                                            target='_blank' 
                                            rel='noopener noreferrer' 
                                            className='w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300'
                                        >
                                            <social.icon className="text-lg" />
                                        </a>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trainers_Details;
