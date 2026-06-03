"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaPaperPlane, FaTimes, FaRobot, FaTrash, FaSpinner, FaUser } from 'react-icons/fa';
import chatdata from '../data/chatdata.json';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Lead generation states
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', mobile: '' });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Load chat history from sessionStorage on mount
  useEffect(() => {
    const savedSessionId = sessionStorage.getItem('multigym_chat_session_id');
    const savedMessages = sessionStorage.getItem('multigym_chat_history');
    
    if (savedSessionId && savedMessages) {
      setSessionId(savedSessionId);
      setMessages(JSON.parse(savedMessages));
      setSessionStarted(true);
    } else {
      // Default welcome message
      const welcomeMessage = {
        id: 'welcome',
        role: 'model',
        text: `Welcome to Multigym Premium! 🏋️💪\nWe’re here to help you with anything you need — membership plans, pricing, branch locations, facilities, class schedules, and more. Feel free to ask us anytime!`
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to sessionStorage when updated
  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    sessionStorage.setItem('multigym_chat_history', JSON.stringify(newMessages));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.mobile.trim()) {
      setLeadError('Name and Mobile number are required');
      return;
    }
    setLeadLoading(true);
    setLeadError('');
    try {
      const response = await fetch('/api/chat/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadForm),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to initialize session');
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages(data.messages);
      sessionStorage.setItem('multigym_chat_session_id', data.sessionId);
      sessionStorage.setItem('multigym_chat_history', JSON.stringify(data.messages));
      setSessionStarted(true);
    } catch (err) {
      console.error('Lead submit error:', err);
      setLeadError(err.message || 'Server error, please try again.');
    } finally {
      setLeadLoading(false);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen, sessionStarted]);

  // Handle message send
  const handleSend = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text || text.trim() === '') return;

    // Clear input field if custom typed
    if (!textToSend) {
      setInputText('');
    }

    // Add user message to state
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim()
    };
    const updatedMessages = [...messages, userMsg];
    saveMessages(updatedMessages);
    setIsLoading(true);

    try {

      const apiHistory = updatedMessages
        .filter(msg => msg.id !== 'welcome')
        .slice(0, -1); // exclude the newly added user message from history array parameter since it is passed as the main request parameter

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.text,
          history: apiHistory,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('API failed to respond');
      }

      const data = await response.json();

      const modelMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.response
      };

      saveMessages([...updatedMessages, modelMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm sorry, I'm having trouble connecting to the server. Please verify your connection and try again."
      };
      saveMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    sessionStorage.removeItem('multigym_chat_session_id');
    sessionStorage.removeItem('multigym_chat_history');
    setSessionId(null);
    setSessionStarted(false);
    setLeadForm({ name: '', email: '', mobile: '' });
    
    const welcomeMessage = {
      id: 'welcome',
      role: 'model',
      text: `Welcome to Multigym Premium! 🏋️💪\nWe’re here to help you with anything you need — membership plans, pricing, branch locations, facilities, class schedules, and more. Feel free to ask us anytime!`
    };
    setMessages([welcomeMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white flex items-center justify-center shadow-[0_8px_30px_rgb(239,68,68,0.4)] border border-white/20 relative group overflow-hidden focus:outline-none"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <FaComments className="text-2xl" />
              {/* Pulsing indicator badge */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-red-600 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-red-600"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute bottom-20 right-0 w-[360px] sm:w-[400px] h-[550px] rounded-[2.5rem] bg-black/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#131313] via-[#1f1a1a] to-[#131313] border-b border-white/10 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 shadow-inner">
                  <FaRobot className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Customer Care Service </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Support</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Clear chat history"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-400 hover:text-red-500 transition-all duration-300 focus:outline-none"
                >
                  <FaTrash className="text-xs" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 focus:outline-none"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>

            {/* Conditional Render: Pre-chat lead generation form OR chat messages interface */}
            {!sessionStarted ? (
              <div className="flex-1 p-6 flex flex-col justify-center overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-black">
                <div className="space-y-4 py-4">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black uppercase tracking-wider text-white">Let's Get Started</h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Please introduce yourself to start your premium chat session.</p>
                  </div>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                    {leadError && (
                      <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-xl text-red-500 text-xs font-bold text-center">
                        {leadError}
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={leadForm.mobile}
                        onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="john@example.com (optional)"
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all duration-300"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={leadLoading}
                      className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_8px_30px_rgb(239,68,68,0.3)] transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {leadLoading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        'Start Premium Chat'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-black space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Icon/Avatar */}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1 border ${msg.role === 'user'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                          : 'bg-red-600/20 border-red-500 text-red-500'
                          }`}>
                          {msg.role === 'user' ? <FaUser /> : <FaRobot />}
                        </div>

                        {/* Message Bubble */}
                        <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${msg.role === 'user'
                          ? 'bg-gradient-to-br from-red-600 to-red-700 text-white rounded-tr-none shadow-lg shadow-red-600/10'
                          : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none shadow-md'
                          }`}>
                          {/* Formatted body text (handles simple bullet formatting) */}
                          <div className="whitespace-pre-line">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 text-xs">
                          <FaRobot />
                        </div>
                        <div className="p-4 rounded-3xl rounded-tl-none bg-white/5 border border-white/10 text-gray-400 flex items-center gap-2">
                          <FaSpinner className="animate-spin text-xs text-amber-500" />
                          <span className="text-xs uppercase tracking-widest font-black">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick-Click FAQs suggestions */}
                {messages.length === 1 && !isLoading && chatdata.faq && (
                  <div className="px-6 pb-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Suggested Questions:</div>
                    <div className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto pr-1">
                      {chatdata.faq.map((faq, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(faq.question)}
                          className="text-left text-xs bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 rounded-2xl px-3.5 py-2 text-gray-300 font-bold transition-all duration-300 focus:outline-none"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="p-5 border-t border-white/10 bg-[#0c0c0c] flex gap-3 items-center"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                    placeholder="Type your question..."
                    className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 focus:border-amber-500 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 disabled:opacity-55"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center transition-all duration-300 hover:bg-amber-400 disabled:opacity-55 disabled:hover:bg-amber-500 focus:outline-none shadow-lg shadow-amber-500/10 flex-shrink-0"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;
