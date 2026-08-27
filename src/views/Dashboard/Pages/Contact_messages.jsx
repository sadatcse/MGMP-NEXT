"use client";
import React, { useEffect, useState } from 'react';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaReply, 
  FaTrash, 
  FaSearch, 
  FaFilter, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEye, 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaExclamationCircle 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import UseAxioSecure from '../../../Hook/UseAxioSecure';

const Contact_messages = () => {
  const axiosSecure = UseAxioSecure();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);
      if (branchFilter !== 'all') queryParams.append('branch', branchFilter);
      if (searchTerm.trim()) queryParams.append('search', searchTerm.trim());

      const res = await axiosSecure.get(`/contact?${queryParams.toString()}`);
      if (res.data.success) {
        setMessages(res.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, branchFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/contact/${id}`, { status: newStatus });

      if (res.data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage((prev) => ({ ...prev, status: newStatus }));
        }

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Status changed to ${newStatus.toUpperCase()}`,
          showConfirmButton: false,
          timer: 2000,
          background: '#1a1a1a',
          color: '#fff',
        });
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This message will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#333',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#fff',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/contact/${id}`);

          if (res.data.success) {
            setMessages((prev) => prev.filter((msg) => msg._id !== id));
            if (selectedMessage && selectedMessage._id === id) {
              setSelectedMessage(null);
            }
            Swal.fire({
              title: 'Deleted!',
              text: 'Message has been removed.',
              icon: 'success',
              background: '#1a1a1a',
              color: '#fff',
              confirmButtonColor: '#dc2626',
            });
          }
        } catch (error) {
          console.error('Delete error:', error);
        }
      }
    });
  };

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      handleStatusChange(msg._id, 'read');
    }
  };

  // Stats calculation
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  const readCount = messages.filter((m) => m.status === 'read').length;
  const repliedCount = messages.filter((m) => m.status === 'replied').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Customer <span className="text-custom-yellow">Inquiries</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
            Manage contact form messages and branch inquiries stored in database
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-6 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Total Received</p>
            <h3 className="text-3xl font-black text-white mt-1">{loading ? '...' : totalCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xl">
            <FaEnvelope />
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-6 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-amber-400 font-black uppercase tracking-widest text-[10px]">Unread Messages</p>
            <h3 className="text-3xl font-black text-amber-400 mt-1">{loading ? '...' : unreadCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/20 flex items-center justify-center text-xl">
            <FaExclamationCircle />
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-6 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-blue-400 font-black uppercase tracking-widest text-[10px]">Read Messages</p>
            <h3 className="text-3xl font-black text-blue-400 mt-1">{loading ? '...' : readCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xl">
            <FaEnvelopeOpen />
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-6 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">Replied Messages</p>
            <h3 className="text-3xl font-black text-emerald-400 mt-1">{loading ? '...' : repliedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] flex flex-col lg:flex-row items-center justify-between gap-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-96">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none focus:border-custom-yellow transition-all"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-500" />
        </form>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-custom-yellow"
            >
              <option value="all" className="bg-[#1a1a1a]">All Status</option>
              <option value="unread" className="bg-[#1a1a1a]">Unread</option>
              <option value="read" className="bg-[#1a1a1a]">Read</option>
              <option value="replied" className="bg-[#1a1a1a]">Replied</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Branch:</span>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-custom-yellow"
            >
              <option value="all" className="bg-[#1a1a1a]">All Branches</option>
              <option value="Shiya Masjid Branch" className="bg-[#1a1a1a]">Shiya Masjid Branch</option>
              <option value="Lalmatia Branch" className="bg-[#1a1a1a]">Lalmatia Branch</option>
              <option value="Power Fit — Adabor" className="bg-[#1a1a1a]">Power Fit — Adabor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden p-6">
        {loading ? (
          <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
            Loading messages from database...
          </div>
        ) : messages.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <FaEnvelopeOpen className="mx-auto text-4xl text-gray-600" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              No contact messages found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/10">
                <tr>
                  <th className="pb-4 font-bold">Date & Time</th>
                  <th className="pb-4 font-bold">Sender</th>
                  <th className="pb-4 font-bold">Branch</th>
                  <th className="pb-4 font-bold">Message Preview</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg) => {
                  const isUnread = msg.status === 'unread';
                  const isReplied = msg.status === 'replied';

                  return (
                    <tr
                      key={msg._id}
                      className={`hover:bg-white/5 transition-colors ${
                        isUnread ? 'bg-white/[0.02] font-semibold text-white' : ''
                      }`}
                    >
                      <td className="py-4 font-mono text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="font-bold text-white uppercase text-xs tracking-tight">
                            {msg.fullName || `${msg.firstName || ''} ${msg.lastName || ''}`.trim() || 'Anonymous'}
                          </p>
                          <p className="text-[11px] text-gray-400">{msg.email}</p>
                          <p className="text-[11px] text-custom-yellow font-mono">{msg.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 text-xs font-medium text-gray-300">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider">
                          <FaMapMarkerAlt className="text-red-500" />
                          {msg.branch}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-gray-400 max-w-xs truncate" title={msg.comments}>
                        {msg.comments}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isUnread
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                              : isReplied
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {isUnread ? 'Unread' : isReplied ? 'Replied' : 'Read'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenMessage(msg)}
                            title="View Message"
                            className="p-2 bg-white/5 rounded-xl text-gray-300 hover:bg-custom-yellow hover:text-black transition-all"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(msg._id, isReplied ? 'read' : 'replied')
                            }
                            title={isReplied ? 'Mark as Read' : 'Mark as Replied'}
                            className={`p-2 rounded-xl transition-all ${
                              isReplied
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                : 'bg-white/5 text-gray-300 hover:bg-emerald-600 hover:text-white'
                            }`}
                          >
                            <FaReply />
                          </button>
                          <button
                            onClick={() => handleDelete(msg._id)}
                            title="Delete Message"
                            className="p-2 bg-white/5 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141414] border border-white/10 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-red-500 font-black uppercase text-[10px] tracking-[0.3em]">
                    Contact Message Details
                  </p>
                  <h3 className="text-2xl font-black uppercase text-white mt-1">
                    {selectedMessage.fullName || `${selectedMessage.firstName || ''} ${selectedMessage.lastName || ''}`.trim() || 'Anonymous'}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs">
                <div>
                  <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Email Address</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-custom-yellow font-bold hover:underline mt-1 block">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Phone Number</p>
                  <a href={`tel:${selectedMessage.phone}`} className="text-white font-mono font-bold mt-1 block">
                    {selectedMessage.phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Branch</p>
                  <p className="text-white font-bold mt-1">{selectedMessage.branch}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Submitted Date</p>
                  <p className="text-gray-400 font-mono mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-2">
                <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Message Content:</p>
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl text-gray-200 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedMessage.comments}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500">Status:</span>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                    className="bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="unread" className="bg-[#1a1a1a]">Unread</option>
                    <option value="read" className="bg-[#1a1a1a]">Read</option>
                    <option value="replied" className="bg-[#1a1a1a]">Replied</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Response from Multigym Premium (${selectedMessage.branch})`}
                    className="px-6 py-2.5 bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                  >
                    <FaReply /> Reply via Email
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="px-4 py-2.5 bg-white/5 hover:bg-red-600 text-gray-300 hover:text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact_messages;
