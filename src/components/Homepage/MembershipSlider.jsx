"use client";
import { MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const membershipData = [
  {
    title: 'Starter Pass',
    price: '600',
    type: 'day',
    benefits: [
      { icon: FaCheck, text: 'Health & Fitness Tips', included: true },
      { icon: FaCheck, text: 'Standard Gym Access', included: true },
      { icon: MdClose, text: 'Personal Training', included: false },
      { icon: MdClose, text: 'Diet Plan Included', included: false },
      { icon: MdClose, text: 'Premium Amenities', included: false },
    ],
  },
  {
    title: 'Elite Monthly',
    price: '2500',
    type: 'month',
    recommended: true,
    benefits: [
      { icon: FaCheck, text: 'Health & Fitness Tips', included: true },
      { icon: FaCheck, text: 'Full Gym Access', included: true },
      { icon: FaCheck, text: 'Personalized Diet Plan', included: true },
      { icon: FaCheck, text: 'Premium Workout Routine', included: true },
      { icon: MdClose, text: 'Private Locker', included: false },
    ],
  },
  {
    title: 'Semi-Yearly Pro',
    price: '16000',
    type: '6 months',
    benefits: [
      { icon: FaCheck, text: 'All Elite Benefits', included: true },
      { icon: FaCheck, text: 'Personal Training Intro', included: true },
      { icon: FaCheck, text: 'Private Locker Room', included: true },
      { icon: FaCheck, text: 'Guest Passes (2x/mo)', included: true },
      { icon: FaCheck, text: 'Priority Booking', included: true },
    ],
  },
];

const MembershipSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      modules={[Pagination]}
      pagination={{
        clickable: true,
        bulletClass: 'swiper-pagination-bullet !bg-white/20 !opacity-100',
        bulletActiveClass: 'swiper-pagination-bullet-active !bg-custom-yellow !w-8 !rounded-full transition-all duration-300',
      }}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className='pb-16'
    >
      {membershipData.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={`relative group p-1 bg-white/5 rounded-[3rem] border border-white/10 h-full premium-card ${item.recommended ? 'lg:scale-105 z-10' : ''}`}>
            
            {item.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-yellow text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Most Popular
                </div>
            )}

            <div className="bg-[#0f0f0f] rounded-[2.8rem] p-10 h-full flex flex-col">
                <div className="mb-10 text-center">
                    <h4 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] mb-4">{item.title}</h4>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-black text-custom-yellow">৳</span>
                        <span className="text-6xl font-black text-white tracking-tighter">{item.price}</span>
                        <span className="text-gray-500 font-bold uppercase text-[10px] self-end mb-2">/ {item.type}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>

                <ul className="flex flex-col gap-6 mb-12 flex-grow">
                    {item.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className={`flex items-center gap-4 text-sm font-medium transition-colors ${benefit.included ? 'text-gray-300' : 'text-gray-600 opacity-50'}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${benefit.included ? 'bg-red-600/20 text-red-600' : 'bg-gray-800 text-gray-500'}`}>
                                <benefit.icon />
                            </div>
                            {benefit.text}
                        </li>
                    ))}
                </ul>

                <button className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border-2
                    ${item.recommended 
                        ? 'bg-custom-yellow border-custom-yellow text-black hover:bg-transparent hover:text-custom-yellow' 
                        : 'bg-transparent border-white/10 text-white hover:border-red-600 hover:bg-red-600'}`}>
                    Choose Plan
                </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MembershipSlider;
