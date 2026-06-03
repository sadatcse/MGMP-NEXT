"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaChild, FaDumbbell, FaRunning, FaUsers, FaUser, FaParking, FaCoffee, FaAppleAlt, FaLock } from 'react-icons/fa';
import { fadeIn } from './../../lib/variants';

import center from "./../assets/img/Service/center.jpg"
import cardio from "./../assets/img/Service/cardio.jpg"
import coffecup from "./../assets/img/Service/coffecup.jpg"
import food from "./../assets/img/Service/food.png"
import locker from "./../assets/img/Service/locker.jpg"
import parking from "./../assets/img/Service/parking.jpg"
import Personal from "./../assets/img/Service/Personal.jpg"
import heroBg from "./../assets/img/hero/bg.png"

const servicesData = [
    {
        "title": "Large Free Weight Center",
        "description": "Unlock your inner strength in our state-of-the-art free weight center! Work with our staff to find the right program to power your results.",
        "icon": <FaDumbbell />,
        "image": center,
        "accent": "bg-red-600"
    },
    {
        "title": "Huge Cardio Center",
        "description": "Are you all about your daily treadmill sprints or looking to wind down on an elliptical? Whatever your favorite machine is, we are here to help you get moving with the best cardio equipment.",
        "icon": <FaRunning />,
        "image": cardio,
        "accent": "bg-custom-yellow"
    },
    {
        "title": "Group Exercise Classes",
        "description": "As part of our commitment to being the best FIT for your family, Multigym premium offers a variety of classes at our fitness clubs. Our group fitness classes are fun, cutting-edge, and driven by community.",
        "icon": <FaUsers />,
        "video": "https://www.youtube.com/embed/oQ_KqkxyVyE",
        "accent": "bg-red-600"
    },
    {
        "title": "Personal Training",
        "description": "Meet your goals with private personal training and Ignite group fitness. Our passionate and skilled personal trainers will customize a fitness program based on your needs.",
        "icon": <FaUser />,
        "image": Personal,
        "accent": "bg-custom-yellow"
    },
    {
        "title": "Parking Space",
        "description": "Convenient and ample parking space for all our members. Easy access ensures that you can get to your workout without any hassle.",
        "icon": <FaParking />,
        "image": parking,
        "accent": "bg-red-600"
    },
    {
        "title": "Coffee Shop",
        "description": "Relax and unwind at our on-site coffee shop. Enjoy a variety of beverages and snacks before or after your workout.",
        "icon": <FaCoffee />,
        "image": coffecup,
        "accent": "bg-custom-yellow"
    },
    {
        "title": "Nutrition Service",
        "description": "Get personalized nutrition advice and meal plans from our certified nutritionists to complement your fitness regime.",
        "icon": <FaAppleAlt />,
        "image": food,
        "accent": "bg-red-600"
    },
    {
        "title": "Personal Locker Service",
        "description": "Keep your belongings safe and secure with our personal locker service. Enjoy peace of mind while you work out.",
        "icon": <FaLock />,
        "image": locker,
        "accent": "bg-custom-yellow"
    }
]

const Header = () => {
    return (
        <div className="relative h-80 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
                style={{ backgroundImage: `url(${heroBg.src})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
            <div className="relative flex items-center justify-center h-full px-4">
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className='flex flex-col items-center gap-4 text-center'
                >
                    <h1 className="text-custom-yellow text-4xl md:text-6xl font-bold uppercase tracking-tight">Our Services</h1>
                    <p className="text-gray-300 font-medium text-lg md:text-xl max-w-2xl">We're more than just a fitness club — we provide the tools, support, and resources you need to achieve your goals.</p>
                    <div className="w-24 h-1 bg-red-600 rounded-full mt-2"></div>
                </motion.div>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className="bg-[#0a0a0a] text-white">
            <Header />
            <div className="py-24 container mx-auto px-4 overflow-hidden">
                <div className="flex flex-col gap-32">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 0.3)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center justify-between gap-12 lg:gap-20`}
                        >
                            {/* Image Container with Shape */}
                            <div className='w-full lg:w-1/2 relative group'>
                                {/* Decorative Background Shape */}
                                <div className={`absolute -inset-4 ${service.accent} opacity-20 blur-2xl rounded-full group-hover:opacity-40 transition-opacity duration-500`}></div>
                                <div className={`absolute inset-0 ${service.accent} -rotate-3 rounded-[3rem] opacity-10 group-hover:rotate-0 transition-transform duration-500`}></div>

                                <div className='relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10'>
                                    {service.image ? (
                                        <motion.img
                                            whileHover={{ scale: 1.05 }}
                                            src={service.image.src}
                                            alt={service.title}
                                            className="object-cover w-full h-[350px] md:h-[450px] transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-[350px] md:h-[450px] bg-neutral-900 flex items-center justify-center">
                                            <iframe
                                                src={service.video}
                                                title={service.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={`w-16 h-16 ${service.accent} rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg shadow-red-600/20`}
                                >
                                    {service.icon}
                                </motion.div>

                                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">
                                    <span className="text-white">{service.title.split(' ').slice(0, -1).join(' ')} </span>
                                    <span className="text-custom-yellow">{service.title.split(' ').slice(-1)}</span>
                                </h2>

                                <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                                    {service.description}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-sm group"
                                >
                                    {/* <span className="border-b-2 border-red-600 py-1 group-hover:border-white transition-colors">Explore Service</span> */}
                                    {/* <span className="text-xl">→</span> */}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

