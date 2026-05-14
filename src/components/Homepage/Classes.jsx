import React from 'react';
import CustomButton from './CustomButton';
import Image1 from '../../assets/img/classes/1.jpg';
import Image2 from '../../assets/img/classes/2.jpg';
import Image3 from '../../assets/img/classes/3.jpg';
import Image4 from '../../assets/img/classes/4.jpg';

const classes = [
  {
    name: 'body building',
    img: Image1.src,
    description:
      'Strength training and muscle building exercises.',
  },
  {
    name: 'cardio',
    img: "https://i.ibb.co/DYRBvXH/356154662-278385804702827-8405110985639410813-n.jpg",
    description:
      'High-intensity cardiovascular workouts.',
  },
  {
    name: 'Jummba',
    img: "https://i.ibb.co/xDXPbtm/356386940-278386884702719-3303309731686936601-n-1.jpg",
    description:
      'Fun and energetic dance fitness sessions.',
  },
  {
    name: 'crossfit',
    img: Image4.src,
    description:
      'High-intensity functional fitness training.',
  },
];

const Classes = () => {
  return (
    <div className='grid gap-1 grid-cols-1 lg:grid-cols-2'>
      {classes.map((item, index) => (
        <div key={index} className='relative'>
          <img 
            src={item.img} 
            alt={item.name} 
            className='w-full h-96 object-cover' 
          />
          <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4'>
            <h3 className='text-xl md:text-3xl text-accent'>{item.name}</h3>
            <p className='text-white text-sm md:text-base'>{item.description}</p>
            <CustomButton
              containerStyles='btn text-sm md:text-base border-none hover:bg-transparent mt-2'
              text='Read more'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;
