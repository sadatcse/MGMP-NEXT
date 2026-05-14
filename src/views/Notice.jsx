import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineUser, AiOutlineTag } from 'react-icons/ai';
import useAxiosPublic from '../Hook/useAxiosPublic';

import Link from 'next/link';


const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [visibleNotices, setVisibleNotices] = useState(4);
    const axiosPublic = useAxiosPublic();

    // const notices = [
    //     {
    //         "title": "Gym Renovation Notice",
    //         "description": "<p>We are excited to announce that our gym is undergoing renovations to improve your experience. The renovations will start on September 1st and are expected to be completed by October 15th. During this period, some areas of the gym may be temporarily closed. We apologize for any inconvenience and appreciate your patience.</p>",
    //         "date": "2024-08-20",
    //         "author": "John Doe",
    //         "category": "General",
    //         "image": "https://via.placeholder.com/800x400?text=Gym+Renovation+Notice"
    //     },
    //     {
    //         "title": "New Class Schedule Released",
    //         "description": "<p>We have released our new class schedule for the upcoming season. Check out our website for the updated class times and new classes being offered. Don’t miss out on our exciting new fitness programs!</p>",
    //         "date": "2024-08-15",
    //         "author": "Jane Smith",
    //         "category": "Schedule",
    //         "image": "https://via.placeholder.com/800x400?text=New+Class+Schedule+Released"
    //     },
    //     {
    //         "title": "Special Event This Weekend",
    //         "description": "<p>Join us for a special fitness event this weekend featuring guest instructors and exciting workout sessions. It will be a great opportunity to try out new classes and meet fellow fitness enthusiasts. See you there!</p>",
    //         "date": "2024-08-10",
    //         "author": "Mike Johnson",
    //         "category": "Events",
    //         "image": "https://via.placeholder.com/800x400?text=Special+Event+This+Weekend"
    //     },
    //     {
    //         "title": "Holiday Hours Announcement",
    //         "description": "<p>In observance of the upcoming holidays, our gym will have adjusted hours. Please check our website or contact our front desk for details on holiday hours. Thank you for your understanding.</p>",
    //         "date": "2024-08-05",
    //         "author": "Emily Davis",
    //         "category": "General",
    //         "image": "https://via.placeholder.com/800x400?text=Holiday+Hours+Announcement"
    //     },
    //     {
    //         "title": "Fitness Challenge Results",
    //         "description": "<p>Congratulations to all participants of our recent fitness challenge! The results are in, and the winners have been announced. Visit our website to see the results and photos from the event.</p>",
    //         "date": "2024-07-30",
    //         "author": "Laura Brown",
    //         "category": "Challenges",
    //         "image": "https://via.placeholder.com/800x400?text=Fitness+Challenge+Results"
    //     },
    //     {
    //         "title": "New Personal Trainers Available",
    //         "description": "<p>We are pleased to introduce our new personal trainers who have recently joined our team. They bring a wealth of experience and are ready to help you achieve your fitness goals. Book a session with them today!</p>",
    //         "date": "2024-07-25",
    //         "author": "Michael Lee",
    //         "category": "Trainers",
    //         "image": "https://via.placeholder.com/800x400?text=New+Personal+Trainers+Available"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    //     {
    //         "title": "Summer Membership Deals",
    //         "description": "<p>Take advantage of our special summer membership deals and enjoy discounted rates for new members. Sign up before the end of the month to benefit from these limited-time offers!</p>",
    //         "date": "2024-07-20",
    //         "author": "Sarah Wilson",
    //         "category": "Membership",
    //         "image": "https://via.placeholder.com/800x400?text=Summer+Membership+Deals"
    //     },
    // ]

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axiosPublic.get('/notice/get-all');
                const sortedNotices = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNotices(sortedNotices);
                console.log(sortedNotices);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, [axiosPublic]);

    const loadMoreNotices = () => {
        setVisibleNotices(prevCount => prevCount + 3);
    };

    const Header = () => {
        return (
            <div className="relative h-64">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://www.teambath.com/wp-content/uploads/2023/11/Gym-landscape-for-facilities-page-2023.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative flex items-center justify-center h-full">
                    <div className='flex flex-col items-center gap-4'>
                        <h1 className="text-custom-yellow text-4xl font-bold">Notice </h1>
                        <p className="text-center text-white font-semibold text-xl">Stay informed with the latest updates, announcements, and important notices. Keep track of what’s happening!</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="">
            
            <Header />

            {/* Notice List */}
            <section className="container mx-auto px-4 my-10">
                {notices.length > 0 && (
                    <>
                        {/* First Notice */}
                        <div className="col-span-full gap-3 overflow-hidden mb-28 flex flex-col lg:flex-row">
                            <img
                                src={notices[0].image}
                                alt={notices[0].title}
                                className="w-full lg:w-1/2 h-64 lg:h-auto rounded-xl object-cover mr-5"
                            />
                            <div className="flex flex-col justify-between lg:w-1/2">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">{notices[0].title}</h2>
                                    <div className='border-b border-gray-300 mb-4'></div>
                                    <p
                                        className="text-gray-700 lg:text-lg mb-4"
                                        dangerouslySetInnerHTML={{ __html: notices[0].description }}
                                    ></p>
                                </div>
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
                                    <div className="text-gray-500 flex items-center mb-2 lg:mb-0">
                                        <AiOutlineCalendar className="mr-2" />
                                        <span className='text-sm'>Posted on: {new Date(notices[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="text-gray-500 flex items-center mb-2 lg:mb-0">
                                        <AiOutlineUser className="mr-2" />
                                        <span className='text-sm'>Author: {notices[0].author}</span>
                                    </div>
                                    <div className="text-gray-500 flex items-center">
                                        <AiOutlineTag className="mr-2" />
                                        <span className='text-sm'>Category: {notices[0].category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Notices */}
                        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {notices.slice(1, visibleNotices).map((notice, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-between h-full shadow rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={notice.image}
                                        alt={notice.title}
                                        className="w-full h-60 object-cover"
                                    />
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-lg text-center font-semibold px-2 mb-1 mt-5 text-yellow-600">{notice.title}</h3>
                                        <p className="text-gray-600 text-center text-sm mt-2 px-4">
                                            {notice.description.replace(/<[^>]+>/g, '').slice(0, 200)}{notice.description.length > 200 ? '...' : ''}
                                        </p>
                                    </div>
                                    <div className='p-4 '>
                                        <Link href={`/notice/${notice._id  }`}><button className="btn hover:bg-custom-yellow bg-yellow-500 text-white w-full mt-3">Details</button></Link>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {visibleNotices < notices.length && (
                    <div className='flex justify-center'>
                        <button className="btn hover:bg-custom-yellow bg-yellow-500 text-white w-full mt-3 max-w-32" onClick={loadMoreNotices}>More</button>
                    </div>
                )}
            </section>
            {notices.length === 0 && (
                <div className="space-y-5 mx-28 my-5 mb-8">
                    {/* Skeleton for the First Notice */}
                    <div className="col-span-full gap-3 overflow-hidden mb-19 flex flex-col lg:flex-row animate-pulse">
                        <div className="w-full lg:w-1/2 bg-gray-300 h-64 lg:h-auto"></div>
                        <div className="flex flex-col justify-between lg:w-1/2 p-4 bg-gray-200">
                            <div>
                                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </div>
                            <div className="text-xs text-gray-500 flex flex-col lg:flex-row gap-2 mt-4">
                                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Skeletons for Other Notices */}
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-200 border rounded-lg overflow-hidden flex flex-col animate-pulse">
                                <div className="w-full h-60 bg-gray-300"></div>
                                <div className="p-4 flex flex-col flex-grow bg-gray-200">
                                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded"></div>
                                </div>
                                <div className="p-4 bg-gray-200">
                                    <button className="w-full h-10 bg-gray-300 rounded"></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};


export default Notice;
