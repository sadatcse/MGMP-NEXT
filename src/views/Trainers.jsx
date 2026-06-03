"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { fadeIn } from '../../lib/variants';

import useAxiosPublic from './../Hook/useAxiosPublic';

const Trainers = () => {
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchTrainerData = async () => {
            try {
                const response = await axiosPublic.get("/trainer/get-all/");
                setData(response.data);
            } catch (error) {
                console.error('Error fetching trainer data:', error);
            }
        };

        fetchTrainerData();
    }, [axiosPublic]);

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className='flex flex-col items-center gap-4 mb-16'>
                    <motion.div
                        variants={fadeIn('up', 0.2)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">The Experts</p>
                        <h2 className='text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6'>
                            Meet Our <span className="text-custom-yellow">Team</span>
                        </h2>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-8"></div>
                        <p className='max-w-[600px] mx-auto text-gray-400 text-lg font-medium leading-relaxed'>
                            Dedicated professionals committed to guiding you through every step of your fitness transformation.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.length === 0 ? (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    ) : (
                        data.map((trainer, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn('up', 0.1 * index)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Link href={`/trainers/${trainer.short_name}`}>
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-custom-yellow/10">
                                        {/* Image Container */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={trainer.image_url}
                                                alt={trainer.full_name}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Overlay with Info */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-10 flex flex-col justify-end p-8">
                                            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">

                                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1">
                                                    {trainer.full_name}
                                                </h3>
                                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4">
                                                    {trainer.position_title}
                                                </p>
                                                <div className="w-12 h-1.5 bg-red-600 rounded-full group-hover:w-full transition-all duration-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const Skeleton = () => {
    return (
        <div className='bg-neutral-900 w-full aspect-[3/4] rounded-[2.5rem] animate-pulse border border-white/5'>
        </div>
    )
}

export default Trainers;
