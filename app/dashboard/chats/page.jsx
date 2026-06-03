"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaRobot, FaSearch, FaSync, FaPhoneAlt, FaEnvelope, FaLaptop, FaCalendarAlt, FaComments, FaDownload } from 'react-icons/fa';
import moment from 'moment';

export default function ChatHistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSessions = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch('/api/chat/session');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (selectedSession) {
          const updated = data.find(s => s._id === selectedSession._id);
          if (updated) {
            setSelectedSession(updated);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const exportAllLeadsToCSV = () => {
    if (sessions.length === 0) return;
    
    // CSV headers
    const headers = ['Name', 'Mobile', 'Email', 'IP Address', 'Initiated At', 'Last Active At', 'Messages Count'];
    
    // CSV rows
    const rows = sessions.map(s => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.mobile.replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${s.ip || '127.0.0.1'}"`,
      `"${moment(s.createdAt).format('YYYY-MM-DD HH:mm:ss')}"`,
      `"${moment(s.updatedAt).format('YYYY-MM-DD HH:mm:ss')}"`,
      s.messages?.length || 0
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `multigym_chat_leads_${moment().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSelectedTranscript = () => {
    if (!selectedSession) return;
    
    let content = `MULTIGYM PREMIUM - CHAT TRANSCRIPT\n`;
    content += `==================================\n`;
    content += `Name: ${selectedSession.name}\n`;
    content += `Mobile: ${selectedSession.mobile}\n`;
    content += `Email: ${selectedSession.email || 'N/A'}\n`;
    content += `IP Address: ${selectedSession.ip || '127.0.0.1'}\n`;
    content += `Date Initiated: ${moment(selectedSession.createdAt).format('lll')}\n`;
    content += `Last Active: ${moment(selectedSession.updatedAt).format('lll')}\n`;
    content += `==================================\n\n`;
    
    (selectedSession.messages || []).forEach((msg, idx) => {
      const sender = msg.role === 'user' ? selectedSession.name : 'AI Receptionist';
      const time = moment(msg.timestamp).format('YYYY-MM-DD HH:mm:ss');
      content += `[${time}] ${sender}:\n${msg.text}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transcript_${selectedSession.name.replace(/\s+/g, '_')}_${moment().format('YYYY-MM-DD')}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(session => {
    const q = searchQuery.toLowerCase();
    return (
      session.name.toLowerCase().includes(q) ||
      session.email.toLowerCase().includes(q) ||
      session.mobile.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Chat <span className="text-custom-yellow">Clients</span> & History
          </h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">
            Inspect customer leads and their complete AI receptionist conversations
          </p>
        </div>
        <div>
          <button
            onClick={() => fetchSessions(true)}
            disabled={refreshing || loading}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-500 shadow-lg shadow-red-600/20 disabled:opacity-50"
          >
            <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Chats'}
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
        {/* Left Side: Client/Leads list */}
        <div className="lg:col-span-4 bg-white/5 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col h-[650px] overflow-hidden">
          {/* Search bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-500 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          </div>

          <div className="flex items-center justify-between mb-3 px-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Active Chat Sessions ({filteredSessions.length})
            </p>
            {sessions.length > 0 && (
              <button
                onClick={exportAllLeadsToCSV}
                title="Export all leads to CSV"
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors focus:outline-none"
              >
                <FaDownload className="text-[8px]" /> Export CSV
              </button>
            )}
          </div>

          {/* List items container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-black">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-2 text-gray-500">
                <FaSync className="animate-spin text-xl text-amber-500" />
                <span className="text-xs uppercase tracking-widest font-black">Loading leads...</span>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-xs font-bold uppercase tracking-wider">
                No active chat sessions found
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isSelected = selectedSession?._id === session._id;
                const msgCount = session.messages?.length || 0;
                const lastMessage = session.messages?.[msgCount - 1]?.text || "No messages";
                
                return (
                  <motion.div
                    key={session._id}
                    onClick={() => setSelectedSession(session)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border text-left group
                      ${isSelected 
                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-sm uppercase tracking-wider truncate max-w-[70%]">
                        {session.name}
                      </h4>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-black/35 text-white' : 'bg-white/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors'}`}>
                        {msgCount} {msgCount === 1 ? 'msg' : 'msgs'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className={`truncate font-medium ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        {lastMessage}
                      </p>
                      <p className={`text-[10px] text-right mt-2 font-bold uppercase ${isSelected ? 'text-white/60' : 'text-gray-500'}`}>
                        {moment(session.updatedAt).fromNow()}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Chat client and history log */}
        <div className="lg:col-span-8 bg-white/5 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col h-[650px] overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedSession ? (
              <motion.div
                key={selectedSession._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full overflow-hidden"
              >
                {/* Right Pane Header */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Lead Profile & Transcript
                  </p>
                  <button
                    onClick={exportSelectedTranscript}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-xl text-gray-300 text-xs font-bold transition-all duration-300 focus:outline-none"
                  >
                    <FaDownload size={10} /> Export Transcript
                  </button>
                </div>

                {/* Selected Lead Details Grid Card */}
                <div className="bg-black/40 border border-white/5 rounded-3xl p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <FaUser className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</p>
                        <p className="font-bold text-white uppercase tracking-wide">{selectedSession.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <FaPhoneAlt className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mobile Number</p>
                        <p className="font-bold text-white">{selectedSession.mobile}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <FaEnvelope className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</p>
                        <p className="font-bold text-white">{selectedSession.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <FaLaptop className="text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">IP & Timestamp</p>
                        <p className="font-bold text-white text-xs">{selectedSession.ip || '127.0.0.1'} | {moment(selectedSession.createdAt).format('lll')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Chat Messages List */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-black flex flex-col">
                  {selectedSession.messages && selectedSession.messages.length > 0 ? (
                    selectedSession.messages.map((msg, index) => {
                      const isUser = msg.role === 'user';
                      return (
                        <div
                          key={msg._id || index}
                          className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 border mt-1
                              ${isUser 
                                ? 'bg-amber-500/20 border-amber-500 text-amber-500' 
                                : 'bg-red-600/20 border-red-500 text-red-500'
                              }`}
                            >
                              {isUser ? <FaUser /> : <FaRobot />}
                            </div>

                            {/* Bubble */}
                            <div className="space-y-1">
                              <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed
                                ${isUser 
                                  ? 'bg-gradient-to-br from-red-600 to-red-700 text-white rounded-tr-none shadow-lg shadow-red-600/10' 
                                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                }`}
                              >
                                <p className="whitespace-pre-line text-left">{msg.text}</p>
                              </div>
                              <p className={`text-[9px] font-bold uppercase text-gray-500 ${isUser ? 'text-right mr-2' : 'text-left ml-2'}`}>
                                {moment(msg.timestamp).format('LT')}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-20 text-gray-500 text-xs font-bold uppercase tracking-wider my-auto">
                      No message history found for this session.
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-6 text-gray-500"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-600 border border-white/5 shadow-inner">
                  <FaComments size={36} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">No Client Selected</h3>
                  <p className="text-xs text-gray-400 font-medium max-w-sm mt-2 leading-relaxed">
                    Select a lead session from the left sidebar to view their full details, connection IP, and chat transcripts.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
