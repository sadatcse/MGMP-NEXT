import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import UseAxioSecure from '../../../Hook/UseAxioSecure';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';
import axios from 'axios';
import ImageUpload from '../../../components/Utility/ImageUploadcpanel';
const Team_create = () => {
    const axiosSecure = UseAxioSecure();
    const router = useRouter();
    const axiosPublic = useAxiosPublic();
    const [imageurl, setimageurl] = useState('');
    const [formData, setFormData] = useState({
        full_name: '',
        short_name: '',
        image_url: '',
        bio: '',
        certification: '',
        email: '',
        Instagram: '',
        facebook: '',
        mobile: '',
        role: '',
        position_title: '',
        date: new Date(),
    });



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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        formData.image_url = imageurl;
        // Format the date to include only month, day, and year
        const formattedDate = formData.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        console.log(formData);

        try {
            const response = await axiosSecure.post("/trainer/post",
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
                text: "Team member added successfully",
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            }).then(() => {
                router.push('/dashboard/team_view');
            });

        } catch (error) {
            console.error("Error adding team member:", error);

            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add team member",
            });
        }
    };

    return (
        <div className="poppins">
            
            {/* Top content */}
            <p className='text-2xl font-bold'>Add team member</p>

            {/* breadcrumbs */}
            <div className="breadcrumbs mt-2 text-xs text-black">
                <ul>
                    <li className='text-gray-400'><a>Home</a></li>
                    <li className='text-gray-400'><a>admin</a></li>
                    <li className='text-gray-400'>team</li>
                    <li className='text-gray-500'>new</li>
                </ul>
            </div>
            <div className="mt-9 ml-4">
                <p className='font-medium text-2xl'>Details</p>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder='Full name'
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex gap-3 mt-5">
                        <input
                            id="short_name"
                            name="short_name"
                            placeholder='Short name'
                            type="text"
                            value={formData.short_name}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            id="certification"
                            name="certification"
                            type="text"
                            placeholder='Certification'
                            value={formData.certification}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex gap-3 mt-5">
                        <input
                            id="facebook"
                            name="facebook"
                            type="text"
                            placeholder='Facebook'
                            value={formData.facebook}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <input
                            id="Instagram"
                            name="Instagram"
                            type="text"
                            placeholder='Instagram'
                            value={formData.Instagram}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex gap-3 mt-5">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                        <input
                            id="mobile"
                            name="mobile"
                            type="text"
                            placeholder='Mobile no'
                            value={formData.mobile}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex gap-3 mt-5">
                        <input
                            id="position_title"
                            name="position_title"
                            type="text"
                            placeholder='Position title'
                            value={formData.position_title}
                            onChange={handleChange}
                            className="appearance-none text-gray-700 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="appearance-none text-gray-400 text-sm border shadow-sm rounded-xl  w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Group Fitness Instructor">Group Fitness Instructor</option>
                            <option value="Personal Trainer">Personal Trainer</option>
                            <option value="Nutritionist">Nutritionist</option>
                            <option value="Front Desk Receptionist">Front Desk Receptionist</option>
                            <option value="Maintenance Staff">Maintenance Staff</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="Cleaning Staff">Cleaning Staff</option>
                            <option value="Security Personnel">Security Personnel</option>
                            <option value="Marketing Specialist">Marketing Specialist</option>
                            <option value="Office Staff">Office Staff</option>
                            <option value="Manager">Manager</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Spotter">Spotter</option>
                            <option value="Assistant Trainer">Assistant Trainer</option>
                            <option value="Customer Service Representative">Customer Service Representative</option>
                        </select>
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
                                onChange={(e) => setimageurl(e.target.value)}
                                className="appearance-none text-sm border shadow-sm rounded-xl w-full py-4 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder='Bio'
                            className="appearance-none text-gray-700 text-sm border shadow-sm h-36 rounded-xl  w-full py-4 px-3 resize-none  leading-tight focus:outline-none focus:shadow-outline:shadow-outline"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-5">
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Team_create;
