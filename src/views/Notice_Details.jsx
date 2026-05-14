import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import useAxiosPublic from "../Hook/useAxiosPublic";
import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineTag, AiOutlineUser } from "react-icons/ai";

const Notice_Details = () => {
    const [notices, setNotices] = useState([]);
    const { id } = useParams(); 
    const notice = notices.find(n => n._id === id);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axiosPublic.get('/notice/get-all');
                const sortedNotices = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNotices(sortedNotices);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, [axiosPublic]);

    if (!notice) return <div className="text-center py-10">Loading...</div>;

    return (
        <section className="bg-slate-50">
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
            <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row gap-6 py-4 justify-between">
                {/* routes */}
                <section className="min-w-80 max-h-min p-5 pr-0 border-r rounded">
                    <div className="flex flex-col">
                        {notices &&
                            notices.map((item) => (
                                <Link key={item._id} href={`/notice/${item._id}`} className={`my-1 font-normal first-letter:uppercase lowercase ${id === item._id ? "text-yellow-500 border-r-2 border-yellow-500 font-semibold" : "text-gray-700"} px-2 py-1 transition-colors duration-300 ease-in-out ${id === item._id ? "border-r-2 border-yellow-500" : "border-r-0"}`}>
                                    {item.title}
                                </Link>
                            ))
                        }
                    </div>
                </section>


                {/* notice details */}
                <section className="rounded-xl shadow pb-5 bg-white">
                    <div className="">

                        <img
                            src={notice.image}
                            alt={notice.title}
                            className="w-full lg:w-8/12 p-5  h-64 lg:h-auto rounded-xl object-cover"
                        />
                        <div className="flex flex-col justify-between px-5">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">{notice.title}</h2>
                                {/* <div className='border-b border-gray-300 mb-4'></div> */}
                                <p
                                    className="text-gray-700 lg:text-lg mb-4"
                                    dangerouslySetInnerHTML={{ __html: notice.description }}
                                ></p>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
                                <div className="text-gray-500 flex items-center mb-2 lg:mb-0">
                                    <AiOutlineCalendar className="mr-2" />
                                    <span className='text-sm'>Posted on: {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="text-gray-500 flex items-center mb-2 lg:mb-0">
                                    <AiOutlineUser className="mr-2" />
                                    <span className='text-sm'>Author: {notice.author}</span>
                                </div>
                                <div className="text-gray-500 flex items-center">
                                    <AiOutlineTag className="mr-2" />
                                    <span className='text-sm'>Category: {notice.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Notice_Details;