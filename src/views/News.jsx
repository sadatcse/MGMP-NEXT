"use client";
import React, { useState, useEffect } from "react";
import NewsCard from "../components/Newspage/NewsCard";
import { motion } from 'framer-motion';
import { fadeIn } from '../../lib/variants';
import Spinner from "../components/Utility/Spinner"; 
import useAxiosPublic from "../Hook/useAxiosPublic";
import Title from "../components/Homepage/Title";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.get("/news/get-all");
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Cinematic Header */}
                <div className='flex flex-col items-center mb-20'>
                    <motion.div
                        variants={fadeIn('down', 0.2)}
                        initial='hidden'
                        animate='show'
                        className="mb-4"
                    >
                        <p className='text-red-600 font-black uppercase tracking-[0.5em] text-[10px] md:text-xs'>The Latest Updates</p>
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeIn('up', 0.4)}
                        initial='hidden'
                        animate='show'
                        className='text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none text-center mb-8'
                    >
                        Journal <span className="text-custom-yellow drop-shadow-[0_0_30px_rgba(244,203,113,0.3)]">&</span> News
                    </motion.h1>

                    <motion.div
                        variants={fadeIn('up', 0.6)}
                        initial='hidden'
                        animate='show'
                        className="w-24 h-1.5 bg-red-600 rounded-full mb-8"
                    ></motion.div>

                    <motion.p
                        variants={fadeIn('up', 0.8)}
                        initial='hidden'
                        animate='show'
                        className='max-w-[700px] mx-auto text-center text-gray-400 text-lg md:text-xl font-medium leading-relaxed italic'
                    >
                        "Explore insightful stories, expert tips, and the latest updates from the Multigym community."
                    </motion.p>
                </div>

                {/* News Section */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spinner />
                    </div>
                ) : (
                    <div className="space-y-20">
                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.sort((a, b) => new Date(b.date) - new Date(a.date)).map((newsItem, index) => (
                                <NewsCard key={newsItem._id} news={newsItem} index={index} />
                            ))}
                        </div>

                        {/* Pagination / Load More (Visual only for now) */}
                        <motion.div 
                            variants={fadeIn('up', 0.4)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex justify-center mt-20"
                        >
                            <button className="px-12 py-5 bg-transparent border-2 border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-2xl">
                                Load More Stories
                            </button>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
