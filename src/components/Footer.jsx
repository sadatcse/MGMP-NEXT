"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FaYoutube,
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaUsers,
    FaEye,
    FaGlobe,
    FaArrowRight,
    FaClock,
    FaBuilding,
    FaPaperPlane
} from "react-icons/fa";
import logo1 from "../assets/logo.png";
import android from "../assets/img/footer/playstore.png";
import ios from "../assets/img/footer/appsstore.png";
import moment from "moment/moment";
import Swal from 'sweetalert2';

const Footer = ({ initialStats }) => {
    const currentYear = moment().format('YYYY');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [stats, setStats] = useState({
        today: initialStats?.today ?? 0,
        total: initialStats?.total ?? 0,
        online: initialStats?.online ?? 1,
        loading: !initialStats
    });

    useEffect(() => {
        const fetchVisitorStats = async () => {
            try {
                // Log visitor session once per browser session
                if (typeof window !== 'undefined' && !sessionStorage.getItem('visited')) {
                    sessionStorage.setItem('visited', 'true');
                    fetch('/api/visitor/log', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            referrer: document.referrer || '',
                            path: window.location.pathname,
                            userAgent: navigator.userAgent
                        })
                    }).catch(err => console.warn('Visitor log failed:', err));
                }

                // Fetch real-time traffic statistics from backend
                const res = await fetch('/api/visitor/stats');
                const data = await res.json();
                if (res.ok && data.success && data.stats) {
                    setStats({
                        today: data.stats.today || 0,
                        total: data.stats.total || 0,
                        online: data.stats.online || 1,
                        loading: false
                    });
                }
            } catch (err) {
                console.warn('Failed to load visitor stats:', err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchVisitorStats();
        const interval = setInterval(fetchVisitorStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        Swal.fire({
            title: 'Subscribed!',
            text: 'Thank you for subscribing to Multigym Premium updates.',
            icon: 'success',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#dc2626'
        });
        setNewsletterEmail('');
    };

    return (
        <div className="bg-[#050505] text-white border-t border-white/10 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-custom-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

            <footer className="container mx-auto px-4 pt-16 pb-12 relative z-10">

                {/* Main 4-Column Footer Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                    {/* Column 1: Brand & Socials (4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image src={logo1} className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-105" alt="Multigym Logo" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black uppercase tracking-tighter leading-none">
                                    Multigym <span className="text-custom-yellow">Premium</span>
                                </span>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600 mt-1">
                                    Dhaka's #1 Elite Fitness Club
                                </span>
                            </div>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
                            Elevate your fitness journey with Dhaka's premier fitness destination. Featuring medical-grade InBody testing, SHUA international equipment, and certified personal trainers across all our branches.
                        </p>

                        <div className="space-y-3 pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                                Follow Us On Social Media
                            </span>
                            <div className="flex gap-3">
                                {[
                                    { Icon: FaFacebook, href: "https://www.facebook.com/MultiGymPremium/", label: "Facebook" },
                                    { Icon: FaInstagram, href: "https://www.instagram.com/multigym.premium/?hl=en", label: "Instagram" },
                                    { Icon: FaTiktok, href: "https://www.tiktok.com/@multigympremium", label: "TikTok" },
                                    { Icon: FaYoutube, href: "https://www.youtube.com/channel/UCC2cuCIe1HeeYWs5LvOF7jw", label: "YouTube" }
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black hover:border-custom-yellow hover:-translate-y-1 transition-all duration-300 shadow-lg"
                                    >
                                        <item.Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Branches & Direct Contact (3 Cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 border-b border-white/10 pb-3">
                            Our Branches & Contact
                        </h4>

                        <div className="space-y-5 text-sm">
                            <div className="group">
                                <Link href="/branches/shiya-masjid" className="font-bold text-white group-hover:text-custom-yellow transition-colors flex items-center gap-2">
                                    <FaBuilding className="text-red-600 text-xs" /> Shiya Masjid Branch
                                </Link>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka.
                                </p>
                            </div>

                            <div className="group">
                                <Link href="/branches/lalmatia" className="font-bold text-white group-hover:text-custom-yellow transition-colors flex items-center gap-2">
                                    <FaBuilding className="text-custom-yellow text-xs" /> Lalmatia Branch
                                </Link>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    2/1 Lalmatia, Block B, Ring Road, Dhaka.
                                </p>
                            </div>

                            <div className="group">
                                <a
                                    href="https://maps.app.goo.gl/fmpUb6kAQv3v2Y1m7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-white group-hover:text-custom-yellow transition-colors flex items-center gap-2"
                                >
                                    <FaBuilding className="text-red-600 text-xs" /> Power Fit — Adabor Branch
                                </a>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    Jonota Housing, Ring Road, Shyamoli, Adabor, Dhaka.
                                </p>
                            </div>

                            <div className="pt-2 border-t border-white/5 space-y-2">
                                <div className="flex items-center gap-3 text-xs text-gray-300">
                                    <FaPhoneAlt className="text-custom-yellow flex-shrink-0" />
                                    <span className="font-bold">01313-197435, 01313-197427, 01313-197426</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-300">
                                    <FaEnvelope className="text-custom-yellow flex-shrink-0" />
                                    <span>info@multigympremium.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Quick Navigation (2 Cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 border-b border-white/10 pb-3">
                            Quick Links
                        </h4>

                        <ul className="space-y-3 text-sm font-semibold text-gray-400">
                            {[
                                { name: 'About Us', path: '/aboutus/about' },
                                { name: 'Services & Facilities', path: '/service' },
                                { name: 'Our Trainers', path: '/trainers' },
                                { name: 'Notice Board', path: '/notice' },
                                { name: 'Explore Equipment', path: '/explore' },
                                { name: 'Contact Us', path: '/contactus' },

                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="hover:text-custom-yellow hover:translate-x-1.5 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <FaArrowRight className="text-[10px] text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: App & Hours (3 Cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 border-b border-white/10 pb-3">
                            Mobile App & Hours
                        </h4>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                                <FaClock className="text-custom-yellow" />
                                <span>Club Opening Hours:</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl text-xs space-y-1 font-medium text-gray-400">
                                <p className="flex justify-between">
                                    <span>Sat - Thu:</span> <span className="text-white font-bold">6:00 AM - 11:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Friday:</span> <span className="text-custom-yellow font-bold">3:00 PM - 10:00 PM</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                                Download Official Mobile App
                            </span>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.multi_gym&pli=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform duration-300 hover:scale-105"
                                >
                                    <Image src={android} alt="Play Store" className="h-11 w-auto object-contain" />
                                </a>
                                <a
                                    href="https://apps.apple.com/us/app/multi-gym-premium/id6746246182"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform duration-300 hover:scale-105"
                                >
                                    <Image src={ios} alt="App Store" className="h-11 w-auto object-contain" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </footer>

            {/* Single Horizontal Bottom Bar Line */}
            <div className="border-t border-white/10 py-6 bg-neutral-950/90">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">

                    {/* 1. Copyright */}
                    <div>
                        © {currentYear} Multigym Premium. All rights reserved.
                    </div>

                    {/* 2. Integrated Live Visitor Counter Pill */}
                    <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-gray-300">
                            <FaGlobe className="text-custom-yellow text-xs" /> Live:
                        </span>

                        <span className="flex items-center gap-1 text-[11px] font-bold">
                            <span className="text-gray-400 text-[10px] font-black uppercase">Today:</span>
                            <span className="text-custom-yellow font-black">{stats.loading ? '...' : stats.today.toLocaleString()}</span>
                        </span>

                        <span className="text-gray-600">•</span>

                        <span className="flex items-center gap-1 text-[11px] font-bold">
                            <span className="text-gray-400 text-[10px] font-black uppercase">Total:</span>
                            <span className="text-white font-black">{stats.loading ? '...' : stats.total.toLocaleString()}</span>
                        </span>

                        <span className="text-gray-600">•</span>

                        <span className="flex items-center gap-1.5 text-[11px] font-bold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 font-black">{stats.loading ? '...' : stats.online.toLocaleString()}</span>
                        </span>
                    </div>

                    {/* 3. Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-medium">
                        <Link href="/legal/termsofuse" className="hover:text-custom-yellow transition-colors">Terms of Use</Link>
                        <span>•</span>
                        <Link href="/legal/appprivacypolicy" className="hover:text-custom-yellow transition-colors">Privacy Policy</Link>
                        <span>•</span>
                        <Link href="/legal/refundpolicy" className="hover:text-custom-yellow transition-colors">Refund Policy</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
