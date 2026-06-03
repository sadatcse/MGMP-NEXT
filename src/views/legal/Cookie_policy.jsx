"use client";
import React from 'react';
import { FaCookieBite, FaExclamationCircle, FaCog, FaShieldAlt, FaSyncAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const CookiePolicy = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-20 pb-20 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-custom-yellow/5 blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
        >
            <p className="text-custom-yellow font-black uppercase tracking-[0.4em] text-xs mb-4">Privacy Preferences</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Cookie <span className="text-red-600">Policy</span></h1>
            <div className="w-20 h-1.5 bg-custom-yellow mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Last updated: April 25, 2024</p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            {[
                { 
                    icon: FaCookieBite, 
                    title: "What are Cookies?", 
                    content: "Cookies are small text files placed on your device when you visit a website. They are used to store information that improves your browsing experience by remembering your preferences and settings." 
                },
                { 
                    icon: FaCog, 
                    title: "Types of Cookies We Use", 
                    list: [
                        { label: "Essential Cookies", desc: "Necessary for core website functionality such as security, session management, and accessibility." },
                        { label: "Analytics Cookies", desc: "Collect anonymous information about how visitors use our site to help us improve performance and services." },
                        { label: "Marketing Cookies", desc: "Track visitors across websites to display relevant, engaging ads based on your fitness interests." }
                    ] 
                },
                { 
                    icon: FaShieldAlt, 
                    title: "Your Privacy Choices", 
                    content: "You can manage cookies in your browser settings. Most browsers allow you to refuse cookies or alert you when they are sent. Note that disabling them may impact your experience on our platform." 
                },
                { 
                    icon: FaExclamationCircle, 
                    title: "Third-Party Technologies", 
                    content: "We use services like social media plugins and advertising partners that may place cookies on our site. These are governed by the respective privacy policies of those third-party providers." 
                },
                { 
                    icon: FaSyncAlt, 
                    title: "Policy Evolution", 
                    content: "We periodically update this policy to reflect operational changes or regulatory requirements. Continued use of our site after updates constitutes acceptance of the revised policy." 
                }
            ].map((section, index) => (
                <div key={index} className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:bg-white/10 group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-custom-yellow/10 border border-custom-yellow/20 flex items-center justify-center text-custom-yellow transition-all duration-500 group-hover:bg-custom-yellow group-hover:text-black shrink-0">
                            <section.icon size={20} />
                        </div>
                        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                            {section.title}
                        </h2>
                    </div>
                    
                    {section.content && (
                        <p className="text-gray-400 text-lg font-medium leading-relaxed">
                            {section.content}
                        </p>
                    )}
                    
                    {section.list && (
                        <div className="space-y-6">
                            {section.list.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2.5 shrink-0"></div>
                                    <div>
                                        <p className="text-white font-black uppercase tracking-widest text-xs mb-1">{item.label}</p>
                                        <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Contact Section */}
            <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center space-y-8 mt-10">
                <FaPhone className="text-5xl mx-auto text-gray-700" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Questions about <span className="text-custom-yellow">Cookies?</span></h2>
                <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
                    If you have concerns about how we use data, our support team is available to explain our data practices.
                </p>
                <div className="pt-4">
                    <a href="tel:01313197435" className="inline-block px-10 py-4 border-2 border-red-600 text-red-600 font-black uppercase tracking-widest rounded-full hover:bg-red-600 hover:text-white transition-all duration-500">
                        Get Information
                    </a>
                </div>
            </div>

            <p className="text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] pt-10">
                By using our website, you consent to the use of cookies as described here.
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;
