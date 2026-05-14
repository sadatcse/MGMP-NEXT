import React, { useState, useEffect } from 'react';

import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { useRouter } from 'next/navigation';


const Notice_list = () => {
    const axiosSecure = UseAxioSecure();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [noticesData, setNoticesData] = useState([]);

    // Pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/notice/get-all');
                setNoticesData(res.data);
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

    const updateNoticesData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return noticesData.slice(startIndex, endIndex);
    };

    const router = useRouter();

    const handleEdit = (notice) => {
        router.push(`/dashboard/notice_edit/${notice._id}`);
    };

    const handleDelete = async (noticeId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/notice/delete/${noticeId}`);
                const res = await axiosSecure.get('/notice/get-all');
                setNoticesData(res.data);
                setCount(res.data.length);

                // Show success notification
                Swal.fire(
                    'Deleted!',
                    'Your notice has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting notice:', error);

                // Show error notification
                Swal.fire(
                    'Error!',
                    'There was an error deleting the notice.',
                    'error'
                );
            }
        }
    };

    const handleView = (notice) => {
        router.push(`/notice/${notice._id}`);
    };

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    return (
        <div className=''>
            
            <div className="poppins">
                <div className="">

                    {/* Top content */}
                    <p className='text-2xl font-bold'>Notice List</p>

                    {/* Breadcrumbs */}
                    <div className="breadcrumbs mt-2 text-xs text-black">
                        <ul>
                            <li className='text-gray-400'><a>Home</a></li>
                            <li className='text-gray-400'><a>admin</a></li>
                            <li className='text-gray-400'>notice</li>
                            <li className='text-gray-500'>list</li>
                        </ul>
                    </div>

                    {/* Main section */}
                    <section className='p-5 mt-6 border rounded-2xl border-gray-100 shadow'>

                        <div className='flex items-center mb-5'>
                            {/* Search bar */}
                            <div className='w-full border py-2 px-3 rounded-lg'>
                                <div className='flex items-center gap-2'>
                                    <TfiSearch className='text-2xl font-bold text-gray-500' />
                                    <input type="text" className='outline-none w-full poppins text-sm' placeholder='Search here...' />
                                </div>
                            </div>
                            {/* Items per page */}
                            <div className="flex justify-between items-center m-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPage}
                                    title="items per page"
                                    className="px-1 cursor-pointer py-2 rounded-lg border max-w-min focus:outline-none"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-xs text-gray-500 text-left">
                                        <th className="p-3 rounded-full">Key</th>
                                        <th className="p-3 rounded-full">Title</th>
                                        <th className="p-3 rounded-full">Date</th>
                                        <th className="p-3 rounded-full">Category</th>
                                        <th className="p-3 rounded-full">Author</th>
                                        <th className="p-3 rounded-full">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading && (
                                        <>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </>
                                    )}
                                    {updateNoticesData().map((notice, index) => (
                                        <tr key={notice._id}>
                                            <td className="px-4 py-3 text-left">{index + 1}</td>
                                            <td className="px-4 py-3">{notice.title}</td>
                                            <td className="px-4 py-3">{new Date(notice.date).toISOString().split('T')[0]}</td>
                                            <td className="px-4 py-3">{notice.category}</td>
                                            <td className="px-4 py-3">{notice.author}</td>
                                            <td className="flex gap-3 text-base">
                                                <button
                                                    onClick={() => handleEdit(notice)}
                                                >
                                                    <FiEdit3 className='text-blue-900' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(notice._id)}
                                                >
                                                    <AiOutlineDelete className='text-red-900 hover:text-red-700' />
                                                </button>
                                                <button
                                                    onClick={() => handleView(notice)}
                                                >
                                                    <BiMessageSquareDetail />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex mt-7 items-center justify-between'>
                            {/* Pagination */}
                            <div className="flex justify-end">
                                <div className="m-2 shadow rounded-lg max-w-min flex">
                                    <button
                                        className="join-item px-3 py-2 text-white rounded focus:outline-none hover:bg-gray-200"
                                        onClick={handlePrevPage}
                                    >
                                        <span className="text-black"><MdNavigateBefore /></span>
                                    </button>
                                    {[...Array(numberOfPages)].map((page, ind) => (
                                        <button
                                            className={`px-3 join-item text-sm py-2 focus:outline-none transition-colors duration-300 ease-in-out ${currentPage === ind ? 'bg-gray-700 rounded-xl text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-200'}`}
                                            onClick={() => setCurrentPage(ind)}
                                            key={ind}
                                        >
                                            {ind + 1}
                                        </button>
                                    ))}
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
        <tr className='skeleton bg-[#fdfdfd] rounded-lg'>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
        </tr>
    );
}

export default Notice_list;
