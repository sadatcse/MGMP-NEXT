import axios from "axios";
import { useState, useEffect } from "react";
import NewsCard from "../components/Newspage/NewsCard";
import { motion } from 'framer-motion';
import { fadeIn } from '../../lib/variants';
import Spinner from "../components/Utility/Spinner"; 
import useAxiosPublic from "../Hook/useAxiosPublic";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.get("/news/get-all");
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="container mx-auto px-4 my-2">
             
            <div className='flex flex-col items-center gap-2 mb-8'>
                <motion.h2
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.2 }}
                    className='h2 text-center'
                >
                    Blogs
                </motion.h2>
                <motion.p
                    variants={fadeIn('up', 0.6)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.2 }}
                    className='max-w-[600px] mx-auto text-center'
                >
                    Discover insightful stories and updates on various topics.
                </motion.p>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {news.sort((a, b) => new Date(b.date) - new Date(a.date)).map((newsItem) => (
                        <NewsCard key={newsItem.title} news={newsItem} />
                    ))}
                </section>
            )}
        </div>
    );
};

export default News;
