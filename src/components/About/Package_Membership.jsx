"use client";
import React, { useState } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';

const Package_Membership = () => {
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'single', 'couple'

    const singlePlans = [
        { duration: "Admission Fee", regular: "BDT 3,500", promo: "Standard Fee", note: "One-time" },
        { duration: "Regular Monthly Fee", regular: "BDT 2,500", promo: "Standard Fee", note: "Per Month" },
        { duration: "Daily (No Admission)", regular: "BDT 600", promo: "Standard Price", note: "Single Day Pass" },
        { duration: "Weekly (No Admission)", regular: "BDT 2,500", promo: "BDT 2,000", highlight: "Save BDT 500", tag: "PROMO" },
        { duration: "Monthly (No Admission)", regular: "BDT 6,000", promo: "BDT 5,000", highlight: "Save BDT 1,000", tag: "POPULAR" },
        { duration: "3 Months (No Admission)", regular: "BDT 9,000", promo: "Standard Price", note: "Quarterly" },
        { duration: "6 Months (No Admission)", regular: "BDT 16,000", promo: "Standard Price", note: "Half-Yearly" },
        { duration: "1 Year (No Admission)", regular: "BDT 28,000", promo: "Standard Price", note: "Annual Best Value", tag: "BEST VALUE" },
    ];

    const couplePlans = [
        { duration: "6 Months", persons: "2 Persons", price: "BDT 30,000", note: "Couple Package" },
        { duration: "6 Months", persons: "5 Persons", price: "BDT 70,000", note: "Small Group" },
        { duration: "12 Months", persons: "7 Persons", price: "BDT 1,80,000", note: "Medium Group" },
        { duration: "12 Months", persons: "9 Persons", price: "BDT 2,00,000", note: "Large Group / Corporate", tag: "MAX SAVINGS" },
    ];

    return (
        <section className='py-20 bg-[#0a0a0a] text-white' id='membership-packages'>
            <div className='container mx-auto px-4 max-w-6xl'>
                
                {/* Section Header */}
                <div className='text-center mb-12'>
                    <span className="text-red-600 font-black uppercase tracking-[0.3em] text-sm md:text-base block mb-3">
                        Pricing & Plans
                    </span>
                    <h2 className='text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-4'>
                        Membership <span className='text-custom-yellow'>Packages</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 font-medium text-lg md:text-xl max-w-2xl mx-auto">
                        Explore our combined Single and Couples/Group membership rates with exclusive discounts and flexible options.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-8 py-3.5 rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                            activeTab === 'all'
                                ? 'bg-custom-yellow border-custom-yellow text-black shadow-[0_0_25px_rgba(244,203,113,0.4)] scale-105'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        All Packages
                    </button>
                    <button
                        onClick={() => setActiveTab('single')}
                        className={`px-8 py-3.5 rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                            activeTab === 'single'
                                ? 'bg-custom-yellow border-custom-yellow text-black shadow-[0_0_25px_rgba(244,203,113,0.4)] scale-105'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        Single Membership
                    </button>
                    <button
                        onClick={() => setActiveTab('couple')}
                        className={`px-8 py-3.5 rounded-full text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                            activeTab === 'couple'
                                ? 'bg-custom-yellow border-custom-yellow text-black shadow-[0_0_25px_rgba(244,203,113,0.4)] scale-105'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        Couples & Group
                    </button>
                </div>

                {/* Combined Table Card */}
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-900 border-b border-white/10 text-custom-yellow">
                                    <th className="p-6 font-black uppercase tracking-widest text-sm md:text-base">Duration / Type</th>
                                    <th className="p-6 font-black uppercase tracking-widest text-sm md:text-base text-center">Regular Price / Capacity</th>
                                    <th className="p-6 font-black uppercase tracking-widest text-sm md:text-base text-center">Promo Price</th>
                                    <th className="p-6 font-black uppercase tracking-widest text-sm md:text-base text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                
                                {/* Single Membership Section */}
                                {(activeTab === 'all' || activeTab === 'single') && (
                                    <>
                                        <tr className="bg-neutral-900/90">
                                            <td colSpan="4" className="p-5 px-8 text-base md:text-xl font-black uppercase tracking-widest text-custom-yellow bg-custom-yellow/10 border-y border-custom-yellow/20">
                                                <div className="flex items-center gap-3">
                                                    <FaUser className="text-custom-yellow text-xl" />
                                                    <span>Single Membership Plans</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {singlePlans.map((plan, idx) => (
                                            <tr key={`single-${idx}`} className="hover:bg-white/5 transition-colors">
                                                <td className="p-6 font-extrabold text-white text-base md:text-lg">
                                                    {plan.duration}
                                                    {plan.tag && (
                                                        <span className="ml-3 inline-block bg-red-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full align-middle">
                                                            {plan.tag}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-6 text-center font-bold text-gray-300 text-base md:text-lg">{plan.regular}</td>
                                                <td className="p-6 text-center font-black text-custom-yellow text-lg md:text-xl">
                                                    {plan.promo}
                                                    {plan.highlight && (
                                                        <span className="block text-xs font-black text-red-500 uppercase tracking-widest mt-1">
                                                            {plan.highlight}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-6 text-right font-bold text-gray-400 text-sm md:text-base">{plan.note}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                                {/* Couples & Group Membership Section */}
                                {(activeTab === 'all' || activeTab === 'couple') && (
                                    <>
                                        <tr className="bg-neutral-900/90">
                                            <td colSpan="4" className="p-5 px-8 text-base md:text-xl font-black uppercase tracking-widest text-red-500 bg-red-600/10 border-y border-red-600/20">
                                                <div className="flex items-center gap-3">
                                                    <FaUsers className="text-red-500 text-xl" />
                                                    <span>Couples & Group Membership Plans</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {couplePlans.map((plan, idx) => (
                                            <tr key={`couple-${idx}`} className="hover:bg-white/5 transition-colors">
                                                <td className="p-6 font-extrabold text-white text-base md:text-lg">
                                                    {plan.duration} Package
                                                    {plan.tag && (
                                                        <span className="ml-3 inline-block bg-custom-yellow text-black text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full align-middle">
                                                            {plan.tag}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-6 text-center font-bold text-gray-300 text-base md:text-lg">{plan.persons}</td>
                                                <td className="p-6 text-center font-black text-custom-yellow text-xl md:text-2xl">{plan.price}</td>
                                                <td className="p-6 text-right font-bold text-gray-400 text-sm md:text-base">{plan.note}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}

                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-neutral-900/90 border-t border-white/10 text-center">
                        <p className="text-sm md:text-base font-bold uppercase tracking-widest text-gray-300">
                            Note: All membership fees are inclusive of VAT & applicable taxes.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Package_Membership;
