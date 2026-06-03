"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
import { FaChevronLeft, FaChevronRight, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import Title from './Title';

import Image1 from "./../../assets/img/photogalary/1.jpg";
import Image2 from "./../../assets/img/photogalary/2.jpg";
import Image3 from "./../../assets/img/photogalary/3.jpg";
import Image4 from "./../../assets/img/photogalary/4.jpg";
import Image5 from "./../../assets/img/photogalary/5.jpg";
import Image6 from "./../../assets/img/photogalary/6.jpg";
import Image7 from "./../../assets/img/photogalary/7.jpg";
import Image8 from "./../../assets/img/photogalary/8.jpg";
import Image9 from "./../../assets/img/photogalary/9.jpg";
import Image10 from "./../../assets/img/photogalary/10.jpg";

const images = [
    { url: Image1.src, location: "Shia Masjid Branch" },
    { url: Image2.src, location: "Shia Masjid Branch" },
    { url: Image3.src, location: "Shia Masjid Branch" },
    { url: Image4.src, location: "Lalmatia Branch" },
    { url: Image5.src, location: "Lalmatia Branch" },
    { url: Image6.src, location: "Shia Masjid Branch" },
    { url: Image7.src, location: "Lalmatia Branch" },
    { url: Image8.src, location: "Lalmatia Branch" },
    { url: Image9.src, location: "Lalmatia Branch" },
    { url: Image10.src, location: "Shia Masjid Branch" }
];

const PhotoGallery = () => {
    const [currentImage, setCurrentImage] = useState(null);

    const openModal = (index) => {
        setCurrentImage(index);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setCurrentImage(null);
        document.body.style.overflow = 'unset';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <section className="py-20 bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
                {/* Standard Title Component */}
                <Title title="Our Facilities" subtitle="Photo Gallery" />

                {/* Grid adjusted to 2 columns on mobile and 3 on large screens as per "2 line" request */}
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn('up', (index % 3) * 0.1)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="relative group cursor-pointer rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl aspect-square"
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image.url}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-custom-yellow" />
                                    <p className="text-white font-black uppercase text-xs tracking-widest">
                                        {image.location}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {currentImage !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-sm z-[100] p-4 md:p-10"
                            onClick={closeModal}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Main Image */}
                                <div className="relative group/modal w-full h-full flex items-center justify-center">
                                    <img
                                        src={images[currentImage].url}
                                        alt="Gallery Fullscreen"
                                        className="max-h-full max-w-full object-contain rounded-3xl shadow-[0_0_100px_rgba(244,203,113,0.1)]"
                                    />

                                    {/* Navigation Controls */}
                                    <button
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-custom-yellow hover:text-black text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/10"
                                        onClick={prevImage}
                                    >
                                        <FaChevronLeft className="text-xl md:text-2xl" />
                                    </button>

                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-custom-yellow hover:text-black text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/10"
                                        onClick={nextImage}
                                    >
                                        <FaChevronRight className="text-xl md:text-2xl" />
                                    </button>
                                </div>

                                {/* Info Footer */}
                                <div className="mt-8 text-center bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-2xl">
                                    <p className="text-custom-yellow font-black uppercase tracking-[0.3em] text-xs mb-1">Location</p>
                                    <p className="text-white text-xl font-bold uppercase tracking-tight">{images[currentImage].location}</p>
                                </div>

                                {/* Close Button */}
                                <button
                                    className="absolute -top-4 -right-4 md:top-0 md:right-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl"
                                    onClick={closeModal}
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PhotoGallery;
