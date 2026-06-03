"use client";
import React from 'react';
import { FaLock, FaUserSecret, FaInfoCircle, FaChild, FaSyncAlt, FaPhone, FaFacebookSquare } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const PrivacyPolicyfb = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-20 pb-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-full h-96 bg-blue-600/5 blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
        >
            <div className="flex items-center justify-center gap-4 mb-6">
                <FaFacebookSquare className="text-4xl text-blue-600" />
                <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Social Advertising</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Ads Privacy <span className="text-custom-yellow">Policy</span></h1>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed">
              "Ensuring transparency and security in our digital engagement across the Meta ecosystem."
            </p>
        </motion.div>

        {/* Content Body */}
        <motion.div 
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* Intro Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl">
                <p className="text-gray-300 text-lg leading-relaxed">
                    At Multigym Premium, we are committed to protecting your privacy in all digital interactions. This specific policy outlines the data collected through our Facebook advertising campaigns and how that information is utilized to enhance your fitness experience.
                </p>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    {
                        icon: FaInfoCircle,
                        title: "Information Gathered",
                        content: "When interacting with our ads, we may collect your name and phone number through lead forms, alongside engagement metrics like clicks and conversions.",
                        accent: "blue"
                    },
                    {
                        icon: FaUserSecret,
                        title: "Strategic Use",
                        content: "Your data allows us to contact you with exclusive offers and personalize your marketing journey based on your specific fitness goals.",
                        accent: "yellow"
                    },
                    {
                        icon: FaLock,
                        title: "Data Stewardship",
                        content: "We never sell or rent your personal information. Data is shared only with verified service providers who assist in managing our digital campaigns.",
                        accent: "red"
                    },
                    {
                        icon: FaLock,
                        title: "Security Commitment",
                        content: "We take reasonable measures to protect your data, acknowledging that no method of digital storage is entirely impenetrable.",
                        accent: "blue"
                    },
                    {
                        icon: FaSyncAlt,
                        title: "Control & Choices",
                        content: "You retain the right to opt-out of marketing communications at any time. Contact us directly to update or permanently delete your records.",
                        accent: "yellow"
                    },
                    {
                        icon: FaChild,
                        title: "Underage Safety",
                        content: "Our services and advertisements are strictly for individuals aged 18 and older. We do not knowingly collect data from minors.",
                        accent: "red"
                    }
                ].map((section, index) => (
                    <div key={index} className="group bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black shrink-0 shadow-lg
                                ${section.accent === 'blue' ? 'bg-blue-600/10 text-blue-600 border border-blue-600/20' : 
                                  section.accent === 'yellow' ? 'bg-custom-yellow/10 text-custom-yellow border border-custom-yellow/20' : 
                                  'bg-red-600/10 text-red-600 border border-red-600/20'}`}>
                                <section.icon size={20} />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                                {section.title}
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* Final Contact Section */}
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/40 border border-blue-600/20 p-10 md:p-16 rounded-[4rem] shadow-2xl text-center space-y-8">
                <FaPhone className="text-5xl mx-auto text-blue-400/50" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Direct <span className="text-blue-400">Inquiry</span></h2>
                <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
                    For specific questions about Facebook advertising data, please contact our privacy officer.
                </p>
                <div className="pt-4">
                    <a href="tel:01313197435" className="inline-block px-12 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-blue-600 transition-all duration-500 shadow-xl shadow-blue-600/20">
                        Call Support
                    </a>
                </div>
            </div>

            <div className="text-center space-y-4 pt-10">
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                    By interacting with our ads, you consent to this Privacy Policy.
                </p>
                <p className="text-gray-700 text-[8px] font-black uppercase tracking-[0.4em]">
                    Last updated: April 25, 2024
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyfb;
