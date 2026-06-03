"use client";
import React, { useState, useEffect } from 'react';
import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { TfiSearch } from "react-icons/tfi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialList = () => {
    const axiosSecure = UseAxioSecure();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/testimonial/get-all');
                setTestimonials(res.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const handleEdit = (testimonial) => {
        router.push(`/dashboard/testimonial_edit/${testimonial._id}`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This story will be removed permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Yes, delete it!',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/testimonial/delete/${id}`);
                const res = await axiosSecure.get('/testimonial/get-all');
                setTestimonials(res.data);
                setSelectedIds(prev => prev.filter(item => item !== id));
                Swal.fire({ title: 'Deleted!', text: 'Testimonial removed.', icon: 'success', background: '#1a1a1a', color: '#fff' });
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                Swal.fire('Error!', 'Failed to delete.', 'error');
            }
        }
    };

    const handleBulkDelete = async () => {
        const result = await Swal.fire({
            title: `Delete ${selectedIds.length} testimonials?`,
            text: "This action will permanently remove all selected stories!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Yes, delete all!',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                setIsLoading(true);
                await Promise.all(selectedIds.map(id => axiosSecure.delete(`/testimonial/delete/${id}`)));
                const res = await axiosSecure.get('/testimonial/get-all');
                setTestimonials(res.data);
                setSelectedIds([]);
                setIsLoading(false);
                Swal.fire({ title: 'Bulk Deleted!', text: 'Selected testimonials removed.', icon: 'success', background: '#1a1a1a', color: '#fff' });
            } catch (error) {
                setIsLoading(false);
                console.error('Error bulk deleting:', error);
                Swal.fire('Error!', 'Failed to delete some items.', 'error');
            }
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = updateTestimonialsData().map(t => t._id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const filteredData = testimonials.filter(t => 
        (t.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.comment || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateTestimonialsData = () => {
        const startIndex = currentPage * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    };

    const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="space-y-8 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        Success <span className="text-custom-yellow">Stories</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span>Dashboard</span>
                        <span className="text-red-600">/</span>
                        <span>Feedbacks</span>
                        <span className="text-red-600">/</span>
                        <span className="text-white">List View</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <AnimatePresence>
                        {selectedIds.length > 0 && (
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2 px-8 py-4 bg-red-600/10 text-red-500 border border-red-500/30 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all duration-300"
                            >
                                <AiOutlineDelete size={18} /> Delete Selected ({selectedIds.length})
                            </motion.button>
                        )}
                    </AnimatePresence>
                    <button 
                        onClick={() => router.push('/dashboard/testimonial_create')}
                        className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl shadow-red-600/20"
                    >
                        <AiOutlinePlus size={18} /> Add New Story
                    </button>
                </div>
            </div>

            {/* Table Control Area */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white/5 border border-white/5 p-4 rounded-3xl backdrop-blur-xl">
                <div className="flex-1 relative w-full group">
                    <TfiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search testimonials..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-red-600/50 transition-all font-bold text-sm text-white placeholder:text-gray-600"
                    />
                </div>
                <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="bg-black/40 border border-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl outline-none"
                >
                    <option value="10">10 Per Page</option>
                    <option value="25">25 Per Page</option>
                    <option value="50">50 Per Page</option>
                </select>
            </div>

            {/* Modern Table Layout */}
            <div className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/10 border-b border-white/10 text-white font-black uppercase tracking-widest text-[10px]">
                                <th className="px-8 py-6 w-24 text-center border-r border-white/5">
                                    <div className="flex items-center justify-center gap-2">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 cursor-pointer accent-red-600"
                                            checked={selectedIds.length === updateTestimonialsData().length && updateTestimonialsData().length > 0}
                                            onChange={handleSelectAll}
                                        />
                                        <span>ALL</span>
                                    </div>
                                </th>
                                <th className="px-8 py-6">Client</th>
                                <th className="px-8 py-6">Testimonial Content</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => <Skeleton key={i} />)
                            ) : (
                                updateTestimonialsData().map((testimonial) => (
                                    <tr key={testimonial._id} className={`group hover:bg-white/[0.02] transition-colors ${selectedIds.includes(testimonial._id) ? "bg-red-600/5" : ""}`}>
                                        <td className="px-8 py-6 text-center border-r border-white/5">
                                            <input 
                                                type="checkbox" 
                                                className="w-5 h-5 cursor-pointer accent-red-600"
                                                checked={selectedIds.includes(testimonial._id)}
                                                onChange={() => handleSelectOne(testimonial._id)}
                                            />
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0 flex items-center justify-center">
                                                    {testimonial.image ? (
                                                        <img src={testimonial.image} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <span className="text-[10px] text-gray-500 font-bold">N/A</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black uppercase text-white group-hover:text-custom-yellow transition-colors">{testimonial.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{testimonial.title || "Elite Member"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-bold text-gray-400 italic max-w-lg line-clamp-2">"{testimonial.comment}"</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => handleEdit(testimonial)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black transition-all"><FiEdit3 /></button>
                                                <button onClick={() => handleDelete(testimonial._id)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {!isLoading && filteredData.length === 0 && (
                    <div className="py-20 text-center text-gray-600 font-bold uppercase text-sm tracking-widest">No testimonials found</div>
                )}

                {/* Pagination */}
                <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Showing {updateTestimonialsData().length} of {filteredData.length}</p>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} className="p-2 rounded-xl bg-white/5 border border-white/5 disabled:opacity-20 hover:bg-white hover:text-black transition-all"><MdNavigateBefore size={20} /></button>
                        <button disabled={currentPage === numberOfPages - 1} onClick={() => setCurrentPage(p => p + 1)} className="p-2 rounded-xl bg-white/5 border border-white/5 disabled:opacity-20 hover:bg-white hover:text-black transition-all"><MdNavigateNext size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Skeleton = () => (
    <tr className="animate-pulse">
        <td className="px-8 py-6 border-r border-white/5"><div className="w-6 h-6 bg-white/5 rounded mx-auto"></div></td>
        <td className="px-8 py-6"><div className="flex gap-4"><div className="w-12 h-12 bg-white/5 rounded-2xl"></div><div className="space-y-2"><div className="w-32 h-4 bg-white/5 rounded-full"></div><div className="w-20 h-3 bg-white/5 rounded-full"></div></div></div></td>
        <td className="px-8 py-6"><div className="w-64 h-4 bg-white/5 rounded-full"></div></td>
        <td className="px-8 py-6 text-right"><div className="w-24 h-10 bg-white/5 rounded-xl ml-auto"></div></td>
    </tr>
);

export default TestimonialList;
