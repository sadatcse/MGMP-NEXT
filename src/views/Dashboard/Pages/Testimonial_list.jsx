import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { TfiSearch } from 'react-icons/tfi';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

import UseAxioSecure from '../../../Hook/UseAxioSecure';

const TestimonialList = () => {
    const axiosSecure = UseAxioSecure();
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/testimonial/get-all');
                setTestimonials(res.data);
                setCount(res.data.length);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const updateTestimonialsData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return testimonials.slice(startIndex, endIndex);
    };

    const handleDelete = async (testimonialId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this testimonial!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axiosSecure.delete(`/testimonial/delete/${testimonialId}`);
                Swal.fire(
                    'Deleted!',
                    'The testimonial has been deleted.',
                    'success'
                );

                const res = await axiosSecure.get('/testimonial/get-all');
                setTestimonials(res.data);
                setCount(res.data.length);
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            setIsError(true);
            Swal.fire(
                'Error!',
                'Failed to delete the testimonial.',
                'error'
            );
        }
    };

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < [...Array(numberOfPages)].length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const router = useRouter();
    const handleEdit = (testimonial) => {
        router.push(`/dashboard/testimonial_edit/${testimonial._id}`);
    };
    return (
        <div>
            
            <div className="poppins">
                <div className="">

                    {/* Top content */}
                    <p className='text-2xl font-bold'>List</p>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs mt-2 text-xs text-black">
                        <ul>
                            <li className='text-gray-400'><a>Home</a></li>
                            <li className='text-gray-400'><a>admin</a></li>
                            <li className='text-gray-400'>testimonial</li>
                            <li className='text-gray-500'>list</li>
                        </ul>
                    </div>

                    {/* main section */}

                    <section className='p-5 mt-6 border rounded-2xl border-gray-100 shadow'>


                        <div className='flex items-center  mb-5'>
                            {/* search bar */}
                            <div className='w-full border py-2 px-3  rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <TfiSearch className='text-2xl font-bold text-gray-500' />
                                    <input type="text" className='outline-none w-full poppins text-sm' placeholder='Search here...' />
                                </div>
                            </div>
                            {/* items per page */}
                            <div className="flex justify-between items-center m-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPage}
                                    title="items per page"
                                    className="px-1 cursor-pointer py-2 rounded-lg  border max-w-min focus:outline-none"
                                >
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>


                        {/* table */}
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className=''>
                                    <tr className="text-xs text-gray-500 text-left">
                                        <th className="p-3 rounded-full">Key</th>
                                        <th className="p-3 rounded-full">Name</th>
                                        <th className="p-3 rounded-full">Comment</th>
                                        <th className="p-3 rounded-full">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {
                                        testimonials.length == 0 &&
                                        // Loading screen 
                                        <>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                        </>
                                    }
                                    {updateTestimonialsData().map((testimonial, index) => (
                                        <tr key={testimonial._id} >
                                            <td className="px-4 py-3 text-left">{index + 1}</td>
                                            <td className="px-4 py-3 text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={testimonial.image}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{testimonial.name}</div>
                                                        <div className="text-sm opacity-50">{testimonial.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">{testimonial.comment}</td>
                                            
                                            <td className="flex gap-3 mt-5 text-base">
                                                {/* <button
                                                onClick={() => handleEdit(testimonial)}
                                                >
                                                    <FiEdit3 className='text-blue-900' />
                                                </button> */}
                                                <button
                                                onClick={() => handleDelete(testimonial._id)}
                                                >
                                                    <AiOutlineDelete className='text-red-900 hover:text-red-700 text-xl' />
                                                </button>
                                                {/* <button
                                                // onClick={() => handleView(post)}
                                                >
                                                    <BiMessageSquareDetail />
                                                </button> */}
                                            </td>
                                            <td className="px-4 py-3 text-center">

                                            </td>
                                            <td className="px-4 py-3 text-center">

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex mt-7 items-center justify-between'>
                            {/* pagination */}
                            <div className="flex justify-end ">
                                <div className="m-2 shadow rounded-lg max-w-min flex">
                                    <button
                                        className="join-item px-3 py-2 text-white rounded focus:outline-none hover:bg-gray-200"
                                        onClick={handlePrevPage}
                                    >
                                        <span className="text-black"><MdNavigateBefore /></span>
                                    </button>
                                    {
                                        [...Array(numberOfPages)].map((page, ind) => (
                                            <button
                                                className={`px-3 join-item text-sm py-2 focus:outline-none transition-colors duration-300 ease-in-out ${currentPage === ind ? 'bg-gray-700 rounded-xl text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-200'}`}
                                                onClick={() => setCurrentPage(ind)}
                                                key={ind}
                                            >
                                                {ind + 1}
                                            </button>
                                        ))
                                    }
                                    <button
                                        className="px-3 py-2 text-white join-item rounded focus:outline-none hover:bg-gray-200"
                                        onClick={handleNextPage}
                                    >
                                        <span className="text-black"><MdNavigateNext /></span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={handlePrevPage}
                                        className='text-xs bg-gray-100 px-4 rounded-md py-2 hover:bg-gray-50'>
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        className='text-xs bg-gray-100 px-4 rounded-md py-2 hover:bg-gray-50'>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
};

const Skeleton = () => {
    return (
        <tr className='skeleton bg-[#fdfdfd]  rounded-lg'>
            <td className='py-10'></td>
            <td className='py-10'></td>
            <td className='py-10'></td>
            <td className='py-10'></td>
        </tr>
    )
}

export default TestimonialList;
