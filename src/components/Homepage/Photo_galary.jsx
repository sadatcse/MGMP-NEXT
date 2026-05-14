"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';
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
    };

    const closeModal = () => {
        setCurrentImage(null);
    };

    const nextImage = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="mt-10 pt-5 p-4 container mx-auto">
            <Title title="PHOTO GALLERY" subtitle="Watch Real Gym Pictures" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="cursor-pointer rounded-lg overflow-hidden relative group"
                        whileHover={{ scale: 1.05 }}
                        variants={fadeIn('up', index * 0.1)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        onClick={() => openModal(index)}
                    >
                        <img 
                            src={image.url}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                    </motion.div>
                ))}
            </div>

            {currentImage !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative">
                        <img src={images[currentImage].url} alt={`Gallery Image ${currentImage + 1}`} className="max-h-screen max-w-full rounded-lg" />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white bg-gray-800 bg-opacity-75 p-2 rounded-t-lg z-50">
                           <p className="text-center"> {images[currentImage].location}</p> 
                        </div>
                        <button
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 rounded-full p-2"
                            onClick={prevImage}
                        >
                            &#8592;
                        </button>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 rounded-full p-2"
                            onClick={nextImage}
                        >
                            &#8594;
                        </button>
                        <button
                            className="absolute top-2 right-2 text-white text-2xl bg-gray-800 rounded-full p-2"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
