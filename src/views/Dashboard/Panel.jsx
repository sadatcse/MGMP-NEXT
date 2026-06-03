"use client";
import React, { useEffect, useState } from 'react';
import { 
    FaBlog, 
    FaUsers, 
    FaQuoteLeft, 
    FaRegBell, 
    FaPlus, 
    FaGlobe, 
    FaCalendarDay, 
    FaCalendarAlt, 
    FaSearch, 
    FaLink, 
    FaDirections, 
    FaHistory, 
    FaMapMarkerAlt 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import Link from 'next/link';

const Panel = () => {
    const axiosPublic = useAxiosPublic();
    const [stats, setStats] = useState({
        blogs: 0,
        trainers: 0,
        testimonials: 0,
        notices: 0
    });
    const [visitorStats, setVisitorStats] = useState({
        today: 0,
        yesterday: 0,
        month: 0,
        year: 0,
        sources: {
            direct: 0,
            searchEngine: 0,
            referral: 0
        },
        recent: [],
        countries: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [blogs, trainers, testimonials, notices, visitors] = await Promise.all([
                    axiosPublic.get('/news/get-all'),
                    axiosPublic.get('/trainer/get-all'),
                    axiosPublic.get('/testimonial/get-all').catch(() => ({ data: [] })),
                    axiosPublic.get('/notice/get-all').catch(() => ({ data: [] })),
                    axiosPublic.get('/visitor/stats').catch(() => ({ data: { success: false } }))
                ]);
                
                setStats({
                    blogs: blogs.data.length,
                    trainers: trainers.data.length,
                    testimonials: testimonials.data.length,
                    notices: notices.data.length
                });

                if (visitors?.data?.success && visitors?.data?.stats) {
                    setVisitorStats(visitors.data.stats);
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [axiosPublic]);

    const statCards = [
        { label: "Total Articles", value: stats.blogs, icon: FaBlog, color: "bg-blue-600", link: "/dashboard/blog_view" },
        { label: "Master Trainers", value: stats.trainers, icon: FaUsers, color: "bg-red-600", link: "/dashboard/team_view" },
        { label: "Success Stories", value: stats.testimonials, icon: FaQuoteLeft, color: "bg-custom-yellow", link: "/dashboard/testimonial_view" },
        { label: "Active Notices", value: stats.notices, icon: FaRegBell, color: "bg-purple-600", link: "/dashboard/notice_view" }
    ];

    const totalTraffic = (visitorStats.sources.direct || 0) + (visitorStats.sources.searchEngine || 0) + (visitorStats.sources.referral || 0);
    const getPercent = (value) => {
        if (!totalTraffic) return 0;
        return Math.round((value / totalTraffic) * 100);
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Elite <span className="text-custom-yellow">Control</span>
                    </h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
                        Multigym Premium Administrative Portal
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/dashboard/blog_create" className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-500 shadow-lg shadow-red-600/20">
                        <FaPlus /> New Article
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] group hover:bg-white/10 transition-all duration-500 dashboard-theme-card"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-4xl font-black tracking-tighter text-white dashboard-theme-text-primary">
                                {loading ? "..." : stat.value}
                            </span>
                        </div>
                        <Link href={stat.link}>
                            <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer hover:text-white transition-colors duration-300 dashboard-theme-text-gray">
                                {stat.label}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Visitor Stats Section */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                            Traffic & <span className="text-custom-yellow">Visitor Analytics</span>
                        </h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                            Real-time visitor logs and aggregate demographics
                        </p>
                    </div>
                    <Link href="/dashboard/traffic" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-300">
                        View Detailed Reports
                    </Link>
                </div>

                {/* Visitor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Today's Visitors", value: visitorStats.today, icon: FaCalendarDay, color: "from-amber-500/20 to-orange-500/20 border-orange-500/30", textCol: "text-orange-400" },
                        { label: "Yesterday's Visitors", value: visitorStats.yesterday, icon: FaHistory, color: "from-gray-500/10 to-slate-500/10 border-slate-500/20", textCol: "text-slate-400" },
                        { label: "Monthly Visitors", value: visitorStats.month, icon: FaCalendarAlt, color: "from-purple-500/25 to-pink-500/25 border-purple-500/30", textCol: "text-purple-400" },
                        { label: "Yearly Visitors", value: visitorStats.year, icon: FaGlobe, color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30", textCol: "text-blue-400" }
                    ].map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + idx * 0.05 }}
                            className={`bg-gradient-to-br ${card.color} border p-8 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between h-40`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
                                    {card.label}
                                </span>
                                <card.icon className={`${card.textCol} text-xl`} />
                            </div>
                            <span className="text-5xl font-black tracking-tighter text-white">
                                {loading ? "..." : card.value}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Sources & Countries Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Traffic Sources */}
                    <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[3rem] space-y-6 dashboard-theme-card">
                        <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
                            <FaGlobe className="text-custom-yellow" /> Traffic Sources
                        </h3>
                        <div className="space-y-5">
                            {[
                                { name: "Direct Traffic", val: visitorStats.sources.direct, color: "bg-gradient-to-r from-amber-500 to-orange-500" },
                                { name: "Search Engines", val: visitorStats.sources.searchEngine, color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
                                { name: "Referrals", val: visitorStats.sources.referral, color: "bg-gradient-to-r from-blue-500 to-indigo-500" }
                            ].map((src, i) => {
                                const pct = getPercent(src.val);
                                return (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className="text-gray-400">{src.name}</span>
                                            <span className="text-white">{pct}% <span className="text-gray-500 font-normal">({src.val})</span></span>
                                        </div>
                                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={`h-full ${src.color} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Geolocation Demographics */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[3rem] space-y-6 dashboard-theme-card">
                        <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" /> Geolocation Demographics
                        </h3>
                        {visitorStats.countries.length === 0 ? (
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs py-8 text-center">
                                No demographic logs found.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {visitorStats.countries.slice(0, 6).map((country, idx) => {
                                    const maxCount = visitorStats.countries[0]?.count || 1;
                                    const barWidth = Math.round((country.count / maxCount) * 100);
                                    return (
                                        <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                                <span className="text-gray-300 truncate max-w-[150px]">{country.name}</span>
                                                <span className="text-custom-yellow">{country.count} visits</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${barWidth}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="h-full bg-custom-yellow rounded-full"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Visitors Table */}
                <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[3rem] p-8 space-y-6 dashboard-theme-card">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2">
                        <FaHistory className="text-blue-400" /> Recent Visitor Activity
                    </h3>
                    <div className="overflow-x-auto max-h-[30rem] overflow-y-auto pr-2 custom-scrollbar">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs uppercase tracking-wider text-gray-500 border-b border-white/10">
                                <tr>
                                    <th className="pb-4 font-bold">Time</th>
                                    <th className="pb-4 font-bold">IP Address</th>
                                    <th className="pb-4 font-bold">Country</th>
                                    <th className="pb-4 font-bold">Referrer / Source</th>
                                    <th className="pb-4 font-bold">Landing Path</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {visitorStats.recent.map((visitor, idx) => (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors duration-200">
                                        <td className="py-4 font-mono text-xs text-gray-400">
                                            {new Date(visitor.createdAt).toLocaleString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="py-4 font-mono text-xs text-custom-yellow font-semibold">
                                            {visitor.ip}
                                        </td>
                                        <td className="py-4">
                                            <span className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-red-500 text-xs flex-shrink-0" />
                                                <span className="truncate max-w-[120px]" title={visitor.country}>{visitor.country}</span>
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                visitor.source === 'Direct' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                visitor.source === 'Search Engine' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            }`}>
                                                {visitor.source === 'Direct' ? <FaDirections /> :
                                                 visitor.source === 'Search Engine' ? <FaSearch /> : <FaLink />}
                                                <span className="truncate max-w-[150px]" title={visitor.referrer || visitor.sourceName}>
                                                    {visitor.sourceName || visitor.source}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="py-4 font-mono text-xs text-gray-400 max-w-[150px] truncate" title={visitor.path}>
                                            {visitor.path}
                                        </td>
                                    </tr>
                                ))}
                                {visitorStats.recent.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                            No visitor logs recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Welcome & Quote Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gradient-to-br from-red-600/20 to-red-900/40 border border-red-600/10 p-10 md:p-16 rounded-[4rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-red-600/20 transition-all duration-700"></div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
                            Elevate Your <br />
                            <span className="text-custom-yellow">Management</span> Experience
                        </h2>
                        <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-xl">
                            Welcome back, Admin. You have full control over the Multigym Premium digital ecosystem. Monitor stats, manage your elite team, and share inspiring stories with your community.
                        </p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-10 rounded-[4rem] flex flex-col justify-center items-center text-center space-y-6 relative group overflow-hidden dashboard-theme-card">
                    <div className="absolute inset-0 bg-custom-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"></div>
                    <FaQuoteLeft className="text-custom-yellow/30 text-5xl" />
                    <p className="text-xl font-bold italic text-gray-300 leading-relaxed relative z-10">
                        "So verily, with the hardship, there is relief."
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-custom-yellow relative z-10">
                        Quran 94:6
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Panel;
