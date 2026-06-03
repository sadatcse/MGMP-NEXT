"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import { FaUserShield, FaDatabase, FaLock, FaSyncAlt, FaEnvelope, FaGlobe, FaPhone } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-20 pb-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
        >
            <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Data Protection</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Privacy <span className="text-custom-yellow">Policy</span></h1>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg font-medium italic max-w-2xl mx-auto leading-relaxed">
              "Your privacy is a cornerstone of the Multigym experience. This policy details our unwavering commitment to protecting your personal data."
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
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Welcome to Multigym Premium's Privacy Policy. We value the trust you place in us when sharing your personal information. This policy explains how we collect, use, and safeguard your data across our platforms.
                </p>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-widest border-t border-white/5 pt-6">
                    By using our services, you consent to the practices described in this document.
                </p>
            </div>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                {[
                    {
                        icon: FaDatabase,
                        title: "Information We Collect",
                        list: [
                            "Personal Identifiers (Name, Email, Phone, Address)",
                            "Usage Analytics (Interactions with our digital tools)",
                            "Technical Metadata (IP Address, Browser Type, Device IDs)",
                            "Cookies and Session Tracking Technologies"
                        ]
                    },
                    {
                        icon: FaUserShield,
                        title: "How We Use Data",
                        list: [
                            "Maintenance and optimization of fitness services",
                            "Development of innovative community features",
                            "Direct communication and member support",
                            "Personalized content and product recommendations",
                            "Strict compliance with legal and regulatory obligations"
                        ]
                    },
                    {
                        icon: FaLock,
                        title: "Data Security Protocols",
                        content: "We implement advanced technical and organizational measures to defend your information against unauthorized access, alteration, or destruction. While we utilize industry-leading security standards, no digital transmission can be guaranteed as 100% secure."
                    },
                    {
                        icon: FaSyncAlt,
                        title: "Policy Updates",
                        content: "We periodically refine this policy to reflect new features or legal requirements. Notifications of changes are posted here, and we encourage members to review this page regularly."
                    }
                ].map((section, index) => (
                    <div key={index} className="group bg-white/5 border border-white/5 p-8 md:p-12 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 transition-all duration-500 group-hover:bg-red-600 group-hover:text-white shrink-0 shadow-lg">
                                <section.icon size={24} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                                {section.title}
                            </h2>
                        </div>
                        
                        {section.content && (
                            <p className="text-gray-400 text-lg font-medium leading-relaxed italic border-l-2 border-red-600/30 pl-6">
                                {section.content}
                            </p>
                        )}
                        
                        {section.list && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.list.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 bg-custom-yellow rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Contact Grid */}
            <div className="bg-gradient-to-br from-[#111] to-[#000] border border-white/10 p-12 md:p-20 rounded-[4rem] shadow-2xl text-center space-y-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay pointer-events-none"></div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Privacy <span className="text-red-600">Inquiries</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: FaEnvelope, text: "info@multigympremium.com", sub: "Email Support" },
                        { icon: FaGlobe, text: "multigympremium.com", sub: "Web Portal" },
                        { icon: FaPhone, text: "+880 1313-197435", sub: "Direct Line" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            <item.icon className="text-custom-yellow text-3xl" />
                            <div>
                                <p className="text-white font-black text-sm uppercase tracking-tighter line-clamp-1">{item.text}</p>
                                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
