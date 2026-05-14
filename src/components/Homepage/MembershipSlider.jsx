"use client";
import { MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';

import CustomButton from './CustomButton';

// import swiper components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';

// swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// membership data
const membershipData = [
  {
    title: 'Daily',
    price: '600',
    benefits: [
      {
        icon: MdClose,
        text: 'Includes membership',
      },
      // {
      //   icon: FaCheck,
      //   text: 'Access to all gym facilities',
      // },
      {
        icon: MdClose,
        text: 'Diet plan included',
      },
      {
        icon: FaCheck,
        text: 'Health and fitness tips',
      },
      {
        icon: MdClose,
        text: 'Premium Workout routine',
      },
      {
        icon: FaCheck,
        text: 'Full access to everything',
      },
      {
        icon: MdClose,
        text: 'No additional amenities',
      },
    ],
  },
  {
    title: 'Monthly',
    price: '2500',
    benefits: [
      {
        icon: MdClose,
        text: 'Includes membership',
      },
      // {
      //   icon: FaCheck,
      //   text: 'Access to all gym facilities',
      // },
      {
        icon: FaCheck,
        text: 'Diet plan included',
      },
      {
        icon: FaCheck,
        text: 'Premium workout rutine',
      },
      {
        icon: FaCheck,
        text: 'Everyday gym access',
      },
      {
        icon: FaCheck,
        text: 'Full access to everything',
      },
      {
        icon: MdClose,
        text: 'No additional amenities',
      },
    ],
  },
  {
    title: 'Semi-Yearly',
    price: '16000',
    benefits: [
      {
        icon: FaCheck,
        text: 'Includes membership',
      },
      // {
      //   icon: FaCheck,
      //   text: 'Access to all gym facilities',
      // },
      {
        icon: FaCheck,
        text: 'Diet plan included',
      },
      {
        icon: FaCheck,
        text: 'Premium workout rutine',
      },
      {
        icon: FaCheck,
        text: 'Everyday gym access',
      },
      {
        icon: FaCheck,
        text: 'Full access to everything',
      },
      {
        icon: FaCheck,
        text: 'No additional amenities',
      },
    ],
  },
];

const MembershipSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      className='min-h-[680px]'
    >
      {membershipData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='border  border-accent hover:bg-primary-300/80 transition-all duration-300 w-full max-w-sm xl:max-w-none mx-auto'>
              <div className='py-5 px-6 md:px-[60px] border-b border-accent'>
                <h4 className='h3 '>{item.title}</h4>
              </div>
              {/* benefits */}
              <div className='py-[30px] px-6 md:px-[60px]'>
                <ul className='flex flex-col gap-5 mb-7'>
                  {item.benefits.map((item, index) => {
                    return (
                      <li className='flex items-center gap-2' key={index}>
                        <item.icon className='text-accent text-lg' />
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
                {/* price & button */}
                <p className='text-accent mb-8 flex gap-1 items-center'>
                  <sup className='text-4xl'>৳ </sup>
                  <strong className='text-6xl'>{item.price}</strong>
                  <em className='self-end text-2xl'>
                    {item.price <= 600 ? '/day' : '/month'}
                  </em>

                </p>
                <CustomButton
                  containerStyles='w-[196px] h-[62px]'
                  text='Enroll Now'
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MembershipSlider;
