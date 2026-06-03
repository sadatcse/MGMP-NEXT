import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';


import UseAxioSecure from "../../../Hook/UseAxioSecure";
import { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";

const Testimonial_edit = () => {
    const { id: _id } = useParams();
    const router = useRouter();
    const axiosSecure = UseAxioSecure();
    const [imageurl, setimageurl] = useState('');
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY || 'bf7d52fc3431a0a728b5cd4630ed74a0';
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImageUrl(reader.result);
        };
        reader.readAsDataURL(imageFile);

        try {
            const res = await axios.post(image_hosting_api, formData);
            setimageurl(res.data.data.url);
            setFormData((prevData) => ({
                ...prevData,
                image: res.data.data.url
            }));

            await Swal.fire({
                icon: 'success',
                title: 'Image uploaded successfully!',
                text: `Image URL: ${res.data.data.url}`,
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error uploading image',
                text: error.message,
            });
        }
    };

    const [formData, setFormData] = useState({
        name: "", title: "", image: "", comment: ""
    });
    useEffect(() => {
        axiosSecure.get(`/testimonial/get-id/${_id}`).then(res => {
            setFormData(res.data);
            setimageurl(res.data.image);
            setPreviewImageUrl(res.data.image);
        }).catch(err => console.error(err));
    }, [_id, axiosSecure]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!imageurl) {
            Swal.fire({
                icon: "warning",
                title: "Image Required",
                text: "Please upload an image or enter a direct image URL.",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
            return;
        }

        const id = _id;
        formData.image=imageurl;

        try {
            const response = await axiosSecure.put(`/testimonial/put/${id}`, formData);
            if (response.data.modifiedCount > 0) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Testimonial updated successfully!',
                    text: 'The testimonial details have been updated.',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                }).then(() => {
                    router.push('/dashboard/testimonial_view');
                });
            } else {
                await Swal.fire({
                    icon: 'info',
                    title: 'No changes detected',
                    text: 'No updates were made to the testimonial details.',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                }).then(() => {
                    router.push('/dashboard/testimonial_view');
                });
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error updating testimonial',
                text: error.message,
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className="poppins">
            

            {/* Top content */}
            <p className='text-2xl font-bold'>Edit Testimonial</p>

            {/* breadcrumbs */}
            <div className="breadcrumbs mt-2 text-xs text-black">
                <ul>
                    <li className='text-gray-400'><a>Home</a></li>
                    <li className='text-gray-400'><a>admin</a></li>
                    <li className='text-gray-400'>testimonial</li>
                    <li className='text-gray-500'>edit</li>
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
                    <div className="flex items-center gap-5">
                        <div className='w-1/2'>
                            <div className="form-control border rounded-lg shadow-sm my-6">
                                <input onChange={handleImageUpload} type="file" className="file-input outline-none focus:outline-none" />
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={imageurl}
                                onChange={(e) => { setimageurl(e.target.value); setPreviewImageUrl(e.target.value); }}
                                className="appearance-none text-sm border shadow-sm rounded-xl w-full py-4 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            >
                                Update Testimonial
                            </button>
                        </div>
                        {previewImageUrl ? (
                            <img src={previewImageUrl} alt="Image Preview" className="w-44 h-full border mt-2" />
                        ) : (
                            <div className="w-44 h-24 border mt-2 flex items-center justify-center text-xs text-gray-500 bg-black/40">No Image</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Testimonial_edit;
