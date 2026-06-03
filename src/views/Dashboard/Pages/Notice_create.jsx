import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import ImageUpload from '../../../components/Utility/ImageUploadcpanel';

const Notice_create = () => {
    const axiosSecure = UseAxioSecure();
    const router = useRouter();
    const [imageurl, setImageUrl] = useState('');
    const axiosPublic = useAxiosPublic();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        author: '',
        date: null,
    });

    // Use useEffect to update formData when imageurl changes
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            image: imageurl,
        }));
    }, [imageurl]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDescriptionChange = (value) => {
        setFormData({
            ...formData,
            description: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.date) {
            Swal.fire({
                icon: "warning",
                title: "Date Required",
                text: "Please select a date for the notice.",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
            return;
        }

        if (!imageurl) {
            Swal.fire({
                icon: "warning",
                title: "Banner Required",
                text: "Please upload a notice banner or enter an image URL.",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
            return;
        }

        formData.image = imageurl;

        try {
            const response = await axiosSecure.post("/notice/post",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response:", response.data);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Notice added successfully",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            }).then(() => {
                router.push('/dashboard/notice_view');
            });

        } catch (error) {
            console.error("Error adding Notice:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add Notice",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Area */}
            <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                    Push <span className="text-custom-yellow">Notice</span>
                </h1>
                <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>Dashboard</span>
                    <span className="text-red-600">/</span>
                    <span>Communications</span>
                    <span className="text-red-600">/</span>
                    <span className="text-white">Push Notice</span>
                </div>
            </div>

            {/* Form Container */}
            <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 max-w-4xl shadow-2xl">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">
                    Notice Specifications
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Notice Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Eid Holidays Gym Operating Hours"
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Author / Publisher *</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Admin Name"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Date *</label>
                            <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                placeholderText="Select Date"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold cursor-pointer"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-gray-400 outline-none focus:border-red-600/50 transition-all font-bold cursor-pointer"
                                required
                            >
                                <option value="" className="text-gray-400">Select Category</option>
                                <option value="General">General</option>
                                <option value="Event">Event</option>
                                <option value="Announcement">Announcement</option>
                                <option value="Reminder">Reminder</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Notice Body / Description *</label>
                        <div className="quill-dark-theme rounded-2xl overflow-hidden border border-white/5 bg-black/40 text-white">
                            <ReactQuill
                                id="description"
                                value={formData.description}
                                onChange={handleDescriptionChange}
                                className="text-white"
                                modules={Notice_create.modules}
                                formats={Notice_create.formats}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Notice Banner Upload</label>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center">
                                <ImageUpload setImageUrl={setImageUrl} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Or Direct Banner URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={imageurl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold"
                                placeholder="Enter direct image url"
                            />
                        </div>
                    </div>

                    <div className="text-right pt-4 border-t border-white/5">
                        <button type="submit" className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl shadow-red-600/20">
                            Create Notice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modules and formats for the editor
Notice_create.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
};

Notice_create.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
];

export default Notice_create;
