import React from 'react';
import Image from 'next/image';
import Image1 from '../../assets/img/classes/1.jpg';
import Image4 from '../../assets/img/classes/4.jpg';

const classes = [
  {
    name: 'body building',
    img: Image1,
    description: 'Strength training and muscle building exercises.',
  },
  {
    name: 'cardio',
    img: "https://multigym-website.s3.ap-southeast-1.amazonaws.com/Multigym%20premium/static/classes_1.jpg",
    description: 'High-intensity cardiovascular workouts.',
  },
  {
    name: 'Jumba',
    img: "https://multigym-website.s3.ap-southeast-1.amazonaws.com/Multigym%20premium/static/classes_2.jpg",
    description: 'Fun and energetic dance fitness sessions.',
  },
  {
    name: 'crossfit',
    img: Image4,
    description: 'High-intensity functional fitness training.',
  },
];

const Classes = () => {
  return (
    <div className='grid gap-1 grid-cols-1 lg:grid-cols-2'>
      {classes.map((item, index) => (
        <div key={index} className='relative'>
          <Image
            src={item.img}
            alt={item.name}
            width={800}
            height={600}
            className='w-full h-96 object-cover'
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4'>
            <h3 className='text-xl md:text-3xl text-accent'>{item.name}</h3>
            <p className='text-white text-sm md:text-base'>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
