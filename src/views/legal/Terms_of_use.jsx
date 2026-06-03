"use client";
import React from 'react';
import { FaGavel, FaUserShield, FaRegHandshake, FaRegMoneyBillAlt, FaExclamationTriangle, FaBan, FaBalanceScale, FaSyncAlt, FaPhone, FaVideo, FaDumbbell } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const TermsOfUse = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-20 pb-20 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-red-600/5 blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div 
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
        >
            <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-4">Legal Documents</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Terms of <span className="text-custom-yellow">Use</span></h1>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Last updated: April 25, 2024</p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {[
                { 
                    icon: FaGavel, 
                    title: "Acceptance of Terms", 
                    content: "By using our services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our services." 
                },
                { 
                    icon: FaUserShield, 
                    title: "Use of Services", 
                    list: [
                        "You must be at least 18 years old to use our services.",
                        "You agree to use our services only for lawful purposes and in accordance with these Terms of Use.",
                        "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account."
                    ] 
                },
                { 
                    icon: FaRegHandshake, 
                    title: "Intellectual Property", 
                    content: "All content provided on our website and through our services, including text, graphics, logos, and images, is the property of Multigym Premium and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works of our content without our express written permission." 
                },
                { 
                    icon: FaRegMoneyBillAlt, 
                    title: "Membership and Payments", 
                    list: [
                        "Membership fees are due at the time of registration and are non-refundable.",
                        "We reserve the right to change our membership fees at any time with prior notice to our members."
                    ] 
                },
                { 
                    icon: FaExclamationTriangle, 
                    title: "Limitation of Liability", 
                    content: "Multigym Premium is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services. Our liability to you for any damages arising from or related to these terms shall not exceed the total amount paid by you to Multigym Premium in the past six months." 
                },
                { 
                    icon: FaBan, 
                    title: "Termination", 
                    content: "We reserve the right to terminate or suspend your membership and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users of our services or to Multigym Premium." 
                },
                { 
                    icon: FaVideo, 
                    title: "CCTV Surveillance", 
                    content: "We use CCTV cameras for 24-hour surveillance within our premises. If requested by the Bangladesh government for any purpose, we will provide the footage. The CCTV footage is also used for gym purposes. In case of any injury or death within the gym premises, Multigym Premium is not responsible." 
                },
                { 
                    icon: FaDumbbell, 
                    title: "Use of Equipment", 
                    content: "When using weights (in kilograms or pounds), you must ask a trainer for guidance. If you do not seek assistance, you take full responsibility for any injuries or damages that may occur." 
                },
                { 
                    icon: FaBalanceScale, 
                    title: "Governing Law", 
                    content: "These Terms of Use are governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law principles." 
                },
                { 
                    icon: FaSyncAlt, 
                    title: "Changes to Terms", 
                    content: "We may update these Terms of Use from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top." 
                }
            ].map((section, index) => (
                <div key={index} className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:bg-white/10 group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 transition-all duration-500 group-hover:bg-red-600 group-hover:text-white">
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
                        <ul className="space-y-4">
                            {section.list.map((item, i) => (
                                <li key={i} className="flex gap-4 text-gray-400 text-lg font-medium leading-relaxed">
                                    <span className="text-red-600 mt-2">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-red-600 to-red-900 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center space-y-8">
                <FaPhone className="text-5xl mx-auto text-white/50" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Need Clarification?</h2>
                <p className="text-white/80 text-lg font-medium max-w-xl mx-auto">
                    If you have any questions or concerns about these Terms of Use, our team is ready to assist you.
                </p>
                <div className="pt-4">
                    <a href="tel:01313197435" className="inline-block px-10 py-4 bg-white text-red-600 font-black uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all duration-500">
                        Call +880 1313-197435
                    </a>
                </div>
            </div>

            <p className="text-center text-gray-600 text-xs font-black uppercase tracking-[0.3em] pt-10">
                By using our services, you consent to these Terms of Use.
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfUse;
