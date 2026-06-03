"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../../src/views/Dashboard/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt2 } from "react-icons/hi";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('dashboard-theme') || 'dark';
        setTheme(storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('dashboard-theme', newTheme);
    };

    return (
        <div className={`flex bg-[#050505] min-h-screen text-white font-sans ${theme === 'light' ? 'light-mode' : ''} dashboard-theme-container`}>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Left Sidebar */}
            <aside className={`fixed top-0 left-0 h-full z-[70] transition-all duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px] lg:w-[280px]'}`}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} theme={theme} toggleTheme={toggleTheme} />
            </aside>
            
            {/* Main Content Area */}
            <main className="flex-1 min-h-screen relative lg:ml-[280px]">
                {/* Mobile Header */}
                <div className="lg:hidden p-6 flex items-center justify-between bg-black/40 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <span className="text-[10px] font-black italic text-white">MG</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-white">Elite Admin</span>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all border border-white/5"
                    >
                        <HiMenuAlt2 size={24} />
                    </button>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/5 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-custom-yellow/5 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
                
                {/* Content Container */}
                <div className="p-6 md:p-10 lg:p-14">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
