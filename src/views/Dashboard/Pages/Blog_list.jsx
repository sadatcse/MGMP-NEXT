import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import UseAxioSecure from '../../../Hook/UseAxioSecure';
import Swal from 'sweetalert2';
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrNext } from "react-icons/gr";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useRouter } from 'next/navigation';

const Blog_list = () => {

    const axiosSecure = UseAxioSecure();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState([]);

    // pagination
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosSecure.get('/news/get-all');
                setUsersData(res.data);
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

    const updateUserData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return usersData.slice(startIndex, endIndex);
    };

    const handleEdit = (post) => {
        router.push(`/dashboard/blog_edit/${post._id}`);
    };

    const handleDelete = async (postId) => {
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
                await axiosSecure.delete(`/news/delete/${postId}`);
                const res = await axiosSecure.get('/news/get-all');
                setUsersData(res.data);
                setCount(res.data.length);

                // Show success notification
                Swal.fire(
                    'Deleted!',
                    'Your blog post has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting blog post:', error);

                // Show error notification
                Swal.fire(
                    'Error!',
                    'There was an error deleting the blog post.',
                    'error'
                );
            }
        }
    };

    const router = useRouter();

    const handleView = (post) => {

        // console.log('Viewing post:', post);
        router.push(`/blog/${post._id}`);
    };

    const numberOfPages = Math.ceil(count / itemsPerPage);

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
    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }
    return (
        <div className=''>
            
            <div className="poppins">
                <div className="">

                    {/* Top content */}
                    <p className='text-2xl font-bold'>List</p>

                    {/* breadcrumbs */}
                    <div className="breadcrumbs mt-2 text-xs text-black">
                        <ul>
                            <li className='text-gray-400'><a>Home</a></li>
                            <li className='text-gray-400'><a>admin</a></li>
                            <li className='text-gray-400'>blog</li>
                            <li className='text-gray-500'>list</li>
                        </ul>
                    </div>

                    {/* Main section */}
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
                                {/* <div>
                                    <p className="text-gray-500">Total {count} products</p>
                                </div> */}
                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPage}
                                    title="items per page"
                                    className="px-1 cursor-pointer py-2 rounded-lg  border max-w-min focus:outline-none"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
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
                                        <th className="p-3 rounded-full">Title</th>
                                        <th className="p-3 rounded-full">Date</th>
                                        <th className="p-3 rounded-full">Category</th>
                                        <th className="p-3 rounded-full">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {

                                        usersData.length == 0 &&
                                        // loading screen
                                        <>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                            <Skeleton></Skeleton>
                                        </>
                                    }
                                    {updateUserData().map((post, index) => (
                                        <tr key={post._id} >
                                            <td className="px-4 py-3 text-left">{index + 1}</td>
                                            <td className="px-4 py-3">{post.title}</td>
                                            <td className="px-4 py-3">                          {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</td>
                                            <td className="px-4 py-3">{post.category}</td>
                                            <td className="flex gap-3 text-base">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                >
                                                    <FiEdit3 className='text-blue-900' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    <AiOutlineDelete className='text-red-900 hover:text-red-700' />
                                                </button>
                                                <button
                                                    onClick={() => handleView(post)}
                                                >
                                                    <BiMessageSquareDetail />
                                                </button>
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
        <tr className='skeleton bg-[#fdfdfd] rounded-lg'>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
            <td className='py-7'></td>
        </tr>
    )
}

export default Blog_list;
