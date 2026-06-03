"use client";
import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { 
    FaGlobe, 
    FaCalendarDay, 
    FaCalendarAlt, 
    FaSearch, 
    FaLink, 
    FaDirections, 
    FaHistory, 
    FaMapMarkerAlt,
    FaArrowLeft,
    FaDownload,
    FaSync,
    FaFileCsv
} from 'react-icons/fa';
import { TfiSearch } from "react-icons/tfi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const TrafficAnalytics = () => {
    const axiosPublic = useAxiosPublic();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
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

    const [searchQuery, setSearchQuery] = useState("");
    const [sourceFilter, setSourceFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const res = await axiosPublic.get('/visitor/stats');
            if (res?.data?.success && res?.data?.stats) {
                setVisitorStats(res.data.stats);
            }
        } catch (error) {
            console.error('Error fetching visitor details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [axiosPublic]);

    // Handle CSV Export
    const handleExportCSV = () => {
        if (!visitorStats.recent || visitorStats.recent.length === 0) return;
        
        const headers = ["Timestamp,IP Address,Country,Traffic Source,Source Name,Landing Path,User Agent\n"];
        const rows = visitorStats.recent.map(log => {
            const time = new Date(log.createdAt).toLocaleString().replace(/,/g, ' ');
            const ip = log.ip || 'Unknown';
            const country = log.country || 'Unknown';
            const source = log.source || 'Direct';
            const sourceName = log.sourceName || 'Direct';
            const path = log.path || '/';
            const ua = log.userAgent ? log.userAgent.replace(/"/g, '""') : 'Unknown';
            return `"${time}","${ip}","${country}","${source}","${sourceName}","${path}","${ua}"`;
        });

        const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `multigym_visitor_logs_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter Logic
    const filteredLogs = visitorStats.recent.filter(log => {
        const matchesSearch = 
            (log.ip?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (log.country?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (log.path?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (log.sourceName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (log.source?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        
        const matchesSource = sourceFilter === "All" || log.source === sourceFilter;
        
        return matchesSearch && matchesSource;
    });

    // Pagination
    const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);
    const displayedLogs = filteredLogs.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Landing Page Aggregation from loaded logs
    const landingPageCounts = React.useMemo(() => {
        const counts = {};
        visitorStats.recent.forEach(log => {
            const p = log.path || '/';
            counts[p] = (counts[p] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [visitorStats.recent]);

    const totalTraffic = (visitorStats.sources.direct || 0) + (visitorStats.sources.searchEngine || 0) + (visitorStats.sources.referral || 0);
    const getPercent = (value) => {
        if (!totalTraffic) return 0;
        return Math.round((value / totalTraffic) * 100);
    };

    return (
        <div className="space-y-10">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-white transition-all duration-300"
                        title="Back to Control Panel"
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            Visitor <span className="text-custom-yellow">Analytics</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
                            Advanced Traffic Intelligence & Logs
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <button 
                        onClick={fetchStats}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
                    >
                        <FaSync className={isLoading ? "animate-spin" : ""} /> Refresh
                    </button>
                    <button 
                        onClick={handleExportCSV}
                        disabled={visitorStats.recent.length === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-500 shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:hover:bg-red-600 disabled:hover:text-white"
                    >
                        <FaFileCsv size={16} /> Export Logs
                    </button>
                </div>
            </div>

            {/* Quick Aggregate Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Today's Visitors", value: visitorStats.today, icon: FaCalendarDay, color: "from-amber-500/20 to-orange-500/20 border-orange-500/30", textCol: "text-orange-400" },
                    { label: "Yesterday's Visitors", value: visitorStats.yesterday, icon: FaHistory, color: "from-gray-500/10 to-slate-500/10 border-slate-500/20", textCol: "text-slate-400" },
                    { label: "Monthly Visitors", value: visitorStats.month, icon: FaCalendarAlt, color: "from-purple-500/25 to-pink-500/25 border-purple-500/30", textCol: "text-purple-400" },
                    { label: "Yearly Visitors", value: visitorStats.year, icon: FaGlobe, color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30", textCol: "text-blue-400" }
                ].map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`bg-gradient-to-br ${card.color} border p-8 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between h-36`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
                                {card.label}
                            </span>
                            <card.icon className={`${card.textCol} text-xl`} />
                        </div>
                        <span className="text-4xl font-black tracking-tighter text-white">
                            {isLoading ? "..." : card.value}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Sources, Demographics & Top Pages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Breakdown */}
                <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[3rem] space-y-6 dashboard-theme-card">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2 dashboard-theme-text-primary">
                        <FaGlobe className="text-custom-yellow" /> Channel Distribution
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

                {/* Countries Breakdown */}
                <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[3rem] space-y-6 dashboard-theme-card">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2 dashboard-theme-text-primary">
                        <FaMapMarkerAlt className="text-red-500" /> Top Countries
                    </h3>
                    {visitorStats.countries.length === 0 ? (
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs py-8 text-center">
                            No demographic logs found.
                        </p>
                    ) : (
                        <div className="space-y-4 max-h-[12rem] overflow-y-auto pr-2 custom-scrollbar">
                            {visitorStats.countries.map((c, i) => {
                                const maxCount = visitorStats.countries[0]?.count || 1;
                                const barWidth = Math.round((c.count / maxCount) * 100);
                                return (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                            <span className="text-gray-300">{c.name}</span>
                                            <span className="text-custom-yellow">{c.count} visits</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${barWidth}%` }}
                                                className="h-full bg-custom-yellow rounded-full"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Top Landing Paths */}
                <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-[3rem] space-y-6 dashboard-theme-card">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2 dashboard-theme-text-primary">
                        <FaLink className="text-blue-400" /> Popular Landing Paths
                    </h3>
                    <div className="space-y-3">
                        {landingPageCounts.map((page, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300">
                                <span className="font-mono text-xs text-gray-300 truncate max-w-[200px]" title={page.path}>
                                    {page.path}
                                </span>
                                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                    {page.count} hits
                                </span>
                            </div>
                        ))}
                        {landingPageCounts.length === 0 && (
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs py-8 text-center">
                                No landing paths logged.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Filter and Search controls */}
            <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[3rem] p-8 space-y-6 dashboard-theme-card">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <h3 className="text-lg font-black uppercase tracking-tighter text-white flex items-center gap-2 dashboard-theme-text-primary">
                        <FaHistory className="text-emerald-400" /> Traffic Event Logs
                    </h3>
                    
                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
                                placeholder="Search IP, Country, Referrer..."
                                className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-white font-bold placeholder-gray-500 focus:outline-none focus:border-custom-yellow transition-all duration-300 text-xs uppercase tracking-wider dashboard-theme-input"
                            />
                            <TfiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                        </div>

                        {/* Source Filter Dropdown */}
                        <select
                            value={sourceFilter}
                            onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(0); }}
                            className="w-full sm:w-48 px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-white font-bold focus:outline-none focus:border-custom-yellow transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer dashboard-theme-input"
                        >
                            <option value="All" className="bg-[#0f0f0f] text-white">All Sources</option>
                            <option value="Direct" className="bg-[#0f0f0f] text-white">Direct Traffic</option>
                            <option value="Search Engine" className="bg-[#0f0f0f] text-white">Search Engines</option>
                            <option value="Referral" className="bg-[#0f0f0f] text-white">Referrals</option>
                        </select>
                    </div>
                </div>

                {/* Table of logs */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs uppercase tracking-wider text-gray-500 border-b border-white/10">
                            <tr>
                                <th className="pb-4 font-bold">Time</th>
                                <th className="pb-4 font-bold">IP Address</th>
                                <th className="pb-4 font-bold">Country</th>
                                <th className="pb-4 font-bold">Referrer / Source</th>
                                <th className="pb-4 font-bold">Landing Path</th>
                                <th className="pb-4 font-bold">User Agent</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {displayedLogs.map((visitor, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors duration-200">
                                    <td className="py-4 font-mono text-xs text-gray-400">
                                        {new Date(visitor.createdAt).toLocaleString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
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
                                            <span className="truncate max-w-[120px]" title={visitor.referrer || visitor.sourceName}>
                                                {visitor.sourceName || visitor.source}
                                            </span>
                                        </span>
                                    </td>
                                    <td className="py-4 font-mono text-xs text-gray-400 max-w-[150px] truncate" title={visitor.path}>
                                        {visitor.path}
                                    </td>
                                    <td className="py-4 text-xs text-gray-500 max-w-[200px] truncate" title={visitor.userAgent}>
                                        {visitor.userAgent}
                                    </td>
                                </tr>
                            ))}
                            {displayedLogs.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        No visitor logs match the current search filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {pageCount > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                            Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
                        </span>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                                className="p-2 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-white/5 transition-all duration-300"
                            >
                                <MdNavigateBefore size={20} />
                            </button>
                            
                            {Array.from({ length: pageCount }).map((_, pageIdx) => {
                                // Only display a max of 5 page buttons around the current page
                                if (pageIdx === 0 || pageIdx === pageCount - 1 || Math.abs(pageIdx - currentPage) <= 1) {
                                    return (
                                        <button
                                            key={pageIdx}
                                            onClick={() => setCurrentPage(pageIdx)}
                                            className={`w-10 h-10 rounded-xl text-xs font-black transition-all duration-300 border ${
                                                currentPage === pageIdx
                                                    ? "bg-red-600 border-red-600 text-white"
                                                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white dashboard-theme-input"
                                            }`}
                                        >
                                            {pageIdx + 1}
                                        </button>
                                    );
                                }
                                if (pageIdx === 1 || pageIdx === pageCount - 2) {
                                    return <span key={pageIdx} className="text-gray-600 px-1 font-bold">...</span>;
                                }
                                return null;
                            })}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount - 1))}
                                disabled={currentPage === pageCount - 1}
                                className="p-2 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:hover:bg-white/5 transition-all duration-300"
                            >
                                <MdNavigateNext size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrafficAnalytics;
