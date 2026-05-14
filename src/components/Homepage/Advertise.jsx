import React from 'react';
import { FaChevronRight } from "react-icons/fa6";
const Advertise = () => {
    return (
        <div className='text-center py-24  space-y-4'>
            <h1 className='text-4xl italic font-bold '>WE'RE READY TO GUIDE YOU ON YOUR JOURNEY!</h1>
            <h3 className='text-2xl italic font-bold'>NO MATTER YOUR SKILL LEVEL OR EXPERIENCE!</h3>
            <div className='flex justify-center'>
                <button className=' rounded-lg btn border-2 justify-center items-center text-white text-3xl hover:bg-white hover:text-red-500 hover:border-red-500 italic  bg-red-500'>GET STARTED <FaChevronRight /></button>
            </div>
        </div>
    );
};

export default Advertise;