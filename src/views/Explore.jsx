"use client";
import React, { useState } from "react";
import Headerpage from "../components/Utility/Headerpage";
import Header from "../assets/img/headerimage/headerimage4.jpg";
import "./explore.css";
import Data from "./../../public/Data.json";
import { motion, AnimatePresence } from "framer-motion";

const Explore = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    
    const handleFilterChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(0);
    };

    const getFilteredData = () => {
        let filtered = Data;
        if (selectedCategory !== "") {
            filtered = Data.filter(item => item.category === selectedCategory);
        }
        return filtered;
    };

    const updateuserData = () => {
        const filteredData = getFilteredData();
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const filteredDataLength = getFilteredData().length;
    const numberOfPages = Math.ceil(filteredDataLength / itemsPerPage);

    const filterButtons = [
        { label: "All", category: "" },
        { label: "Cardio", category: "Cardio Machines" },
        { label: "Strength", category: "Strength Training Machines" },
        { label: "Legs", category: "Leg Machines" },
        { label: "Chest", category: "Chest Machines" },
        { label: "Biceps & Triceps", category: "Biceps and Triceps Machines" },
        { label: "Back", category: "Back Machines" },
        { label: "Core", category: "Core Training Equipment" },
    ];

    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <Headerpage
                imageUrl={Header}
                title="Explore"
                subtitle="Discover the elite equipment and professional tools designed to elevate your fitness journey to the next level."
            />

            <div className="container mx-auto px-4 py-20">
                {/* Filter Section */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {filterButtons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => handleFilterChange(button.category)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border-2
                                ${selectedCategory === button.category 
                                    ? "bg-custom-yellow border-custom-yellow text-black shadow-[0_0_20px_rgba(244,203,113,0.3)]" 
                                    : "bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                                }`}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {updateuserData().map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                key={item.name}
                                className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-neutral-900 border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-custom-yellow/5"
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={item.image} 
                                        alt={item.name} 
                                    />
                                </div>
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-custom-yellow font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                                            {item.category}
                                        </p>
                                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">
                                            {item.name}
                                        </h3>
                                        <div className="w-10 h-1 bg-red-600 rounded-full group-hover:w-full transition-all duration-700"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {updateuserData().length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl font-medium uppercase tracking-widest">No equipment found in this category</p>
                    </div>
                )}

                {/* Pagination */}
                {filteredDataLength > itemsPerPage && (
                    <div className='flex flex-col items-center justify-center mt-20 gap-8'>
                        <div className="flex flex-wrap justify-center items-center gap-3">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2
                                    ${currentPage === 0 
                                        ? 'border-white/5 text-gray-700 cursor-not-allowed' 
                                        : 'border-white/10 text-white hover:border-custom-yellow hover:text-custom-yellow'}`}
                                disabled={currentPage === 0}
                            >
                                <span className="text-xl">←</span>
                            </button>

                            <div className="flex gap-2">
                                {[...Array(numberOfPages)].map((_, index) => (
                                    <button
                                        onClick={() => setCurrentPage(index)}
                                        key={index}
                                        className={`w-12 h-12 rounded-2xl font-black transition-all duration-300 border-2
                                            ${currentPage === index 
                                                ? 'bg-custom-yellow border-custom-yellow text-black' 
                                                : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2
                                    ${currentPage === numberOfPages - 1 
                                        ? 'border-white/5 text-gray-700 cursor-not-allowed' 
                                        : 'border-white/10 text-white hover:border-custom-yellow hover:text-custom-yellow'}`}
                                disabled={currentPage === numberOfPages - 1}
                            >
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                        <p className='text-gray-500 text-sm font-bold uppercase tracking-[0.2em]'>
                            Page {currentPage + 1} of {numberOfPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
