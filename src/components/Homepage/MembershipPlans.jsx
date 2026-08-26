"use client";
import { MdClose } from 'react-icons/md';
import { FaCheck, FaBolt, FaCrown, FaTrophy, FaArrowRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../lib/variants';

const membershipData = [
  {
    title: 'Starter Pass',
    icon: FaBolt,
    price: '600',
    type: 'day',
    billed: 'Billed per day',
    benefits: [
      { text: 'Health & Fitness Tips', included: true },
      { text: 'Standard Gym Access', included: true },
      { text: 'Personal Training', included: false },
      { text: 'Diet Plan Included', included: false },
      { text: 'Premium Amenities', included: false },
    ],
  },
  {
    title: 'Elite Monthly',
    icon: FaCrown,
    price: '2,500',
    type: 'month',
    billed: 'Billed monthly',
    recommended: true,
    benefits: [
      { text: 'Health & Fitness Tips', included: true },
      { text: 'Full Gym Access', included: true },
      { text: 'Personalized Diet Plan', included: true },
      { text: 'Premium Workout Routine', included: true },
      { text: 'Private Locker', included: false },
    ],
  },
  {
    title: 'Semi-Yearly Pro',
    icon: FaTrophy,
    price: '16,000',
    type: '6 months',
    billed: 'Billed every 6 months',
    benefits: [
      { text: 'All Elite Benefits', included: true },
      { text: 'Personal Training Intro', included: true },
      { text: 'Private Locker Room', included: true },
      { text: 'Guest Passes (2x/mo)', included: true },
      { text: 'Priority Booking', included: true },
    ],
  },
];

const MembershipPlans = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-center">
      {membershipData.map((item, index) => (
        <motion.div
          key={item.title}
          variants={fadeIn('up', 0.2 + index * 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`relative ${item.recommended ? 'md:-translate-y-5 md:z-10' : ''}`}
        >
          {item.recommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-custom-yellow text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-custom-yellow/20 z-20">
              <FaCrown className="text-xs" /> Most Popular
            </div>
          )}

          <div
            className={`premium-card group h-full flex flex-col rounded-[2.5rem] border p-10 transition-colors duration-500 ${
              item.recommended
                ? 'bg-gradient-to-b from-custom-yellow/[0.08] to-white/[0.02] border-custom-yellow/30'
                : 'bg-white/[0.03] border-white/10'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-8 transition-colors duration-500 ${
                item.recommended
                  ? 'bg-custom-yellow text-black'
                  : 'bg-white/5 text-custom-yellow group-hover:bg-red-600 group-hover:text-white'
              }`}
            >
              <item.icon />
            </div>

            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-3">
              {item.title}
            </h4>

            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-xl font-black text-custom-yellow mb-1.5">৳</span>
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                {item.price}
              </span>
            </div>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-8">
              {item.billed}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            <ul className="flex flex-col gap-5 mb-10 flex-grow">
              {item.benefits.map((benefit, bIndex) => (
                <li
                  key={bIndex}
                  className={`flex items-center gap-4 text-sm font-medium transition-colors ${
                    benefit.included ? 'text-gray-300' : 'text-gray-600 opacity-50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                      benefit.included ? 'bg-red-600/20 text-red-600' : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {benefit.included ? <FaCheck /> : <MdClose />}
                  </div>
                  {benefit.text}
                </li>
              ))}
            </ul>

            <button
              className={`group/btn w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border-2 flex items-center justify-center gap-2
                ${
                  item.recommended
                    ? 'bg-custom-yellow border-custom-yellow text-black hover:bg-transparent hover:text-custom-yellow'
                    : 'bg-transparent border-white/10 text-white hover:border-red-600 hover:bg-red-600'
                }`}
            >
              Choose Plan
              <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MembershipPlans;
