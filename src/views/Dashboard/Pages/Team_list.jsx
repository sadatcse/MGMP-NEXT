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

const Team_list = () => {
    const axiosSecure = UseAxioSecure();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [trainers, setTrainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/trainer/get-all');
                setTrainers(res.data || []);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching trainers:', error);
            }
        };
        fetchData();
    }, [axiosSecure]);

    const handleEdit = (trainer) => {
        router.push(`/dashboard/team_edit/${trainer._id}`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This instructor will be removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Yes, remove them!',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/trainer/delete/${id}`);
                const res = await axiosSecure.get('/trainer/get-all');
                setTrainers(res.data || []);
                setSelectedIds(prev => prev.filter(item => item !== id));
                Swal.fire({ title: 'Removed!', text: 'Instructor deleted.', icon: 'success', background: '#1a1a1a', color: '#fff' });
            } catch (error) {
                console.error('Error deleting trainer:', error);
                Swal.fire('Error!', 'Failed to delete.', 'error');
            }
        }
    };

    const handleBulkDelete = async () => {
        const result = await Swal.fire({
            title: `Remove ${selectedIds.length} instructors?`,
            text: "This action will permanently remove all selected members!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#4b5563',
            confirmButtonText: 'Yes, remove all!',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                setIsLoading(true);
                await Promise.all(selectedIds.map(id => axiosSecure.delete(`/trainer/delete/${id}`)));
                const res = await axiosSecure.get('/trainer/get-all');
                setTrainers(res.data || []);
                setSelectedIds([]);
                setIsLoading(false);
                Swal.fire({ title: 'Bulk Removed!', text: 'Selected instructors deleted.', icon: 'success', background: '#1a1a1a', color: '#fff' });
            } catch (error) {
                setIsLoading(false);
                console.error('Error bulk deleting:', error);
                Swal.fire('Error!', 'Failed to delete some items.', 'error');
            }
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = updateUserData().map(t => t._id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const filteredData = trainers.filter(t => 
        (t.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.certification || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.role || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateUserData = () => {
        const startIndex = currentPage * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    };

    const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="space-y-8 pb-20 px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        Elite <span className="text-custom-yellow">Instructors</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span>Dashboard</span>
                        <span className="text-red-600">/</span>
                        <span>Team</span>
                        <span className="text-red-600">/</span>
                        <span className="text-white">Roster Management</span>
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
                                className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-300"
                            >
                                <AiOutlineDelete size={18} /> Remove ({selectedIds.length})
                            </motion.button>
                        )}
                    </AnimatePresence>
                    <button 
                        onClick={() => router.push('/dashboard/team_create')}
                        className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl shadow-red-600/20"
                    >
                        <AiOutlinePlus size={18} /> Add Instructor
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white/5 border border-white/5 p-4 rounded-3xl backdrop-blur-xl">
                <div className="flex-1 relative w-full">
                    <TfiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search instructors..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-red-600 transition-all font-bold text-sm text-white"
                    />
                </div>
                <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="bg-black/40 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl outline-none"
                >
                    <option value="10">10 Per Page</option>
                    <option value="25">25 Per Page</option>
                    <option value="50">50 Per Page</option>
                </select>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/10 border-b border-white/10 text-white font-black uppercase tracking-widest text-[10px]">
                                <th className="px-6 py-6 w-20 text-center border-r border-white/5">
                                    <input 
                                        type="checkbox" 
                                        className="w-5 h-5 cursor-pointer accent-red-600"
                                        checked={selectedIds.length === updateUserData().length && updateUserData().length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-6">Instructor Details</th>
                                <th className="px-6 py-6">Certification</th>
                                <th className="px-6 py-6">Status</th>
                                <th className="px-6 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => <Skeleton key={i} />)
                            ) : (
                                updateUserData().map((trainer) => (
                                    <tr key={trainer._id} className={`group hover:bg-white/[0.02] transition-colors ${selectedIds.includes(trainer._id) ? "bg-red-600/5" : ""}`}>
                                        <td className="px-6 py-6 text-center border-r border-white/5">
                                            <input 
                                                type="checkbox" 
                                                className="w-5 h-5 cursor-pointer accent-red-600"
                                                checked={selectedIds.includes(trainer._id)}
                                                onChange={() => handleSelectOne(trainer._id)}
                                            />
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0 flex items-center justify-center">
                                                    {trainer.image_url ? (
                                                        <img src={trainer.image_url} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <span className="text-[10px] text-gray-500 font-bold">N/A</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black uppercase text-white group-hover:text-custom-yellow transition-colors">{trainer.full_name}</p>
                                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{trainer.role || "Pro"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs font-bold text-gray-400 max-w-xs truncate">
                                            {trainer.certification || "Certified Expert"}
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-green-600/10 border border-green-600/20 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest">Active</span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => handleEdit(trainer)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black transition-all"><FiEdit3 /></button>
                                                <button onClick={() => handleDelete(trainer._id)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><AiOutlineDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && filteredData.length === 0 && (
                    <div className="py-20 text-center text-gray-600 font-bold uppercase text-sm tracking-widest">No instructors found</div>
                )}

                <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Showing {updateUserData().length} of {filteredData.length}</p>
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
        <td className="px-6 py-6 border-r border-white/5"><div className="w-5 h-5 bg-white/5 rounded mx-auto"></div></td>
        <td className="px-6 py-6"><div className="flex gap-4"><div className="w-12 h-12 bg-white/5 rounded-2xl"></div><div className="space-y-2"><div className="w-32 h-4 bg-white/5 rounded-full"></div><div className="w-20 h-3 bg-white/5 rounded-full"></div></div></div></td>
        <td className="px-6 py-6"><div className="w-48 h-4 bg-white/5 rounded-full"></div></td>
        <td className="px-6 py-6"><div className="w-20 h-6 bg-white/5 rounded-full"></div></td>
        <td className="px-6 py-6 text-right"><div className="w-24 h-10 bg-white/5 rounded-xl ml-auto"></div></td>
    </tr>
);

export default Team_list;
