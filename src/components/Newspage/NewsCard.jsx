import React from 'react';
import Link from 'next/link';


// Utility function to strip HTML tags
const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const NewsCard = ({ news }) => {
    const { title, category, tags, description, image, date, _id } = news;
    const cleanDescription = stripHtml(description);

    return (
        <div data-aos="zoom-in" data-aos-duration="1000" className='border poppins rounded-md hover:shadow'>
            <img src={image} className='rounded-t h-48 object-cover w-full hover:opacity-95' alt="" />
            <div className='p-3 flex flex-col justify-around gap-3'>
                <p className='text-xs font-normal'>{category}
                </p>
                <div className='flex flex-col gap-2'>
                    <Link href={`/blog/${_id}`} className='text-sm font-medium hover:text-red-700 cursor-pointer'>{title}</Link>
                    <p className='text-xs'>{cleanDescription.length > 120 ? `${cleanDescription.slice(0, 120)} ...` : cleanDescription} <Link className='text-red-600 hover:text-red-800' href={`/blog/${_id}`}>details</Link></p>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
