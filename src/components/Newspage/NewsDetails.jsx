"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SlSocialReddit, SlSocialTwitter } from "react-icons/sl";
import { TiSocialPinterestCircular } from "react-icons/ti";
import { CiFacebook } from "react-icons/ci";
import { FaClock, FaArrowLeft, FaTag, FaCalendarAlt, FaTimes, FaExpand } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithLoader from '../Utility/ImageWithLoader';
import { fadeIn } from '../../../lib/variants';

const NewsDetails = ({ post, related = [] }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ob = post;
    const news = related;
    const id = post._id;

    const openModal = () => {
        setIsModalOpen(true);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'unset';
        }
    };

    const calculateReadingTime = (text) => {
        const wordsPerMinute = 200;
        const words = text ? text.split(/\s+/).length : 0;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    const readingTime = ob.description ? calculateReadingTime(ob.description) : 0;

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-10 pb-20 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-10"
                >
                    <Link href="/" className="hover:text-custom-yellow transition-colors">Home</Link>
                    <span className="text-red-600">/</span>
                    <Link href="/blog" className="hover:text-custom-yellow transition-colors">News</Link>
                    <span className="text-red-600">/</span>
                    <span className="text-white line-clamp-1">{ob.title}</span>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Article Body */}
                    <motion.div 
                        variants={fadeIn('up', 0.2)}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-8 space-y-10"
                    >
                        {/* Header */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-2xl">
                                {ob.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-red-600" />
                                    <span>
                                        {new Date(ob.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-red-600" />
                                    <span>{readingTime} min read</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-red-600/10 rounded-full border border-red-600/20 text-red-500">
                                    <FaTag className="text-[10px]" />
                                    <span>{ob.category || "Fitness"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Article Image (mobile/tablet only) */}
                        <div 
                            onClick={openModal} 
                            className="lg:hidden rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 cursor-pointer relative group"
                        >
                            <ImageWithLoader 
                                src={ob.image} 
                                alt={ob.title} 
                                width={800} 
                                height={600} 
                                unoptimized 
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-widest backdrop-blur-[2px] z-20">
                                <FaExpand size={14} className="text-custom-yellow" /> Click to enlarge
                            </div>
                        </div>

                        {/* Content */}
                        <div 
                            dangerouslySetInnerHTML={createMarkup(ob.description)} 
                            className="prose prose-invert prose-p:text-gray-300 prose-p:text-lg md:prose-p:text-xl prose-p:leading-relaxed prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-custom-yellow max-w-none"
                        />

                        {/* Back Button */}
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-red-600 hover:text-white transition-all group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                            <span>Return to Blog</span>
                        </button>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.aside 
                        variants={fadeIn('left', 0.4)}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-4 space-y-10"
                    >
                        {/* Sticky Image Card */}
                        <div className="sticky top-28 space-y-8">
                            <div className="rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
                                <div 
                                    onClick={openModal} 
                                    className="hidden lg:block relative group cursor-pointer overflow-hidden rounded-t-[3rem]"
                                >
                                    <ImageWithLoader 
                                        src={ob.image} 
                                        alt={ob.title} 
                                        width={800} 
                                        height={600} 
                                        unoptimized 
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-widest backdrop-blur-[2px] z-20">
                                        <FaExpand size={14} className="text-custom-yellow" /> Click to enlarge
                                    </div>
                                </div>
                                
                                <div className="bg-white/5 backdrop-blur-xl p-10 border-t border-white/5 space-y-10">
                                    {/* Stats */}
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-2">Category</p>
                                            <p className="text-xl font-black text-white uppercase tracking-tight">{ob.category || "Lifestyle"}</p>
                                        </div>
                                        
                                        {ob.tags && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Tags</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(ob.tags) ? ob.tags.map((tag, i) => (
                                                        <span key={i} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 border border-white/10 uppercase tracking-widest">
                                                            {tag}
                                                        </span>
                                                    )) : (
                                                        <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 border border-white/10 uppercase tracking-widest">
                                                            {ob.tags}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Socials */}
                                    <div className="space-y-6">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Share Story</p>
                                        <div className="flex gap-4">
                                            {[CiFacebook, SlSocialTwitter, SlSocialReddit, TiSocialPinterestCircular].map((Icon, i) => (
                                                <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black transition-all duration-300 border border-white/10">
                                                    <Icon size={24} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Newsletter */}
                                    <div className="space-y-6 pt-6 border-t border-white/5">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Get Updates</p>
                                        <div className="space-y-4">
                                            <input 
                                                type="text" 
                                                placeholder="ENTER EMAIL" 
                                                className="w-full bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl outline-none focus:border-custom-yellow transition-colors text-xs font-black tracking-widest uppercase" 
                                            />
                                            <button className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-red-600 transition-all duration-500 shadow-xl shadow-red-600/20">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>

                {/* Related Posts */}
                <motion.section 
                    variants={fadeIn('up', 0.6)}
                    initial="hidden"
                    animate="show"
                    className="mt-32 space-y-12"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Related <span className="text-custom-yellow">Stories</span></h2>
                        <Link href="/blog" className="text-xs font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors">View All News →</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {news.filter(n => n._id !== id).slice(0, 4).map((item) => (
                            <Link href={`/blog/${item._id}`} key={item._id} className="group relative bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white/10">
                                <div className="relative h-56 overflow-hidden">
                                    <Image src={item.image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                                </div>
                                <div className="p-8 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-red-600">
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-custom-yellow transition-colors line-clamp-2 leading-tight">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.section>
            </div>

            {/* Fullscreen Lightbox Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10 select-none cursor-zoom-out"
                        onClick={closeModal}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-300 shadow-2xl border border-white/20"
                            aria-label="Close image preview"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Modal Image Box */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(244,203,113,0.15)] bg-black/60 p-2">
                                <img 
                                    src={ob.image} 
                                    alt={ob.title} 
                                    className="max-h-[80vh] max-w-full object-contain rounded-2xl"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h4 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">{ob.title}</h4>
                                <p className="text-xs text-custom-yellow font-bold uppercase tracking-widest mt-1">Click anywhere outside to close</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewsDetails;
