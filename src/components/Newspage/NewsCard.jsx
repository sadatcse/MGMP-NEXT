"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

// Utility function to strip HTML tags
const stripHtml = (html) => {
    if (typeof window === 'undefined') return "";
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const NewsCard = ({ news, index }) => {
    const { title, category, description, image, date, _id } = news;
    const cleanDescription = stripHtml(description);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='group flex flex-col bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2'
        >
            {/* Image Container */}
            <Link href={`/blog/${_id}`} className="relative block h-64 overflow-hidden">
                <img 
                    src={image} 
                    className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110' 
                    alt={title} 
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {category || "Latest News"}
                </div>
            </Link>

            {/* Content Container */}
            <div className='p-8 flex flex-col flex-grow'>
                {/* Date */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
                    <FaCalendarAlt className="text-red-600" />
                    <span>
                        {new Date(date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${_id}`}>
                    <h3 className='text-2xl font-black text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-custom-yellow transition-colors line-clamp-2'>
                        {title}
                    </h3>
                </Link>

                {/* Description Snippet */}
                <p className='text-gray-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3'>
                    {cleanDescription}
                </p>

                {/* Read More Link */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <Link 
                        href={`/blog/${_id}`} 
                        className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 group-hover:text-red-600 transition-colors"
                    >
                        Read Full Story <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsCard;
