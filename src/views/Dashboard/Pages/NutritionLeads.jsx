"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaAppleAlt, 
  FaClock, 
  FaTrashAlt, 
  FaSearch, 
  FaCheckCircle, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxioSecure from '../../../Hook/UseAxioSecure';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const formatTime = (date) =>
  new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const NutritionLeads = () => {
  const axiosSecure = UseAxioSecure();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get('/nutrition');
      if (res.data && res.data.data) {
        setLeads(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch nutrition leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Contacted' ? 'Pending' : 'Contacted';
    try {
      const res = await axiosSecure.patch(`/nutrition/${id}`, { status: newStatus });
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Consultation lead marked as ${newStatus}`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#1a1a1a',
          color: '#fff',
        });
        fetchLeads();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
        background: '#1a1a1a',
        color: '#fff',
      });
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the consultation request for "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, delete it!',
      background: '#1a1a1a',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/nutrition/${id}`);
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Nutrition consultation lead has been deleted.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#1a1a1a',
            color: '#fff',
          });
          fetchLeads();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Error deleting lead',
          background: '#1a1a1a',
          color: '#fff',
        });
      }
    }
  };

  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile_number?.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || item.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalCount = leads.length;
  const pendingCount = leads.filter(l => l.status === 'Pending').length;
  const contactedCount = leads.filter(l => l.status === 'Contacted').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center text-xl">
              <FaAppleAlt />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              NUTRITION <span className="text-custom-yellow">CONSULTATIONS</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
            Manage & review user meal planning consultation requests submitted via Nutrition Now.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Requests</p>
            <p className="text-3xl font-black text-white mt-1">{totalCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-custom-yellow/20 text-custom-yellow flex items-center justify-center text-xl">
            <FaAppleAlt />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Pending Followup</p>
            <p className="text-3xl font-black text-red-500 mt-1">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center text-xl">
            <FaClock />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Contacted / Done</p>
            <p className="text-3xl font-black text-emerald-400 mt-1">{contactedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search name, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-custom-yellow transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'pending', 'contacted'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-custom-yellow text-black font-bold shadow-md'
                  : 'bg-zinc-900 text-gray-400 hover:text-white border border-zinc-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-white/10 text-custom-yellow text-xs uppercase tracking-widest font-black">
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Requested Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
                    Loading nutrition consultation requests...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
                    No nutrition consultation requests found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    {/* Full Name */}
                    <td className="p-4">
                      <p className="font-extrabold text-white text-base flex items-center gap-2">
                        <FaUser className="text-gray-400 text-xs" /> {item.full_name}
                      </p>
                    </td>

                    {/* Mobile Number */}
                    <td className="p-4 text-xs font-bold text-gray-200">
                      <p className="flex items-center gap-1.5">
                        <FaPhoneAlt className="text-red-500 text-[10px]" /> {item.mobile_number}
                      </p>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-xs text-gray-300">
                      <p className="flex items-center gap-1.5">
                        <FaEnvelope className="text-custom-yellow text-[10px]" /> {item.email}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          item.status === 'Contacted'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {item.status === 'Contacted' ? <FaCheckCircle /> : <FaClock />}
                        {item.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-xs text-gray-400 font-medium">
                      {formatDate(item.createdAt)}
                      <span className="block text-[10px] text-gray-500">{formatTime(item.createdAt)}</span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusToggle(item._id, item.status)}
                          className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            item.status === 'Contacted'
                              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          }`}
                          title={item.status === 'Contacted' ? 'Mark as Pending' : 'Mark as Contacted'}
                        >
                          {item.status === 'Contacted' ? <FaClock size={14} /> : <FaCheckCircle size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.full_name)}
                          className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                          title="Delete Request"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NutritionLeads;
