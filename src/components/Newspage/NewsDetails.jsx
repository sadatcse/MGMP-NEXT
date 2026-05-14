import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { SlSocialReddit } from "react-icons/sl";
import { TiSocialPinterestCircular } from "react-icons/ti";
import { SlSocialTwitter } from "react-icons/sl";
import { CiFacebook } from "react-icons/ci";
import { FaClock } from "react-icons/fa";
import Spinner from "../Utility/Spinner"; 
import Footer from "../Footer";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const NewsDetails = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const router = useRouter();
    const axiosPublic = useAxiosPublic();
    
    const api = "/news/get-all";

    const fetchData = async () => {
        try {
            const response = await axiosPublic.get(api);
            setNews(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching news');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchData();
        }
    }, [loading]);

    const ob = news.find(n => n._id === id);

    const calculateReadingTime = (text) => {
        const wordsPerMinute = 100;
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    if (loading) {
        return <Spinner />; 
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!ob) {
        return <div className="text-center py-20 font-bold text-2xl">News Not Found</div>;
    }

    const readingTime = ob.description ? calculateReadingTime(ob.description) : 0;

    const createMarkup = (htmlContent) => {
        return { __html: htmlContent };
    };

    return (
        <div>
            <div className="container mx-auto px-4 mt-4 mb-3 border-gray-300 rounded-lg">
                <div className="">
                    <div className="text-base text-gray-500 breadcrumbs poppins">
                        <ul>
                            <li><Link href="/">Gym</Link></li>
                            <li><Link href="/blog">News</Link></li>
                            <li>{ob.title}</li>
                        </ul>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 mt-10 gap-10">
                    <div className="col-span-2 pr-20">
                        <p className="text-4xl font-semibold mb-5 poppins">{ob.title}</p>
                        <p className="text-2xl mb-2 font-bold">
                        {new Date(ob.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} <FaClock className="inline-block ml-2 mr-1" /> {readingTime} min read
                        </p>
                        <div dangerouslySetInnerHTML={createMarkup(ob.description)} className="text-2xl font-thin leading-8 mt-3" />
                        <p className="text-red-500 mt-3 text-lg font-thin cursor-pointer max-w-fit" onClick={() => router.back()}>Go Back</p>
                    </div>

                    {/* Image part */}
                    <div className="pl-5">
                        <img className="w-full rounded-t-md" src={ob.image} alt="" />
                        <div className="bg-slate-50 p-8">
                            <p className="font-bold text-red-600 text-lg">STORY TYPE</p>
                            <p className="text-red-600 my-4 font-thin">{ob.category}</p>
                            <p className="font-bold text-red-600 text-lg">POST TAGS</p>
                            <div className="flex gap-4 py-4 font-thin">
                                {Array.isArray(ob.tags) ? (
                                    ob.tags.map((tag, index) => <p key={index} className="text-red-600">{tag}</p>)
                                ) : (
                                    <p className="text-red-600">{ob.tags}</p>
                                )}
                            </div>
                            <p className="font-bold text-red-600 mt-3 text-lg">FOLLOW THE LATEST</p>
                            <div className="flex my-5 mb-7 justify-start gap-4 items-center text-4xl">
                                <CiFacebook className="text-gray-600 cursor-pointer hover:text-red-600" />
                                <SlSocialTwitter className="text-gray-600 cursor-pointer hover:text-red-600 text-3xl" />
                                <SlSocialReddit className="text-gray-600 cursor-pointer hover:text-red-600" />
                                <TiSocialPinterestCircular className="text-gray-600 cursor-pointer hover:text-red-600" />
                            </div>
                            <p className="font-bold text-red-600 text-lg">GET UPDATES</p>
                            <input type="text" placeholder="Email" className="outline-none p-2 px-3 w-full rounded my-4 border" />
                            <button className="btn w-full rounded text-white bg-red-500 hover:text-red-500 hover:bg-transparent border hover:border-red-500">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Related news */}
                <section className="mt-20 mb-9">
                    <div>
                        <p className="text-3xl mb-7">Related Blog & Stories</p>
                    </div>
                    {/* News Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {news.slice(news.length - 4, news.length).map((item) => (
                            <div key={item._id} className="relative">
                                <img src={item.image} className="rounded h-48 object-cover w-full hover:opacity-95" alt="" />
                                <div className="bg-white p-4">
                                    <Link href={`/blog/${item._id}`}>
                                        <p className="text-base font-semibold hover:text-red-700 cursor-pointer">{item.title}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </section>
                </section>
            </div>
        </div>
    );
};

export default NewsDetails;
