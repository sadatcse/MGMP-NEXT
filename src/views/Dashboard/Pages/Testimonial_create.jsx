import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import ImageUpload from '../../../components/Utility/ImageUploadcpanel';

import axios from 'axios';
const Testimonial_create = () => {
    const axiosSecure = UseAxioSecure();
    const [imageurl, setimageurl] = useState('');
 


    const [formData, setFormData] = useState({
        title: '',
        name: '',
        comment: '',
        image: '',
        date: new Date(),
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCommentChange = (value) => {
        setFormData({
            ...formData,
            comment: value,
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
        formData.image=imageurl;

        // Format the date to include only month, day, and year
        const formattedDate = formData.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        try {
            const response = await axiosSecure.post("/testimonial/post",
                { ...formData, date: formattedDate },
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
                text: "Testimonial added successfully",
            });

            // Optionally, reset form fields after successful submission
            setFormData({
                title: '',
                name: '',
                comment: '',
                image: '',
                date: new Date(),
            });

        } catch (error) {
            console.error("Error adding Testimonial:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add Testimonial",
            });
        }
    };

    return (
        <div className="poppins">
            

            {/* Top content */}
            <p className='text-2xl font-bold'>Create a testimonial</p>

            {/* breadcrumbs */}
            <div className="breadcrumbs mt-2 text-xs text-black">
                <ul>
                    <li className='text-gray-400'><a>Home</a></li>
                    <li className='text-gray-400'><a>admin</a></li>
                    <li className='text-gray-400'>testimonial</li>
                    <li className='text-gray-500'>new</li>
                </ul>
            </div>

            <div className="mt-9 ml-4">
                <p className='font-medium text-2xl'>Details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="appearance-none text-sm border shadow-sm rounded-xl  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Testimonial Title"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="appearance-none text-sm border shadow-sm rounded-xl  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Testimonial Person Name"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={(e) => handleCommentChange(e.target.value)}
                            className="appearance-none resize-none text-sm border  shadow-sm rounded-xl h-52  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter testimonial comment"
                            required
                        />
                    </div>
                    <div className="flex  items-center gap-5">
                        <div className='w-1/2'>
                        <ImageUpload setImageUrl={setimageurl} />
                        </div>
                        <div className='w-1/2'>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={imageurl}
                                onChange={handleChange}
                                className="appearance-none text-sm border shadow-sm rounded-xl w-full py-4 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>
                    <div className="">

                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                            Create Testimonial
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Testimonial_create;
