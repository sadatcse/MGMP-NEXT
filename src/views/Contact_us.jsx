"use client";
import emailjs from '@emailjs/browser';
import React, { useState, useRef } from "react";
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaBuilding, FaUser, FaCommentDots, FaArrowRight, FaCheck, FaTimes, FaDirections } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../lib/variants';
import { branches as sharedBranches } from '../data/branches';
import ShiyaMasjidImage from '../assets/img/photogalary/3.jpg';
import LalmatiaImage from '../assets/img/photogalary/7.jpg';
import PowerFitImage from '../assets/img/photogalary/powerfit.jpg';

const Contact_us = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        branch: "Shiya Masjid Branch",
        comments: ""
    });

    const [selectedMapBranch, setSelectedMapBranch] = useState(null);
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

    const branchImages = {
        "shiya-masjid": ShiyaMasjidImage,
        lalmatia: LalmatiaImage,
        adabor: PowerFitImage,
    };

    const branchIconStyles = {
        "shiya-masjid": "bg-red-600 text-white shadow-lg shadow-red-600/20",
        lalmatia: "bg-custom-yellow text-black shadow-lg shadow-custom-yellow/20",
        adabor: "bg-red-600 text-white shadow-lg shadow-red-600/20",
    };

    const branchData = sharedBranches.map((branch) => ({
        ...branch,
        iconBg: branchIconStyles[branch.slug] || "bg-red-600 text-white shadow-lg shadow-red-600/20",
        image: branchImages[branch.slug] || null,
    }));

    const selectedSlug =
        formData.branch?.includes("Lalmatia") ? "lalmatia" :
            (formData.branch?.includes("Adabor") || formData.branch?.includes("Power Fit")) ? "adabor" :
                "shiya-masjid";

    const sortedBranchData = [...branchData].sort((a, b) => {
        const aMatch = a.slug === selectedSlug;
        const bMatch = b.slug === selectedSlug;
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
    });

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white py-20 relative overflow-hidden">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none grayscale bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pinimg.com/736x/4c/c8/b1/4cc8b1f71fc788aa146a33704bed9cc3.jpg")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Side: Contact Info (Displays all 3 branches, selected branch moved to 1st place) */}
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
                                Have questions about our memberships, locations, or facilities? Select your preferred branch to bring its address and details right to the top.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <AnimatePresence mode="popLayout">
                                {sortedBranchData.map((branch) => {
                                    const isSelectedCard = branch.slug === selectedSlug;
                                    return (
                                        <motion.div
                                            key={branch.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                                            onClick={() => {
                                                setSelectedMapBranch(branch);
                                                if (branch.slug === "lalmatia") setFormData(prev => ({ ...prev, branch: "Lalmatia Branch" }));
                                                else if (branch.slug === "adabor") setFormData(prev => ({ ...prev, branch: "Power Fit — Adabor" }));
                                                else setFormData(prev => ({ ...prev, branch: "Shiya Masjid Branch" }));
                                            }}
                                            className={`group border rounded-[2rem] overflow-hidden transition-all duration-500 shadow-2xl cursor-pointer relative ${isSelectedCard
                                                    ? "bg-white/10 border-custom-yellow/70 shadow-[0_0_30px_rgba(244,203,113,0.15)] ring-2 ring-custom-yellow/30"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-custom-yellow/40"
                                                }`}
                                        >
                                            {/* Click for Map badge overlay on card top right */}
                                            <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md border border-custom-yellow/30 text-custom-yellow group-hover:bg-custom-yellow group-hover:text-black transition-all duration-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                                <FaMapMarkerAlt className="text-xs" />
                                                <span>Click for Map</span>
                                            </div>

                                            {branch.image && (
                                                <div className="relative block h-44 w-full overflow-hidden">
                                                    <Image
                                                        src={branch.image}
                                                        alt={branch.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                                    <span className="absolute bottom-3 left-4 text-[10px] font-black text-custom-yellow uppercase tracking-[0.3em] bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-custom-yellow/20">
                                                        {branch.tag}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="p-8">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className={`w-12 h-12 rounded-2xl ${branch.iconBg} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                        <FaMapMarkerAlt />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors flex items-center gap-2">
                                                            {branch.name}
                                                        </h3>
                                                        {!branch.image && (
                                                            <span className="inline-block mt-1 text-[9px] font-black text-custom-yellow uppercase tracking-[0.2em] bg-custom-yellow/10 px-2 py-0.5 rounded border border-custom-yellow/30">
                                                                {branch.tag}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-gray-400 font-medium flex gap-3 leading-relaxed">
                                                        <span className="text-custom-yellow font-bold shrink-0">Address:</span>
                                                        {branch.address}
                                                    </p>
                                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                                        <p className="text-white font-black flex items-center gap-2">
                                                            <FaPhoneAlt className="text-red-600" /> {branch.phone}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            {(() => {
                                                                const isAdabor = branch.id === "adabor" || branch.slug === "adabor";
                                                                const branchHref = isAdabor ? "https://powerfitbd.com/" : `/branches/${branch.slug}`;
                                                                const isExternal = isAdabor;

                                                                return (
                                                                    <a
                                                                        href={branchHref}
                                                                        target={isExternal ? "_blank" : "_self"}
                                                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-white text-white hover:text-red-600 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-600/20"
                                                                    >
                                                                        Branch Page <FaArrowRight className="text-[10px]" />
                                                                    </a>
                                                                );
                                                            })()}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedMapBranch(branch);
                                                                }}
                                                                className="px-4 py-2 rounded-xl border border-custom-yellow/50 hover:border-custom-yellow text-custom-yellow hover:bg-custom-yellow hover:text-black text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-custom-yellow/20"
                                                            >
                                                                <FaMapMarkerAlt className="text-xs" /> View Map →
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
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
                                                className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${isSelected
                                                        ? "bg-white/10 border-custom-yellow shadow-[0_0_20px_rgba(244,203,113,0.25)] scale-[1.02]"
                                                        : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                                                        {item.sub}
                                                    </span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected
                                                            ? "bg-custom-yellow text-black shadow-md"
                                                            : "border border-white/20 bg-transparent text-transparent"
                                                        }`}>
                                                        <FaCheck className="text-xs font-black" />
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-black uppercase tracking-tight transition-colors ${isSelected ? "text-custom-yellow" : "text-white"
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

            {/* Google Map Modal Popup */}
            <AnimatePresence>
                {selectedMapBranch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md"
                        onClick={() => setSelectedMapBranch(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-[#121212] border border-white/15 rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-[0_0_60px_rgba(239,68,68,0.2)] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl ${selectedMapBranch.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight">
                                                {selectedMapBranch.name}
                                            </h3>
                                            <span className="text-[10px] font-black text-custom-yellow uppercase tracking-widest bg-custom-yellow/10 border border-custom-yellow/30 px-2.5 py-0.5 rounded-full">
                                                {selectedMapBranch.tag}
                                            </span>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-300 font-medium mt-1">
                                            {selectedMapBranch.address}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMapBranch(null)}
                                    className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-red-600 text-white flex items-center justify-center text-lg transition-colors border border-white/10 shrink-0"
                                    aria-label="Close Google Map Modal"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Live Interactive Google Map Frame */}
                            <div className="h-[380px] md:h-[480px] w-full bg-black relative">
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedMapBranch.mapEmbedQuery)}&output=embed`}
                                    title={`${selectedMapBranch.name} Google Map Location`}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Branch Selector Tabs inside Modal */}
                            <div className="bg-[#181818] px-6 py-3 border-t border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                                    Switch Branch Location:
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                    {branchData.map((b) => (
                                        <button
                                            key={b.id}
                                            onClick={() => setSelectedMapBranch(b)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${selectedMapBranch.id === b.id
                                                    ? "bg-custom-yellow text-black shadow-md shadow-custom-yellow/20"
                                                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <FaMapMarkerAlt className="text-[10px]" /> {b.name.split('—')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer / Actions */}
                            <div className="p-6 bg-white/5 flex flex-wrap items-center justify-between gap-4">
                                <a
                                    href={`tel:${selectedMapBranch.tel}`}
                                    className="text-white font-black text-sm flex items-center gap-2 hover:text-red-500 transition-colors"
                                >
                                    <FaPhoneAlt className="text-red-600" /> {selectedMapBranch.phone}
                                </a>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href={selectedMapBranch.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-white text-white hover:text-red-600 text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-red-600/20"
                                    >
                                        <FaDirections className="text-sm" /> Open Google Maps App ↗
                                    </a>
                                    <button
                                        onClick={() => setSelectedMapBranch(null)}
                                        className="px-5 py-3 rounded-2xl border border-white/20 hover:border-white text-gray-300 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact_us;

