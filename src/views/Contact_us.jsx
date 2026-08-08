"use client";
import emailjs from '@emailjs/browser';
import React, { useState, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaBuilding, FaUser, FaCommentDots } from "react-icons/fa";
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
        branch: "Shiya Masjid Branch",
        comments: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Optional EmailJS notification
                const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
                const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
                const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

                if (serviceId && serviceId !== "service_id" && templateId && publicKey) {
                    try {
                        await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
                    } catch (emailErr) {
                        console.warn('EmailJS notification skipped/failed:', emailErr);
                    }
                }

                setIsSubmitting(false);
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
                    branch: 'Shiya Masjid Branch',
                    comments: ''
                });
            } else {
                throw new Error(data.message || 'Failed to submit contact message');
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error('Contact form submission failed:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    const location1 = "https://maps.app.goo.gl/L2GZcpb8eJvjwnyV8";
    const location2 = "https://maps.app.goo.gl/MLSf6A2evCgMXQBKA";
    const location3 = "https://maps.app.goo.gl/HiinBe2YqhoaH58k7";

    const branchData = [
        {
            id: "shia",
            name: "Shiya Masjid Branch",
            tag: "MAIN BRANCH",
            iconBg: "bg-red-600 text-white shadow-lg shadow-red-600/20",
            address: "24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka 1207",
            phone: "(+880) 1313-197435",
            tel: "+8801313197435",
            mapUrl: location1,
        },
        {
            id: "lalmatia",
            name: "Lalmatia Branch",
            tag: "EXPRESS HUB",
            iconBg: "bg-custom-yellow text-black shadow-lg shadow-custom-yellow/20",
            address: "Lalmatia Shopping Center (2nd floor), Beside Fire Service & Civil Defence, Lalmatia, Dhaka",
            phone: "(+880) 1313-197427",
            tel: "+8801313197427",
            mapUrl: location2,
        },
        {
            id: "adabor",
            name: "Power Fit — Adabor",
            tag: "NEW BRANCH",
            iconBg: "bg-red-600 text-white shadow-lg shadow-red-600/20",
            address: "5th & 6th Floors, 48/49 Jonota Cooperative Housing Society, Ring Road, Shyamoli, Adabor, Dhaka-1207.",
            phone: "(+880) 1313-197426",
            tel: "+8801313197426",
            mapUrl: location3,
        }
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white py-20 relative overflow-hidden">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grayscale bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/4c/c8/b1/4cc8b1f71fc788aa146a33704bed9cc3.jpg")' }}></div>
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
                            <p className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-4">
                                Connect With Us
                            </p>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                                Get In <span className="text-custom-yellow">Touch</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-red-600 rounded-full mb-8"></div>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                                Have questions about our memberships, locations, or facilities? Choose your nearest branch or send us a direct message.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                            {branchData.map((branch) => (
                                <div
                                    key={branch.id}
                                    className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-500 shadow-2xl hover:border-white/20"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-2xl ${branch.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                                                {branch.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-gray-400 font-medium flex gap-3">
                                            <span className="text-custom-yellow font-bold">Address:</span>
                                            {branch.address}
                                        </p>
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <p className="text-white font-black flex items-center gap-2">
                                                <FaPhoneAlt className="text-red-600" /> {branch.phone}
                                            </p>
                                            <Link
                                                href={branch.mapUrl}
                                                target="_blank"
                                                className="text-xs font-black text-custom-yellow uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
                                            >
                                                View Map →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

                            {/* Branch Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Preferred Branch</label>
                                <select
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white font-medium cursor-pointer"
                                >
                                    <option value="Shiya Masjid Branch" className="bg-[#1a1a1a] text-white">Shiya Masjid Branch</option>
                                    <option value="Lalmatia Branch" className="bg-[#1a1a1a] text-white">Lalmatia Branch</option>
                                    <option value="Power Fit — Adabor" className="bg-[#1a1a1a] text-white">Power Fit — Adabor</option>
                                </select>
                            </div>

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
                                disabled={isSubmitting}
                                className="w-full bg-red-600 hover:bg-white hover:text-red-600 transition-all duration-500 py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-xl shadow-red-600/20 disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact_us;


