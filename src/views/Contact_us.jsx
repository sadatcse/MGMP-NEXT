"use client";
import emailjs from '@emailjs/browser';
import React, { useState, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { fadeIn } from '../../lib/variants';

const Contact_us = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        zip: "",
        comments: ""
    });

    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        emailjs
          .sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id", 
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id", 
            form.current, 
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key"
          )
          .then(
            () => {
              Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for reaching out to us. We will get back to you soon.',
                icon: 'success',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
              });
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                zip: '',
                comments: ''
              });
            },
            (error) => {
              console.log('FAILED...', error.text);
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
              });
            },
          );
    };

    const location1 = "https://www.google.com/maps/place/Multi+Gym+Premium,+Shia+Masjid/@23.7627561,90.3565433,17z/data=!3m1!4b1!4m6!3m5!1s0x3755bf2476ff0fd5:0x55d28ddfdbff1096!8m2!3d23.7627561!4d90.3591182!16s%2Fg%2F11vdqj2fhv?entry=ttu";
    const location2 = "https://www.google.com/maps/place/Multi+Gym+Premium,+Lalmatia+Branch/@23.7583751,90.3683927,17z/data=!3m1!4b1!4m6!3m5!1s0x3755bf213d5bc75f:0xf5a881e8d0507a36!8m2!3d23.7583703!4d90.3732636!16s%2Fg%2F11w3d__h9_?entry=ttu";

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white py-20 relative overflow-hidden">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grayscale" style={{backgroundImage:'url("https://i.pinimg.com/736x/4c/c8/b1/4cc8b1f71fc788aa146a33704bed9cc3.jpg")', backgroundSize: 'cover'}}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Side: Contact Info */}
                    <motion.div 
                        variants={fadeIn('right', 0.2)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-col gap-12"
                    >
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                                Get In <span className="text-custom-yellow">Touch</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full mb-8"></div>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                                Have questions about our memberships or facilities? We're here to help you start your journey.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                            {/* Branch 1 */}
                            <div className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-xl shadow-lg shadow-red-600/20">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Mohammadpur Branch</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-400 font-medium flex gap-3">
                                        <span className="text-custom-yellow font-bold">Address:</span>
                                        24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka 1207
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <p className="text-white font-black flex items-center gap-2">
                                            <FaPhoneAlt className="text-red-600" /> (+880) 1313-197435
                                        </p>
                                        <Link 
                                            href={location1} 
                                            target="_blank" 
                                            className="text-xs font-black text-custom-yellow uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            View Map →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Branch 2 */}
                            <div className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-custom-yellow flex items-center justify-center text-xl text-black shadow-lg shadow-custom-yellow/20">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Lalmatia Branch</h3>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-400 font-medium flex gap-3">
                                        <span className="text-custom-yellow font-bold">Address:</span>
                                        Lalmatia Shopping Center (2nd floor), Beside Fire Service & Civil Defence, Lalmatia, Dhaka
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <p className="text-white font-black flex items-center gap-2">
                                            <FaPhoneAlt className="text-red-600" /> (+880) 1313-197427
                                        </p>
                                        <Link 
                                            href={location2} 
                                            target="_blank" 
                                            className="text-xs font-black text-custom-yellow uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            View Map →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        variants={fadeIn('left', 0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-custom-yellow/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8">Send us a message</h2>
                        
                        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">First Name</label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        placeholder="John" 
                                        required
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Last Name</label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        placeholder="Doe" 
                                        required
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="john@example.com" 
                                        required
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Phone Number</label>
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        placeholder="+880..." 
                                        required
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Message</label>
                                <textarea 
                                    name="comments" 
                                    placeholder="Tell us about your fitness goals..." 
                                    required
                                    value={formData.comments} 
                                    onChange={handleChange} 
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20 resize-none h-32"
                                ></textarea>
                            </div>

                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                By clicking submit, you agree to our <span className="text-red-600">Privacy Policy</span> and authorize Multigym Premium to contact you.
                            </p>

                            <button 
                                type="submit" 
                                className="w-full bg-red-600 hover:bg-white hover:text-red-600 transition-all duration-500 py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-red-600/20"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact_us;
