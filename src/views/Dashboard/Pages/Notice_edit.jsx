import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import ImageUpload from '../../../components/Utility/ImageUploadcpanel';

const Notice_edit = () => {
    const { id: _id } = useParams();
    const axiosSecure = UseAxioSecure();
    const router = useRouter();
    const [imageurl, setimageurl] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "", author: "", category: "", image: "", date: null, description: ""
    });

    useEffect(() => {
        axiosSecure.get(`/notice/get-id/${_id}`).then(res => {
            setFormData(res.data);
            setimageurl(res.data.image);
            setPreviewImageUrl(res.data.image);
        }).catch(err => console.error(err));
    }, [_id, axiosSecure]);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            image: previewImageUrl,
        }));
    }, [previewImageUrl]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date,
        });
    };

    const handleDescriptionChange = (value) => {
        setFormData({
            ...formData,
            description: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = _id;
        formData.image = imageurl;

        try {
            const response = await axiosSecure.put(`/notice/put/${id}`, formData);
            if (response.data.modifiedCount > 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Notice updated successfully!',
                    text: 'The notice details have been updated.',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                }).then(() => {
                    router.push('/dashboard/notice_view');
                });
            } else {
                await Swal.fire({
                    icon: 'info',
                    title: 'No changes detected',
                    text: 'No updates were made to the notice details.',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error updating notice',
                text: error.message,
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        Edit <span className="text-custom-yellow">Notice</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span>Dashboard</span>
                        <span className="text-red-600">/</span>
                        <span>Communications</span>
                        <span className="text-red-600">/</span>
                        <span className="text-white">Edit Notice</span>
                    </div>
                </div>
                {previewImageUrl && (
                    <img src={previewImageUrl} alt="Notice banner preview" className="w-48 h-24 object-cover rounded-2xl border border-white/10 shadow-lg shadow-black/40" />
                )}
            </div>

            {/* Form Container */}
            <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 max-w-4xl shadow-2xl">
                <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">
                    Modify Specifications
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
                            placeholder="Notice Title"
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
                                placeholder="Author"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Date *</label>
                            <DatePicker
                                selected={formData.date ? new Date(formData.date) : null}
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
                                modules={Notice_edit.modules}
                                formats={Notice_edit.formats}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Notice Banner Upload</label>
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-center">
                                <ImageUpload setImageUrl={setimageurl} setPreviewImageUrl={setPreviewImageUrl} />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 block mb-2">Or Direct Banner URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={imageurl}
                                onChange={(e) => { setimageurl(e.target.value); setPreviewImageUrl(e.target.value); }}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-red-600/50 transition-all font-bold"
                                placeholder="Enter direct image url"
                            />
                        </div>
                    </div>

                    <div className="text-right pt-4 border-t border-white/5">
                        <button type="submit" className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-red-600 transition-all duration-300 shadow-xl shadow-red-600/20">
                            Update Notice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Notice_edit.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
};

Notice_edit.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
];

export default Notice_edit;
