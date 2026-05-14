import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import ImageUpload from '../../../components/Utility/ImageUploadcpanel';

const Notice_edit = () => {
    const { id: _id } = useParams();
    const axiosSecure = UseAxioSecure();
    const [imageurl, setimageurl] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "", author: "", category: "", image: "", date: new Date(), description: ""
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
        console.log(formData);

        try {
            const response = await axiosSecure.put(`/notice/put/${id}`, formData);
            if (response.data.modifiedCount > 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Notice updated successfully!',
                    text: 'The notice details have been updated.',
                });
            } else {
                await Swal.fire({
                    icon: 'info',
                    title: 'No changes detected',
                    text: 'No updates were made to the notice details.',
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error updating notice',
                text: error.message,
            });
        }
    };

    return (
        <div className="poppins">
            

            <div className='flex justify-between'>
                <div>
                    <p className='text-2xl font-bold'>Edit Notice</p>
                    <div className="breadcrumbs mt-2 text-xs text-black">
                        <ul>
                            <li className='text-gray-400'><a>Home</a></li>
                            <li className='text-gray-400'><a>admin</a></li>
                            <li className='text-gray-400'>notice</li>
                            <li className='text-gray-500'>edit</li>
                        </ul>
                    </div>
                </div>
                <img src={previewImageUrl} alt="Image Preview" className="w-64 h-full border rounded mt-2" />
            </div>
            <div className="ml-4">
                <p className='font-medium text-2xl'>Details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Notice title'
                            className="appearance-none text-sm border shadow-sm rounded-xl  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <input
                            type="text"
                            id="author"
                            name="author"
                            placeholder='Author'
                            value={formData.author}
                            onChange={handleChange}
                            className="appearance-none text-sm border shadow-sm rounded-xl  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex justify-between gap-5 mt-6">
                        <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            placeholderText='Select a date'
                            className="appearance-none text-gray-400 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="appearance-none text-sm border shadow-sm rounded-xl cursor-pointer w-full py-4 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" className='text-gray-400'>Category</option>
                            <option value="General">General</option>
                            <option value="Event">Event</option>
                            <option value="Announcement">Announcement</option>
                            <option value="Reminder">Reminder</option>
                        </select>
                    </div>
                    <div className="mt-6">
                        <ReactQuill
                            id="description"
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            className="appearance-none text-sm border shadow-sm rounded-xl lg:h-52 w-full py-4 lg:pb-14 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            modules={Notice_edit.modules}
                            formats={Notice_edit.formats}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-5 mt-6">
                        <div className='w-1/2'>
                            <ImageUpload setImageUrl={setimageurl} setPreviewImageUrl={setPreviewImageUrl} />
                        </div>
                        <div className='w-1/2'>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={imageurl}
                                onChange={handleChange}
                                className="appearance-none text-sm border shadow-sm rounded-xl w-full py-4 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                            Update Notice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modules and formats for the editor
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
