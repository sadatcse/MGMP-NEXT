import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import useAxiosPublic from "../Hook/useAxiosPublic";


const Trainers_Details = () => {
    const { name } = useParams();
    const [data, setData] = useState([]);
    const axiosPublic = useAxiosPublic();
     
        useEffect(() => {
            axiosPublic.get("/trainer/get-all/")
             .then(data => setData(data.data.find(item => item.short_name === name)))

        }, [])

    


    if (!data) {
        return <div>Loading...</div>;
    }

    const { image_url, full_name, certification, bio, facebook, Instagram, mobile, email, short_name } = data;

    return (
        <div className='container mx-auto px-4'>
            
            <div className='my-16 overflow-x-hidden flex flex-col relative lg:flex-row items-center'>
                <div className='md:w-1/2'>
                    <img src={image_url} className='w-full' alt={full_name} />
                </div>
                <div className='md:w-1/2'>
                    <p className='font-bold text-3xl text-center md:text-left mt-4 md:mt-0 md:text-6xl'>{full_name}</p>
                    <p className='md:text-3xl mt-3 md:mt-5 font-semibold text-center md:text-left'>{certification}</p>
                    <p className='md:text-xl mt-5 md:max-w-[700px] font-normal text-gray-500 text-center md:text-left'>
                        {bio ? bio.split('\n').map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {paragraph}
                                <br />
                            </React.Fragment>
                        )) : 'Loading ..............'}
                    </p>
                    <div className='flex gap-5 mt-5 md:text-2xl justify-center md:justify-start text-xl'>
                        {facebook && (
                            <a href={`https://www.facebook.com/${facebook}`} target='_blank' rel='noopener noreferrer'>
                                <FaFacebookF />
                            </a>
                        )}
                        {Instagram && (
                            <a href={`https://www.instagram.com/${Instagram}`} target='_blank' rel='noopener noreferrer'>
                                <FaInstagram />
                            </a>
                        )}
                        {mobile && (
                            <a href={`tel:${mobile}`}>
                                <FaPhoneAlt />
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`}>
                                <MdOutlineEmail />
                            </a>
                        )}
                    </div>
                </div>
                <p className='absolute text-9xl font-extrabold -z-10 top-0 uppercase left-0 opacity-10 lg:block hidden'>
                    {short_name}
                </p>
            </div>
        </div>
    );
};

export default Trainers_Details;
