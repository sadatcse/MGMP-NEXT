"use client";
import emailjs from '@emailjs/browser';
import React, { useState, useRef } from "react";
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaBuilding, FaUser, FaCommentDots, FaArrowRight, FaCheck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { fadeIn } from '../../lib/variants';
import { branches as sharedBranches } from '../data/branches';
import ShiyaMasjidImage from '../assets/img/photogalary/3.jpg';
import LalmatiaImage from '../assets/img/photogalary/4.jpg';

const Contact_us = () => {
    const [formData, setFormData] = useState({
        fullName: "",
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
                    fullName: '',
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

    const adaborMapUrl = "https://maps.app.goo.gl/HiinBe2YqhoaH58k7";

    const branchImages = {
        "shiya-masjid": ShiyaMasjidImage,
        lalmatia: LalmatiaImage,
    };

    const branchIconStyles = {
        "shiya-masjid": "bg-red-600 text-white shadow-lg shadow-red-600/20",
        lalmatia: "bg-custom-yellow text-black shadow-lg shadow-custom-yellow/20",
    };

    const branchData = [
        ...sharedBranches.map((branch) => ({
            ...branch,
            iconBg: branchIconStyles[branch.slug],
            image: branchImages[branch.slug],
        })),
        {
            id: "adabor",
            slug: null,
            name: "Power Fit — Adabor",
            tag: "NEW BRANCH",
            iconBg: "bg-red-600 text-white shadow-lg shadow-red-600/20",
            address: "5th & 6th Floors, 48/49 Jonota Cooperative Housing Society, Ring Road, Shyamoli, Adabor, Dhaka-1207.",
            phone: "(+880) 1313-197426",
            tel: "+8801313197426",
            mapUrl: adaborMapUrl,
            image: null,
        }
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white py-20 relative overflow-hidden">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grayscale bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/4c/c8/b1/4cc8b1f71fc788aa146a33704bed9cc3.jpg")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Side: Contact Info (Displays all 3 branches) */}
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
                                    className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 shadow-2xl hover:border-white/20"
                                >
                                    {branch.image && (
                                        <Link
                                            href={`/branches/${branch.slug}`}
                                            className="relative block h-40 w-full overflow-hidden"
                                        >
                                            <Image
                                                src={branch.image}
                                                alt={branch.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                            <span className="absolute bottom-3 left-4 text-[10px] font-black text-custom-yellow uppercase tracking-[0.3em]">
                                                {branch.tag}
                                            </span>
                                        </Link>
                                    )}
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-2xl ${branch.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div>
                                                {branch.slug ? (
                                                    <Link href={`/branches/${branch.slug}`}>
                                                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                                                            {branch.name}
                                                        </h3>
                                                    </Link>
                                                ) : (
                                                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors">
                                                        {branch.name}
                                                    </h3>
                                                )}
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
                                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                                    {branch.slug && (
                                                        <Link
                                                            href={`/branches/${branch.slug}`}
                                                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-white text-white hover:text-red-600 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-600/20"
                                                        >
                                                            Branch Page <FaArrowRight className="text-[10px]" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={branch.mapUrl}
                                                        target="_blank"
                                                        className="px-4 py-2 rounded-xl border border-custom-yellow/50 hover:border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-black text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
                                                    >
                                                        View Map →
                                                    </Link>
                                                </div>
                                            </div>
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

                            {/* Branch Selection with Tick Marks (Default: Shiya Masjid) */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1 block">
                                    Select Preferred Branch:
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        {
                                            value: "Shiya Masjid Branch",
                                            label: "Shiya Masjid",
                                            sub: "Main Branch",
                                            badgeBg: "bg-red-600 text-white"
                                        },
                                        {
                                            value: "Lalmatia Branch",
                                            label: "Lalmatia",
                                            sub: "Express Hub",
                                            badgeBg: "bg-custom-yellow text-black"
                                        },
                                        {
                                            value: "Power Fit — Adabor",
                                            label: "Power Fit",
                                            sub: "Adabor Branch",
                                            badgeBg: "bg-red-600 text-white"
                                        }
                                    ].map((item) => {
                                        const isSelected = formData.branch === item.value;
                                        return (
                                            <div
                                                key={item.value}
                                                onClick={() => setFormData({ ...formData, branch: item.value })}
                                                className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${
                                                    isSelected
                                                        ? "bg-white/10 border-custom-yellow shadow-[0_0_20px_rgba(244,203,113,0.25)] scale-[1.02]"
                                                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                                                        {item.sub}
                                                    </span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                                        isSelected
                                                            ? "bg-custom-yellow text-black shadow-md"
                                                            : "border border-white/20 bg-transparent text-transparent"
                                                    }`}>
                                                        <FaCheck className="text-xs font-black" />
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-black uppercase tracking-tight transition-colors ${
                                                    isSelected ? "text-custom-yellow" : "text-white"
                                                }`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Full Name & Phone Number Fields (Mandatory) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="+880..."
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20 font-medium"
                                    />
                                </div>
                            </div>

                            {/* Email Address Field */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                                    Email Address (Optional)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20 font-medium"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                                    Message
                                </label>
                                <textarea
                                    name="comments"
                                    placeholder="Tell us about your fitness goals or questions..."
                                    value={formData.comments}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 outline-none focus:border-custom-yellow transition-all duration-300 text-white placeholder:text-white/20 resize-none h-32 font-medium"
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
