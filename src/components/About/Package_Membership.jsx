import React from 'react';

const Package_Membership = () => {
    return (
        <div className='py-16 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <p className='text-4xl md:text-6xl font-black text-center text-neutral-800 mb-12 uppercase tracking-tighter'>Membership Plans</p>

                {/* Single Membership Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className='mb-6 py-4 bg-neutral-800 rounded-t-2xl shadow-lg'>
                        <p className='text-center font-black text-custom-yellow md:text-3xl tracking-widest uppercase'>Single Membership</p>
                    </div>

                    <div className="overflow-x-auto rounded-b-2xl border-x border-b border-gray-200 shadow-xl bg-white">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200">Duration</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm border-r border-gray-200 text-center">Regular Price</th>
                                    <th className="p-5 font-bold text-gray-700 uppercase tracking-wider text-sm text-center">Promo/Intro Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight">Admission Fee</td>
                                    <td className="p-6 text-center text-lg font-bold text-gray-600" colSpan="2">BDT 3,500</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight">Regular Monthly Fee</td>
                                    <td className="p-6 text-center text-lg font-bold text-gray-600" colSpan="2">BDT 2,500</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">Daily (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 600</td>
                                    <td className="p-6 text-center text-lg font-bold text-custom-yellow">Standard Price</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">Weekly (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 2,500</td>
                                    <td className="p-6 text-center text-lg font-bold text-custom-yellow uppercase tracking-tighter">BDT 500 OFF → 2000</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">Monthly (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 6,000</td>
                                    <td className="p-6 text-center text-lg font-bold text-custom-yellow uppercase tracking-tighter">BDT 1000 OFF → 5000</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">3 Month (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 9,000</td>
                                    <td className="p-6 text-center text-lg font-bold text-gray-400">No Discount</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">6 Month (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 16,000</td>
                                    <td className="p-6 text-center text-lg font-bold text-gray-400">No Discount</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-gray-800 border-r border-gray-100 uppercase tracking-tight text-sm">1 Year (No Admission)</td>
                                    <td className="p-6 text-center text-lg font-medium text-gray-600 border-r border-gray-100">BDT 28,000</td>
                                    <td className="p-6 text-center text-lg font-bold text-gray-400">No Discount</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package_Membership;
