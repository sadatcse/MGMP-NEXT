"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaTachometerAlt, FaBlog, FaUsers, FaSignOutAlt, FaRegBell, FaComments, FaGlobe } from 'react-icons/fa';
import { RiListCheck2 } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { AiOutlineTeam, AiOutlineUserAdd } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiX } from "react-icons/hi";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import logo from "../../assets/logo.png";
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onClose, theme, toggleTheme }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'User logged out successfully',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                }).then(() => {
                    router.push("/");
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: 'Please try again later.',
                    background: '#1a1a1a',
                    color: '#fff'
                });
                console.error(error);
            });
    };

    const menuGroups = [
        {
            title: "Overview",
            items: [
                { label: "Dashboard", icon: TbLayoutDashboard, href: "/dashboard" },
                { label: "Traffic Analytics", icon: FaGlobe, href: "/dashboard/traffic" },
            ]
        },
        {
            title: "Live Support",
            items: [
                { label: "Chat History", icon: FaComments, href: "/dashboard/chats" },
            ]
        },
        {
            title: "Content & Blogs",
            items: [
                { label: "View Posts", icon: RiListCheck2, href: "/dashboard/blog_view" },
                { label: "Create Post", icon: VscNewFile, href: "/dashboard/blog_create" },
            ]
        },
        {
            title: "Testimonials",
            items: [
                { label: "View Feedbacks", icon: LuMessagesSquare, href: "/dashboard/testimonial_view" },
                { label: "Add Review", icon: BiMessageSquareAdd, href: "/dashboard/testimonial_create" },
            ]
        },
        {
            title: "Elite Team",
            items: [
                { label: "Our Trainers", icon: AiOutlineTeam, href: "/dashboard/team_view" },
                { label: "Add Instructor", icon: AiOutlineUserAdd, href: "/dashboard/team_add" },
            ]
        },
        {
            title: "System Notice",
            items: [
                { label: "Manage Notices", icon: FaRegBell, href: "/dashboard/notice_view" },
                { label: "Push Notice", icon: VscNewFile, href: "/dashboard/notice_create" },
            ]
        }
    ];

    return (
        <div className="h-screen w-[280px] bg-[#0d0d0d] border-r border-white/5 flex flex-col overflow-hidden dashboard-theme-sidebar">
            {/* Logo Section */}
            <div className="p-8 mb-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <img src={logo.src} alt="Multigym Premium" className="w-10 h-10 object-contain" />
                    <span className="text-white font-black uppercase tracking-tighter text-lg leading-none">
                        Elite <br /><span className="text-custom-yellow">Admin</span>
                    </span>
                </Link>
                {/* Close button for mobile */}
                <button 
                    onClick={onClose}
                    className="lg:hidden p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-red-600 transition-all"
                >
                    <HiX size={20} />
                </button>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar pb-10">
                <nav className="space-y-8">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4 px-4">
                                {group.title}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item, itemIndex) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link 
                                            key={itemIndex}
                                            href={item.href}
                                            onClick={onClose}
                                            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                                                ${isActive 
                                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20" 
                                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <item.icon className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "text-gray-500 group-hover:text-red-600"}`} />
                                            <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Theme Toggle Section */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#0a0a0a]/50 flex items-center justify-between dashboard-theme-sidebar">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dashboard-theme-text-muted">
                    Theme Mode
                </span>
                <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-wider hover:bg-white/10 transition-all dashboard-theme-input"
                >
                    {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            {/* User Section */}
            <div className="p-6 border-t border-white/5 bg-[#0a0a0a] dashboard-theme-sidebar">
                <button 
                    onClick={handleLogOut}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/5 text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-500 font-black uppercase tracking-[0.2em] text-xs dashboard-theme-input"
                >
                    <CiLogout className="text-xl" />
                    Logout Account
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
