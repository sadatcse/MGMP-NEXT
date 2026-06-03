"use client";
import React from 'react';
import { FaMoneyBillWave, FaRegClock, FaPhone, FaClipboardCheck, FaMedkit, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const RefundPolicy = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-20 pb-20 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-full h-96 bg-red-600/5 blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
        >
            <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Financial Policies</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Refund <span className="text-custom-yellow">Policy</span></h1>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Last updated: April 25, 2024</p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {[
                { 
                    icon: FaMoneyBillWave, 
                    title: "Membership Fees", 
                    content: "Membership fees are due at the time of registration and are non-refundable. This includes all types of memberships, including monthly, quarterly, and annual plans.",
                    fullWidth: true
                },
                { 
                    icon: FaRegClock, 
                    title: "Special Offers", 
                    content: "Fees paid for special offers and promotions are non-refundable. These offers are time-bound and cannot be transferred or refunded." 
                },
                { 
                    icon: FaClipboardCheck, 
                    title: "Personal Training", 
                    content: "Sessions must be canceled at least 24 hours in advance for rescheduling. Cancellations made later result in forfeiture of the session fee." 
                },
                { 
                    icon: FaRegClock, 
                    title: "Classes & Workshops", 
                    content: "Fees for classes are non-refundable. If Multigym Premium cancels a session, a full refund or rescheduling option will be provided." 
                },
                { 
                    icon: FaMedkit, 
                    title: "Exceptional Cases", 
                    content: "Serious illness or injury refund requests must be documented (medical certificate) and are evaluated on a case-by-case basis." 
                },
                { 
                    icon: FaExclamationTriangle, 
                    title: "Policy Termination", 
                    content: "If membership is terminated due to a breach of the Terms of Use, no refund will be issued under any circumstances.",
                    fullWidth: true
                },
                { 
                    icon: FaSyncAlt, 
                    title: "Request Process", 
                    content: "Contact support at +880 1313-197435 with your name and details. We review and respond within 14 business days.",
                    fullWidth: true
                }
            ].map((section, index) => (
                <div key={index} className={`bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:bg-white/10 group ${section.fullWidth ? 'md:col-span-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 transition-all duration-500 group-hover:bg-red-600 group-hover:text-white shrink-0">
                            <section.icon size={20} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                            {section.title}
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        {section.content}
                    </p>
                </div>
            ))}

            {/* Support CTA */}
            <div className="md:col-span-2 bg-gradient-to-br from-custom-yellow/20 to-custom-yellow/5 border border-custom-yellow/10 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center space-y-8 mt-10">
                <FaPhone className="text-5xl mx-auto text-custom-yellow/50" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Refund <span className="text-custom-yellow">Assistance</span></h2>
                <p className="text-gray-400 text-lg font-medium max-w-xl mx-auto">
                    Approved refunds are processed within 30 business days via the original payment method.
                </p>
                <div className="pt-4">
                    <a href="tel:01313197435" className="inline-block px-10 py-4 bg-custom-yellow text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all duration-500">
                        Contact Support
                    </a>
                </div>
            </div>

            <p className="md:col-span-2 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] pt-10">
                By purchasing our services, you agree to this Refund Policy.
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
