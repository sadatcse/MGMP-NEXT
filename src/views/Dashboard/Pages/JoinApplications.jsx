"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaUserCheck, 
  FaClock, 
  FaTrashAlt, 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUsers, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaDumbbell,
  FaMapMarkerAlt,
  FaFilePdf
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxioSecure from '../../../Hook/UseAxioSecure';
import { generateMembershipFormHtml } from '../../../utils/generateMembershipFormHtml';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const formatTime = (date) =>
  new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const JoinApplications = () => {
  const axiosSecure = UseAxioSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get('/join');
      if (res.data && res.data.data) {
        setApplications(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
    try {
      const res = await axiosSecure.patch(`/join/${id}`, { status: newStatus });
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Application status changed to ${newStatus}`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#1a1a1a',
          color: '#fff',
        });
        fetchApplications();
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
      text: `Do you want to delete the application for "${name}"?`,
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
        const res = await axiosSecure.delete(`/join/${id}`);
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Join application has been deleted.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            background: '#1a1a1a',
            color: '#fff',
          });
          fetchApplications();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Error deleting application',
          background: '#1a1a1a',
          color: '#fff',
        });
      }
    }
  };

  const handleDownloadForm = (item) => {
    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) {
      Swal.fire({
        icon: 'warning',
        title: 'Popup Blocked',
        text: 'Please allow popups in your browser to download/print the membership form.',
        background: '#1a1a1a',
        color: '#fff',
      });
      return;
    }
    const htmlContent = generateMembershipFormHtml(item);
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.telephone_number?.includes(searchTerm) ||
      app.package_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const approvedCount = applications.filter(a => a.status === 'Approved').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <FaDumbbell className="text-red-500 text-3xl" />
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              JOIN <span className="text-custom-yellow">APPLICATIONS</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
            Manage & review user registrations and Single Membership Package selections stored in MongoDB.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Applications</p>
            <p className="text-3xl font-black text-white mt-1">{totalCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-custom-yellow/20 text-custom-yellow flex items-center justify-center text-xl">
            <FaUsers />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Pending Approvals</p>
            <p className="text-3xl font-black text-red-500 mt-1">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center text-xl">
            <FaClock />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Approved Members</p>
            <p className="text-3xl font-black text-emerald-400 mt-1">{approvedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            <FaUserCheck />
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
            placeholder="Search name, phone, email, package..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-custom-yellow transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['all', 'pending', 'approved'].map((status) => (
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
                <th className="p-4">Applicant Info</th>
                <th className="p-4">Metrics</th>
                <th className="p-4">Selected Package</th>
                <th className="p-4">Contact & Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400 font-medium">
                    Loading member applications from database...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400 font-medium">
                    No join applications found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    {/* Applicant Info */}
                    <td className="p-4">
                      <p className="font-extrabold text-white text-base">{item.full_name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <FaEnvelope className="text-custom-yellow text-[10px]" /> {item.email}
                      </p>
                    </td>

                    {/* Metrics */}
                    <td className="p-4 text-xs font-semibold text-gray-300">
                      <p><span className="text-gray-500">Height:</span> {item.height || `${item.feet} ${item.inch}`}</p>
                      <p><span className="text-gray-500">Weight:</span> {item.weight}</p>
                      <p><span className="text-gray-500">Age:</span> {item.age}</p>
                    </td>

                    {/* Package */}
                    <td className="p-4">
                      <span className="inline-block bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        {item.package_name}
                      </span>
                      <p className="text-xs font-black text-custom-yellow mt-1">{item.package_price}</p>
                      {item.package_note && (
                        <p className="text-[10px] text-gray-400 font-medium">{item.package_note}</p>
                      )}
                    </td>

                    {/* Contact & Address */}
                    <td className="p-4 text-xs text-gray-300">
                      <p className="font-bold text-white flex items-center gap-1">
                        <FaPhoneAlt className="text-red-500 text-[10px]" /> {item.telephone_number}
                      </p>
                      <p className="text-gray-400 mt-1 max-w-xs truncate flex items-center gap-1">
                        <FaMapMarkerAlt className="text-custom-yellow text-[10px] flex-shrink-0" /> {item.address}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          item.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {item.status === 'Approved' ? <FaCheckCircle /> : <FaClock />}
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
                          onClick={() => handleDownloadForm(item)}
                          className="px-3 py-2 bg-custom-yellow/20 text-custom-yellow hover:bg-custom-yellow hover:text-black border border-custom-yellow/30 rounded-xl transition-all font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                          title="Download & Print Filled Membership Form PDF"
                        >
                          <FaFilePdf size={13} />
                          <span>PDF Form</span>
                        </button>
                        <button
                          onClick={() => handleStatusToggle(item._id, item.status)}
                          className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            item.status === 'Approved'
                              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          }`}
                          title={item.status === 'Approved' ? 'Mark as Pending' : 'Approve Member'}
                        >
                          {item.status === 'Approved' ? <FaClock size={14} /> : <FaCheckCircle size={14} />}
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.full_name)}
                          className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all cursor-pointer"
                          title="Delete Application"
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

export default JoinApplications;
